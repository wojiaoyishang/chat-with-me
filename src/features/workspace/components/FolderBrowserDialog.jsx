import {Search} from 'lucide-react';

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import FolderBrowser from './FolderBrowser.jsx';

const FolderBrowserDialog = ({open, onOpenChange, roots, onSelect, disabled = false, t}) => {
    const handleSelect = (folder) => {
        onSelect?.(folder);
        onOpenChange?.(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="inset-0 top-0 left-0 flex h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 p-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-[min(82vh,720px)] sm:w-[min(760px,calc(100vw-2rem))] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:border"
            >
                <DialogHeader className="shrink-0 border-b px-4 py-3 pr-12 text-left sm:px-5 sm:py-4">
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <Search className="h-4 w-4 text-blue-600"/>
                        {t('workspace_folder_browser', '选择本机文件夹')}
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm">
                        {t('workspace_folder_browser_description', '只能浏览管理员配置的本机挂载根目录及其子目录。')}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex min-h-0 flex-1 p-3 sm:p-4">
                    <FolderBrowser roots={roots} onSelect={handleSelect} disabled={disabled} t={t}/>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FolderBrowserDialog;
