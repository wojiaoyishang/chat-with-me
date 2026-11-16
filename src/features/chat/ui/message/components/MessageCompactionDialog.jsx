import {useEffect, useId, useState} from 'react';
import {Loader2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';

export default function MessageCompactionDialog({open, onOpenChange, onSubmit, pending, error, blocked, tool = false}) {
    const [instruction, setInstruction] = useState('');
    const inputId = useId();
    useEffect(() => {
        if (open) setInstruction('');
    }, [open]);

    return <Dialog open={open} onOpenChange={next => {if (!pending) onOpenChange(next);}}>
        <DialogContent className="sm:max-w-lg" onClick={event => event.stopPropagation()}>
            <DialogHeader>
                <DialogTitle>{tool ? '压缩工具结果' : '压缩此消息'}</DialogTitle>
                <DialogDescription>生成摘要供后续模型调用使用，原始记录保留。留空使用默认压缩要求。</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
                <label htmlFor={inputId} className="text-sm font-medium">本次压缩提示词</label>
                <Textarea id={inputId} value={instruction} onChange={event => setInstruction(event.target.value)}
                    maxLength={8000} rows={6} disabled={Boolean(pending) || blocked}
                    placeholder="例如保留结论、具体数值和未完成事项，简化重复过程。"/>
                {error && <p role="alert" className="break-words text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter>
                <Button variant="outline" disabled={Boolean(pending)} onClick={() => onOpenChange(false)}>取消</Button>
                <Button disabled={Boolean(pending) || blocked} onClick={() => void onSubmit(instruction.trim())}>
                    {pending && <Loader2 className="size-4 animate-spin"/>}{pending ? '正在压缩…' : '开始压缩'}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
}
