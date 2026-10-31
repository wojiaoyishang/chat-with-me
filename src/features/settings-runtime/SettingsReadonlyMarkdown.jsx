import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyTextToClipboard } from '@/lib/tools.jsx';
import { toast } from 'sonner';

const plugins = [remarkGfm];
const components = {
    a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
    img: ({ alt }) => <span className="text-muted-foreground">[图片{alt ? `：${alt}` : ''}]</span>,
    input: ({ checked }) => <input type="checkbox" checked={Boolean(checked)} disabled readOnly />,
};

/** Readonly prose uses no chat/ESC/directive interpreter or editable controls. */
export default function SettingsReadonlyMarkdown({ item, value }) {
    const content = typeof value === 'string' ? value : '';
    const copy = async () => {
        try { await copyTextToClipboard(content); toast.success('已复制'); }
        catch { toast.error('复制失败，请手动选择文本复制。'); }
    };
    return <section className="min-w-0 space-y-3" data-settings-readonly-markdown="true">
        {(item.text || item.copyable !== false) && <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium">{item.text}</span>
            {item.copyable !== false && <Button type="button" size="sm" variant="outline" className="shrink-0 gap-1.5"
                disabled={!content} onClick={() => { void copy(); }} aria-label={`复制${item.text || '内容'}`}><Copy className="size-3.5" />复制</Button>}
        </div>}
        {content ? <div className="prose prose-sm max-w-none break-words dark:prose-invert [&_pre]:overflow-auto [&_table]:block [&_table]:overflow-auto">
            <ReactMarkdown skipHtml remarkPlugins={plugins} components={components}>{content}</ReactMarkdown>
        </div> : <p className="text-sm text-muted-foreground">{item.emptyLabel || '暂无内容'}</p>}
    </section>;
}
