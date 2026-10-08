// Keep transport metadata (including circular _response) outside editor state.
export function escDraftData(value) {
    const keys = [
        'streamId',
        'documentId',
        'userId',
        'conversationId',
        'status',
        'revision',
        'position',
        'text',
        'sequence',
        'error',
        'createdAt',
        'updatedAt',
        'modelName',
    ];
    return Object.fromEntries(keys.filter((key) => value?.[key] !== undefined).map((key) => [key, value[key]]));
}
