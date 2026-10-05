import * as Y from 'yjs';

// Keep the paste location attached to the CRDT while upload and remote edits run.
export async function insertUploadedImages({ files, text, doc, editor, upload, isCurrent }) {
    let anchor = Y.createRelativePositionFromTypeIndex(text, editor.state.selection.main.head);
    for (const file of files) {
        const data = await upload(file);
        if (!isCurrent()) return;
        const position = Y.createAbsolutePositionFromRelativePosition(anchor, doc);
        if (!position || position.type !== text) return;
        const markdownImage = `![${file.name.replace(/[[\]\n\r]/g, '')}](${data.path})`;
        editor.dispatch({
            changes: { from: position.index, insert: markdownImage },
            selection: { anchor: position.index + markdownImage.length },
        });
        anchor = Y.createRelativePositionFromTypeIndex(text, position.index + markdownImage.length);
    }
}

export const DOCUMENT_IMAGE_UPLOAD_POLICY = Object.freeze({
    accept: 'image/png,image/jpeg,image/gif,image/webp',
    types: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    maxBytes: 10 * 1024 * 1024,
});
