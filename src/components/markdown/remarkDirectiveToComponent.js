import {visit} from 'unist-util-visit';


export function componentBlockDirective() {
    return (tree, file) => {
        const fullContent = typeof file.value === 'string' ? file.value : '';

        visit(tree, ['containerDirective', 'textDirective', 'leafDirective'], (node, index, parent) => {
            if (!node.position) return;

            const startOffset = node.position.start.offset;
            const endOffset = node.position.end.offset;
            const raw = fullContent.slice(startOffset, endOffset);

            // ==================== 只处理我们自己的 card ====================
            if (node.type === 'containerDirective' && node.name === 'card') {
                // Step 1: 确定冒号数量（支持 :::card 或 ::::card 等）
                const firstNewlineIndex = raw.indexOf('\n');
                if (firstNewlineIndex === -1) return;

                const firstLine = raw.slice(0, firstNewlineIndex);
                let colonCount = 0;
                for (let i = 0; i < firstLine.length; i++) {
                    if (firstLine[i] === ':') colonCount++;
                    else break;
                }

                const expectedEndMarker = '\n' + ':'.repeat(colonCount);
                let contentEnd = raw.length;

                if (raw.endsWith(expectedEndMarker)) {
                    contentEnd = raw.length - expectedEndMarker.length;
                } else {
                    const lines = raw.split('\n');
                    if (lines.length >= 2) {
                        const lastLine = lines[lines.length - 1];
                        const trimmedLast = lastLine.trim();
                        if (trimmedLast === ':'.repeat(colonCount)) {
                            contentEnd = raw.lastIndexOf('\n', raw.length - 1);
                        }
                    }
                }

                const rawContent = raw.slice(firstNewlineIndex + 1, contentEnd).trim();

                const data = node.data || (node.data = {});
                data.hName = 'component-block';
                data.hProperties = {
                    component: 'card',
                    type: node.attributes?.type || '',
                    id: node.attributes?.id || `component-${startOffset}`,
                    startOffset,
                    endOffset,
                    rawContent,
                };
                return;   // card 处理完就退出
            }

            // ==================== 所有其他 directive 全部还原成普通文本 ====================
            if (parent && typeof index === 'number') {
                parent.children[index] = {
                    type: 'text',
                    value: raw,
                };
            }
        });
    };
}

export function rehypeInlineCodeProperty() {
    return function (tree) {
        visit(tree, 'code', function (node, index, parent) {
            const data = node.data || (node.data = {});

            data.hProperties = {
                'isCodeBlock': true
            };
        })
    }
}