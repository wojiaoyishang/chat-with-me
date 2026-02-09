import {visit} from 'unist-util-visit';


export function componentBlockDirective() {
    return (tree, file) => {
        const fullContent = typeof file.value === 'string' ? file.value : '';

        visit(tree, (node) => {
            if (node.type !== 'containerDirective' || !node.position) return;

            const startOffset = node.position.start.offset;
            const endOffset = node.position.end.offset;

            const rawBlock = fullContent.slice(startOffset, endOffset);

            // Step 1: 找到第一行，确定冒号数量
            const firstNewlineIndex = rawBlock.indexOf('\n');
            if (firstNewlineIndex === -1) {
                // 单行情况（不太可能，但防御）
                return;
            }

            const firstLine = rawBlock.slice(0, firstNewlineIndex);
            let colonCount = 0;
            for (let i = 0; i < firstLine.length; i++) {
                if (firstLine[i] === ':') colonCount++;
                else break;
            }

            // 构造期望的结束符（例如 "::::"）
            const expectedEndMarker = '\n' + ':'.repeat(colonCount);

            // Step 2: 从末尾向前找是否以 expectedEndMarker 结尾
            let contentEnd = rawBlock.length;
            if (rawBlock.endsWith(expectedEndMarker)) {
                contentEnd = rawBlock.length - expectedEndMarker.length;
            } else {
                // 如果不严格匹配（比如多空格），尝试宽松匹配
                // 查找最后一行是否以 colonCount 个冒号开头（忽略前后空白）
                const lines = rawBlock.split('\n');
                if (lines.length >= 2) {
                    const lastLine = lines[lines.length - 1];
                    const trimmedLast = lastLine.trim();
                    if (trimmedLast === ':'.repeat(colonCount)) {
                        // 移除最后一行
                        contentEnd = rawBlock.lastIndexOf('\n', rawBlock.length - 1);
                    }
                }
            }

            // 提取中间内容（跳过第一行）
            const rawContent = rawBlock.slice(firstNewlineIndex + 1, contentEnd).trim();

            const data = node.data || (node.data = {});
            data.hName = 'component-block';
            data.hProperties = {
                component: node.name,
                type: node.attributes?.type || '',
                id: node.attributes?.id || `component-${startOffset}`,
                startOffset,
                endOffset,
                rawContent,
            };
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