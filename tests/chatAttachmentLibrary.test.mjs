import test from 'node:test';
import assert from 'node:assert/strict';

import {
    appendLibraryAttachments,
    toChatAttachment,
} from '../src/features/chat/attachmentLibrary.js';
import { getVisionAttachmentIds } from '../src/features/chat/attachmentVision.js';

test('library record uses the artifact ID for chat and preserves image vision metadata', () => {
    const attachment = toChatAttachment({
        id: 'account-specific-record-id',
        artifactId: 'shared-artifact-id',
        name: '截图.png',
        type: 'image',
        fileType: 'image',
        size: 512,
        sha256: 'image-hash',
        uri: 'cwm://artifact/shared-artifact-id',
        preview: 'cwm://artifact/shared-artifact-id/preview',
    });

    assert.equal(attachment.serverId, 'shared-artifact-id');
    assert.equal(attachment.artifactId, 'shared-artifact-id');
    assert.equal(attachment.downloadUrl, 'cwm://artifact/shared-artifact-id');
    assert.equal(attachment.name, '截图.png');
    assert.equal(attachment.preview, 'cwm://artifact/shared-artifact-id/preview');
    assert.equal(attachment.visionEnabled, true);
    assert.deepEqual(getVisionAttachmentIds([attachment]), ['shared-artifact-id']);
    assert.equal(JSON.stringify(attachment).includes('account-specific-record-id'), false);
});

test('library record ID alone is never mistaken for an upload ID', () => {
    const record = { id: 'account-specific-record-id', name: '缺少资源 ID 的附件' };
    assert.equal(toChatAttachment(record), null);
    assert.deepEqual(appendLibraryAttachments([], [record]), []);
});

test('adding library files deduplicates by artifact ID across existing and selected attachments', () => {
    const existing = [{ serverId: 'already-attached', name: '已上传图片.png', visionEnabled: false }];
    const records = [
        { id: 'record-a', artifactId: 'already-attached', name: '同一资源' },
        { id: 'record-b', artifactId: 'new-artifact', name: '资料.md', type: 'text', fileType: 'text' },
        { id: 'record-c', artifactId: 'new-artifact', name: '重复资料.md', type: 'text', fileType: 'text' },
    ];

    const result = appendLibraryAttachments(existing, records);
    assert.deepEqual(result.map((item) => item.serverId), ['already-attached', 'new-artifact']);
    assert.equal(result[0], existing[0], 'an existing attachment keeps its vision setting');
    assert.equal(result[1].name, '资料.md');
    assert.equal(result[1].visionEnabled, undefined);
    assert.equal(result[1].downloadUrl, 'cwm://artifact/new-artifact');
});
