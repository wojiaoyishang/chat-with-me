import { useCallback, useEffect, useState } from 'react';
import { Loader2, Server, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import apiClient from '../../lib/apiClient.js';
import { ensureClientSession } from './session.js';
import {
    BACKEND_MANAGE_EVENT, getBackendConnection, readBackendProfiles,
    saveBackendProfile, setBackendManifest, switchBackend,
} from './connection.js';

/** The only built-in page is connection recovery, available before any backend. */
export default function BackendBootstrapGate({ children }) {
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState('');
    const [managerOpen, setManagerOpen] = useState(false);
    const [profiles, setProfiles] = useState(() => readBackendProfiles().profiles);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [busy, setBusy] = useState(false);
    const [managerError, setManagerError] = useState('');
    const load = useCallback(async (signal) => {
        setStatus('loading'); setError('');
        try {
            const description = await apiClient.get('/client/bootstrap', { skipAuthCheck: true, signal });
            if (description.protocol !== 'cwm.client.v1') throw new Error('该后端不支持当前客户端协议。');
            if (signal?.aborted) return;
            setBackendManifest(description);
            try { await ensureClientSession(); } catch (cause) { if (Number(cause.code) !== 401) throw cause; }
            if (!signal?.aborted) setStatus('ready');
        } catch (cause) {
            if (signal?.aborted) return;
            setError(cause.message || '无法连接选定后端。'); setStatus('error');
        }
    }, []);
    useEffect(() => {
        const controller = new AbortController();
        void load(controller.signal);
        return () => controller.abort();
    }, [load]);
    useEffect(() => {
        const show = () => { setProfiles(readBackendProfiles().profiles); setManagerError(''); setManagerOpen(true); };
        window.addEventListener(BACKEND_MANAGE_EVENT, show);
        return () => window.removeEventListener(BACKEND_MANAGE_EVENT, show);
    }, []);
    const choose = async (id) => {
        setBusy(true); setManagerError('');
        try { await switchBackend(id); }
        catch (cause) { setManagerError(cause.message); }
        finally { setBusy(false); }
    };
    const manager = (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">当前选择：{getBackendConnection().title}。选择会保存在此浏览器，仅手动切换时更改。</p>
            <div className="max-h-64 space-y-2 overflow-y-auto">
                {profiles.map((profile) => (
                    <div key={profile.id} className="flex items-center gap-3 rounded-xl border p-3">
                        <div className="min-w-0 flex-1"><p className="font-medium">{profile.title}</p><p className="break-all text-xs text-muted-foreground">{profile.url}</p></div>
                        <Button variant="outline" disabled={busy || profile.id === getBackendConnection().id} onClick={() => void choose(profile.id)}>{profile.id === getBackendConnection().id ? '已选择' : '切换'}</Button>
                    </div>
                ))}
            </div>
            <form className="space-y-2 border-t pt-4" onSubmit={async (event) => {
                event.preventDefault(); setManagerError('');
                try { const profile = saveBackendProfile({ title, url }); setProfiles(readBackendProfiles().profiles); await choose(profile.id); }
                catch (cause) { setManagerError(cause.message); }
            }}>
                <Input aria-label="连接名称" placeholder="连接名称" value={title} onChange={(event) => setTitle(event.target.value)} disabled={busy} />
                <Input aria-label="后端 API 地址" placeholder="https://example.com/api 或 http://localhost:8000" value={url} onChange={(event) => setUrl(event.target.value)} disabled={busy} required />
                <Button disabled={busy}>{busy && <Loader2 className="size-4 animate-spin" />}保存并切换</Button>
            </form>
            {managerError && <p role="alert" className="text-sm text-destructive">{managerError}</p>}
        </div>
    );
    return <>
        {status === 'ready' ? children : <div className="flex min-h-screen items-center justify-center bg-background p-6"><div className="w-full max-w-xl space-y-5 rounded-2xl border p-6">
            <div className="flex items-center gap-2 text-lg font-semibold">{status === 'loading' ? <Loader2 className="size-5 animate-spin" /> : <Server className="size-5" />}{status === 'loading' ? '正在连接后端…' : '无法打开选定后端'}</div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            {status === 'error' && <><Button variant="outline" onClick={() => void load()}><RefreshCw className="size-4" />重试当前连接</Button>{manager}</>}
        </div></div>}
        <Dialog open={managerOpen} onOpenChange={setManagerOpen}><DialogContent><DialogHeader><DialogTitle>后端连接</DialogTitle><DialogDescription>切换只结束当前客户端连接，不会取消服务器后台任务。</DialogDescription></DialogHeader>{manager}</DialogContent></Dialog>
    </>;
}
