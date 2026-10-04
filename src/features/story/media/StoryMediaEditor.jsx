import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { fileUpload } from '@/lib/tools.jsx';

export default function StoryMediaEditor({ target, onClose, onSave, t }) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(null);
    const [saving, setSaving] = useState(false);
    const cancelUpload = useRef(null);
    const isImage = target?.type === 'image';
    const busy = progress !== null || saving;

    useEffect(() => {
        setUrl(target?.part?.[target.type === 'image' ? 'imageUrl' : 'videoUrl'] || '');
        setError('');
        setProgress(null);
        return () => {
            cancelUpload.current?.();
            cancelUpload.current = null;
        };
    }, [target]);

    const upload = (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;
        if (!file.type.startsWith(isImage ? 'image/' : 'video/')) {
            setError(t('story_media_type_error', '请选择对应类型的媒体文件。'));
            return;
        }
        setError('');
        setProgress(0);
        cancelUpload.current = fileUpload(
            { id: 'story-media', file, name: file.name },
            (_, value) => setProgress(value),
            (_, attachment) => {
                const id = attachment.artifactId;
                const resource = id ? `cwm://artifact/${id}${isImage ? '/preview' : ''}` : '';
                if (resource) setUrl(resource);
                else setError(t('story_media_upload_failed', '上传失败，请重新选择文件。'));
                setProgress(null);
                cancelUpload.current = null;
            },
            (failure) => {
                setError(failure.message);
                setProgress(null);
                cancelUpload.current = null;
            },
        );
    };

    const save = async (event) => {
        event.preventDefault();
        if (!target || busy) return;
        setSaving(true);
        setError('');
        try {
            await onSave(target.storyId, target.part.partId, { [isImage ? 'imageUrl' : 'videoUrl']: url.trim() });
            onClose();
        } catch (failure) {
            setError(failure.message || t('story_media_save_failed', '保存失败，请重试。'));
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog
            open={Boolean(target)}
            onOpenChange={(open) => {
                if (!open && !saving) onClose();
            }}
        >
            <DialogContent overlayClassName="z-[120190]" className="z-[120200] sm:max-w-lg" showCloseButton={!saving}>
                <DialogHeader>
                    <DialogTitle>
                        {isImage ? t('story_edit_image', '修改图片') : t('story_edit_video', '修改视频')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('story_media_edit_description', {
                            sequence: target?.part?.sequence,
                            defaultValue: '修改第 {{sequence}} 篇的媒体，上传文件或填写链接；留空并保存可移除。',
                        })}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={save} className="space-y-4">
                    <label className="block space-y-2 text-sm">
                        <span>{t('story_media_url', '媒体链接')}</span>
                        <Input
                            value={url}
                            maxLength={1024}
                            disabled={busy}
                            onChange={(event) => setUrl(event.target.value)}
                            placeholder="https://…"
                        />
                    </label>
                    <label className="block space-y-2 text-sm">
                        <span>{t('story_media_file', '上传文件')}</span>
                        <Input type="file" accept={isImage ? 'image/*' : 'video/*'} disabled={busy} onChange={upload} />
                    </label>
                    {progress !== null && (
                        <p role="status" className="text-sm text-gray-500">
                            {t('uploading', '上传中')} {progress}%
                        </p>
                    )}
                    {error && (
                        <p role="alert" className="break-words text-sm text-red-600">
                            {error}
                        </p>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="outline" disabled={saving} onClick={onClose}>
                            {t('cancel', '取消')}
                        </Button>
                        <Button type="submit" disabled={busy}>
                            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                            {t('save', '保存')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
