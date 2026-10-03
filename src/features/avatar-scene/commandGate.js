/** Accept only fresh commands for this mounted scene. History is never consumed. */
export function acceptSceneCommand(command, scope, version, lastSequence, now = Date.now()) {
    return Boolean(scope && command.sceneSessionId === scope.sceneSessionId
        && command.realtimeSessionId === scope.realtimeSessionId
        && command.controlConnectionId === scope.controlConnectionId
        && command.version === version && Number.isSafeInteger(command.sequence)
        && command.sequence > lastSequence && command.expiresAt > now);
}
