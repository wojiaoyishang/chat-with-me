import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { onEvent } from '@/context/useEventStore.jsx';
import { createRobotScene } from './robotScene.js';
import { acceptSceneCommand } from './commandGate.js';
import { useLocalSetting } from '@/lib/tools.jsx';
import { ROBOT_DEBUG_SETTING_KEY } from './settings.js';

export default function AvatarScene({ requestScene, conversationId, modelId, modelRevision = 0, immersive = false }) {
    const [robotDebugEnabled] = useLocalSetting(ROBOT_DEBUG_SETTING_KEY, false);
    const container = useRef(null);
    const engine = useRef(null);
    const [catalog, setCatalog] = useState(null);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        setReady(false);
        setCatalog(null);
        setError('');
        const abort = new AbortController();
        let scope,
            heartbeat,
            unsubscribe,
            lastSequence = 0;
        const stop = (binding) =>
            requestScene('avatar.scene.stop', { sceneSessionId: binding.sceneSessionId }).catch(() => {});
        (async () => {
            const response = await requestScene('avatar.scene.catalog', conversationId ? {} : { modelId });
            const manifest = response.payload.catalog;
            if (abort.signal.aborted) return;
            const graphics = await createRobotScene(container.current, manifest, abort.signal);
            if (abort.signal.aborted) {
                graphics.dispose();
                return;
            }
            engine.current = graphics;
            setCatalog(manifest);
            // Register before publishing readiness so the first command cannot be missed.
            unsubscribe = onEvent({ event: 'avatar.pose.apply', conversationId, direction: 'incoming' }).then(
                ({ payload }) => {
                    if (!acceptSceneCommand(payload, scope, manifest.version, lastSequence)) return;
                    lastSequence = payload.sequence;
                    let applied = true,
                        detail = '';
                    try {
                        graphics.apply(payload.poseId, payload.expressionId);
                    } catch (failure) {
                        applied = false;
                        detail = failure.message;
                    }
                    requestScene('avatar.scene.ack', {
                        sceneSessionId: scope.sceneSessionId,
                        commandId: payload.commandId,
                        applied,
                        error: detail,
                    }).catch(() => {});
                },
            );
            if (!conversationId) {
                setReady(true);
                return;
            }
            const started = await requestScene('avatar.scene.start', {
                modelId: manifest.modelId,
                version: manifest.version,
                poses: manifest.poses.map((item) => item.id),
                expressions: manifest.expressions.map((item) => item.id),
            });
            scope = started.payload.scope;
            if (abort.signal.aborted) {
                await stop(scope);
                return;
            }
            setReady(true);
            heartbeat = setInterval(() => {
                requestScene('avatar.scene.renew', { sceneSessionId: scope.sceneSessionId }).catch((failure) => {
                    if (abort.signal.aborted) return;
                    clearInterval(heartbeat);
                    if (scope) stop(scope);
                    scope = null;
                    setReady(false);
                    setError(failure.message || '场景已失效，请重新打开');
                });
            }, 10000);
        })().catch((failure) => {
            if (!abort.signal.aborted) {
                setReady(false);
                setError(failure.message || '场景加载失败');
            }
        });
        return () => {
            abort.abort();
            clearInterval(heartbeat);
            unsubscribe?.();
            if (scope) stop(scope);
            engine.current?.dispose();
            engine.current = null;
        };
    }, [requestScene, conversationId, modelId, modelRevision]);
    return (
        <div className="relative flex h-full min-h-0 w-full min-w-0 flex-col">
            <div ref={container} className="min-h-0 w-full flex-1" aria-label="实时机器人 3D 场景" />
            {catalog?.attribution && (
                <a
                    href={catalog.attribution.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 text-center text-[10px] text-muted-foreground"
                >
                    {catalog.attribution.text}
                </a>
            )}
            {(error || !ready || !conversationId) && (
                <p className="px-3 text-center text-xs text-muted-foreground" role="status">
                    {error || (!ready ? '正在加载机器人…' : '发送消息创建对话后，AI 就能控制机器人')}
                </p>
            )}
            {robotDebugEnabled === true && (
                <>
                    <div
                        className={`flex shrink-0 flex-wrap justify-center gap-1 p-2 ${immersive ? 'bg-background/80' : ''}`}
                    >
                        {catalog?.poses.map((pose) => (
                            <Button
                                key={pose.id}
                                size="sm"
                                variant="outline"
                                disabled={!ready}
                                onClick={() => engine.current?.apply(pose.id, 'neutral')}
                            >
                                {pose.label}
                            </Button>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 px-2 pb-3">
                        {catalog?.expressions.map((expression) => (
                            <Button
                                key={expression.id}
                                size="sm"
                                variant="ghost"
                                disabled={!ready}
                                onClick={() => engine.current?.apply('idle', expression.id)}
                            >
                                {expression.label}
                            </Button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
