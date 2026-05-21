import {
    MARKDOWN_COPY_CONTENT_COMPONENT_NAME,
    resolveMarkdownCopyContent
} from '@/components/markdown/MarkdownRenderer.jsx';

export const getMountedCopyContent = (msg) => {
    const mountedComponent = msg?.getComponent?.(MARKDOWN_COPY_CONTENT_COMPONENT_NAME);

    if (!mountedComponent) return undefined;

    if (typeof mountedComponent === 'string') return mountedComponent;
    if (typeof mountedComponent.getCopyContent === 'function') return mountedComponent.getCopyContent();
    if (typeof mountedComponent.getMarkdownContent === 'function') return mountedComponent.getMarkdownContent();
    if (typeof mountedComponent.getContent === 'function') return mountedComponent.getContent();
    if (typeof mountedComponent.getText === 'function') return mountedComponent.getText();

    const mountedValue = mountedComponent.copyContent
        ?? mountedComponent.markdownContent
        ?? mountedComponent.content
        ?? mountedComponent.text;

    if (mountedValue !== undefined && mountedValue !== null) {
        return mountedValue;
    }

    return undefined;
};

/**
 * 解析复制用 Markdown 文本。
 * 渲染路径继续使用原始 msg.content，避免提前把 card replace marker 吃掉。
 */
export const resolveMessageCopyContent = (content, extraInfo) => {
    if (!content) return content;

    return resolveMarkdownCopyContent(content, extraInfo?.replace || {});
};

export const getCopyContent = (msg) => {
    const mountedCopyContent = getMountedCopyContent(msg);

    if (mountedCopyContent !== undefined && mountedCopyContent !== null) {
        return String(mountedCopyContent);
    }

    const fallbackCopyContent = resolveMessageCopyContent(msg?.content, msg?.extraInfo);

    return typeof fallbackCopyContent === 'string'
        ? fallbackCopyContent
        : String(fallbackCopyContent ?? '');
};
