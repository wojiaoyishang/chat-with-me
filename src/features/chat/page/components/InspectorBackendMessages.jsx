import { useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import InspectorHighlight from './InspectorHighlight.jsx';
import InspectorMediaBadges from './InspectorMediaBadges.jsx';
import InspectorAttachments from './InspectorAttachments.jsx';

export default function InspectorBackendMessages({ section, onJump, renderReplacements }) {
    const [query, setQuery] = useState('');
    const indexed = useMemo(() => (section.items || []).map((item) => ({ item, text: JSON.stringify(item).toLowerCase() })), [section.items]);
    const keyword = query.trim().toLowerCase();
    const items = useMemo(() => indexed.filter((entry) => !keyword || entry.text.includes(keyword)).map((entry) => entry.item), [indexed, keyword]);
    return <div className="flex h-full min-h-0 flex-col">
        <div className="shrink-0 space-y-2 border-b p-3 sm:px-5">
            <p className="text-xs leading-relaxed text-muted-foreground">{section.notice}</p>
            <label className="flex items-center gap-2"><Search className="size-4 shrink-0 text-muted-foreground" /><Input aria-label="搜索后端消息" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索角色、正文、消息 ID、replacement 或协议字段" /></label>
            <p className="text-xs text-muted-foreground">当前分支 · {items.length} / {indexed.length} 条后端消息</p>
        </div>
        {!items.length ? <p className="p-5 text-sm text-muted-foreground">{keyword ? '没有匹配的后端消息。' : '暂无后端消息。'}</p> : <Virtuoso key={keyword} data={items} className="pretty-scrollbar min-h-0 flex-1" increaseViewportBy={300} itemContent={(_index, item) => <article className="mx-3 my-2 space-y-3 rounded-xl border p-3 sm:mx-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="outline"><InspectorHighlight text={item.role} query={query} /></Badge>
                <Badge variant="secondary">{item.source === 'conversation' ? '会话消息' : '上下文注入'}</Badge>
                <span className="text-muted-foreground">#{item.orderIndex + 1}</span>
                <InspectorMediaBadges media={item.media} />
                {item.messageId && <Button variant="ghost" size="sm" className="ml-auto" onClick={() => onJump?.(item.messageId)}>定位消息</Button>}
            </div>
            {item.messageId && <p className="break-all font-mono text-xs text-muted-foreground"><InspectorHighlight text={item.messageId} query={query} /></p>}
            <InspectorAttachments attachments={item.attachments || []} />
            <pre className="pretty-scrollbar max-h-[60vh] overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed"><InspectorHighlight text={item.content || '(empty)'} query={query} /></pre>
            {item.reasoningContent && <details key={`reasoning-${keyword}`} open={Boolean(keyword && item.reasoningContent.toLowerCase().includes(keyword))}><summary className="cursor-pointer text-xs text-muted-foreground">携带的思考内容</summary><pre className="mt-2 whitespace-pre-wrap break-words font-mono text-xs"><InspectorHighlight text={item.reasoningContent} query={query} /></pre></details>}
            {renderReplacements(item.replacements || [], query)}
            <details key={`fields-${keyword}`} open={Boolean(keyword && JSON.stringify({ source: item.sourcePayload, flags: item.flags, providerPayload: item.providerPayload }).toLowerCase().includes(keyword))}>
                <summary className="cursor-pointer text-xs text-muted-foreground">解析前消息与完整后端协议字段</summary>
                <pre className="pretty-scrollbar mt-2 max-h-96 overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed"><InspectorHighlight text={JSON.stringify({ source: item.sourcePayload, flags: item.flags, providerPayload: item.providerPayload }, null, 2)} query={query} /></pre>
            </details>
        </article>} />}
    </div>;
}
