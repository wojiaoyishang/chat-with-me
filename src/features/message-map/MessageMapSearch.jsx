import {useCallback, useEffect, useRef, useState} from 'react';
import {Loader2, Search, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from '@/components/ui/dialog';

import {PAGE_SIZE, useMessageMapSearch} from './useMessageMapSearch.js';
const LOAD_MORE_THRESHOLD_PX = 80;


function SearchResults({state, onSelect}) {
    return <>
        {state.items.map(item => <button key={item.messageId} type="button" className="flex min-h-14 w-full flex-col gap-1 rounded-lg px-3 py-3 text-left hover:bg-accent focus-visible:outline-primary" onClick={() => onSelect(item)}>
            <span className="line-clamp-3 break-words text-sm">{item.preview}</span>
            <span className="text-xs text-muted-foreground">{item.role === 'user' ? 'User' : 'AI'} · {item.isActivePath ? '当前分支' : '历史分支'}{item.createdAt ? ` · ${new Date(item.createdAt).toLocaleString()}` : ''}</span>
        </button>)}
        {state.loading && <p role="status" className="flex justify-center gap-2 p-4 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin"/>正在加载…</p>}
        {state.error && <p role="alert" className="p-4 text-sm text-destructive">{state.error}</p>}
        {!state.loading && !state.error && !state.items.length && <p className="p-4 text-center text-sm text-muted-foreground">没有找到匹配消息</p>}
    </>;
}

export default function MessageMapSearch({conversationId, onSelect}) {
    const [query, setQuery] = useState('');
    const [shown, setShown] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dropdownPage, setDropdownPage] = useState(0);
    const [dialogPage, setDialogPage] = useState(0);
    const rootRef = useRef(null);
    const searchButtonRef = useRef(null);
    const listRef = useRef(null);
    const loadLockRef = useRef(false);
    const dropdown = useMessageMapSearch({conversationId, query, page: dropdownPage, append: true, enabled: shown && !dialogOpen});
    const dialog = useMessageMapSearch({conversationId, query, page: dialogPage, append: false, enabled: dialogOpen});
    const changeQuery = value => {setQuery(value); setDropdownPage(0); setDialogPage(0); loadLockRef.current = false;};
    const showDropdown = () => { if (!shown) setDropdownPage(0); setShown(true); };
    const select = item => {onSelect(item); setShown(false); setDialogOpen(false);};
    const loadMore = useCallback(() => {
        if (dropdown.loading || dropdown.error || loadLockRef.current || dropdown.items.length >= dropdown.total) return;
        loadLockRef.current = true;
        setDropdownPage(page => page + 1);
    }, [dropdown]);
    useEffect(() => {
        if (dropdown.loading) return;
        loadLockRef.current = false;
        const list = listRef.current;
        if (list && list.scrollHeight <= list.clientHeight) loadMore();
    }, [dropdown, loadMore]);
    useEffect(() => {
        if (!shown) return undefined;
        const dismiss = event => {if (!rootRef.current?.contains(event.target)) setShown(false);};
        document.addEventListener('pointerdown', dismiss);
        return () => document.removeEventListener('pointerdown', dismiss);
    }, [shown]);
    return <div ref={rootRef} className="relative order-3 mx-auto w-full min-w-0 max-w-2xl basis-full sm:order-none sm:basis-auto sm:flex-1" onKeyDown={event => {if (event.key === 'Escape') setShown(false);}}>
        <Button ref={searchButtonRef} type="button" variant="ghost" size="icon" className="absolute left-1 top-1/2 z-10 -translate-y-1/2" aria-label="打开历史消息搜索窗口" onClick={() => {setShown(false); setDialogPage(0); setDialogOpen(true);}}><Search className="size-4"/></Button>
        <Input value={query} onClick={showDropdown} onFocus={showDropdown} onChange={event => {changeQuery(event.target.value); setShown(true);}} onKeyDown={event => {if (event.key === 'Enter' && !dropdown.loading && dropdown.items.length) {event.preventDefault(); select(dropdown.items[0]);}}} placeholder="搜索所有历史消息…" aria-label="搜索所有历史消息" className="pl-11 pr-10"/>
        {query && <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" aria-label="清空搜索" onClick={() => changeQuery('')}><X className="size-4"/></Button>}
        {shown && !dialogOpen && query.trim().length >= 2 && <div ref={listRef} className="absolute left-0 right-0 top-[calc(100%+0.4rem)] max-h-[min(55dvh,24rem)] overflow-y-auto overscroll-contain rounded-xl border bg-popover p-1 shadow-xl" onScroll={event => {
            const list = event.currentTarget;
            if (list.scrollHeight - list.scrollTop - list.clientHeight <= LOAD_MORE_THRESHOLD_PX) loadMore();
        }}>
            <SearchResults state={dropdown} onSelect={select}/>
            {!dropdown.loading && !dropdown.error && dropdown.items.length > 0 && <p className="p-2 text-center text-xs text-muted-foreground">已显示 {dropdown.items.length} / {dropdown.total} 条{dropdown.items.length < dropdown.total ? ' · 下滑加载更多' : ' · 已全部加载'}</p>}
            {dropdown.error && <Button variant="outline" size="sm" onClick={() => {setShown(false); setDropdownPage(0);}}>关闭后重新搜索</Button>}
        </div>}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="z-[2147483303] flex max-h-[85dvh] flex-col gap-3 p-4 sm:max-w-xl sm:p-6" overlayClassName="z-[2147483302]" onCloseAutoFocus={event => {event.preventDefault(); searchButtonRef.current?.focus();}}>
                <DialogHeader className="pr-6"><DialogTitle>搜索历史消息</DialogTitle><DialogDescription>搜索当前对话的全部历史分支，点击结果查看消息。</DialogDescription></DialogHeader>
                <Input autoFocus value={query} onChange={event => changeQuery(event.target.value)} placeholder="至少输入两个字符" aria-label="搜索历史消息关键词"/>
                <div key={`${query}:${dialogPage}`} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                    {query.trim().length < 2 ? <p className="p-4 text-sm text-muted-foreground">请输入至少两个字符开始搜索</p> : <SearchResults state={dialog} onSelect={select}/>}
                </div>
                <div className="flex shrink-0 items-center justify-between gap-2 border-t pt-3">
                    <Button variant="outline" size="sm" disabled={dialog.loading || dialogPage === 0} onClick={() => setDialogPage(page => page - 1)}>上一页</Button>
                    <span className="text-center text-xs text-muted-foreground">{dialogPage + 1} / {Math.max(1, Math.ceil(dialog.total / PAGE_SIZE))} 页 · {dialog.total} 条</span>
                    <Button variant="outline" size="sm" disabled={dialog.loading || (dialogPage + 1) * PAGE_SIZE >= dialog.total} onClick={() => setDialogPage(page => page + 1)}>下一页</Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>;
}
