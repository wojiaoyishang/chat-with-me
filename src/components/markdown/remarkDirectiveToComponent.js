import {visit} from 'unist-util-visit';


export function componentBlockDirective() {
    return (tree, file) => {
        visit(tree, (node) => {
            if (node.type === 'containerDirective') {
                if (!node.position) return;

                const startOffset = node.position.start.offset;
                const endOffset = node.position.end.offset;
                const blockSource = file.value.slice(startOffset, endOffset);

                // 1. 匹配第一行 (:::name{...})
                // 2. 匹配最后一行 (:::)
                // 使用非贪婪匹配，确保只去掉最外层的一对标记
                const lines = blockSource.split('\n');

                if (lines.length >= 2) {
                    // 移除第一行和最后一行
                    const rawContent = lines.slice(1, -1).join('\n');

                    const data = node.data || (node.data = {});
                    data.hName = 'component-block';
                    data.hProperties = {
                        'component': node.name,
                        'type': node.attributes?.type || '',
                        'id': node.attributes?.id,
                        'rawContent': rawContent
                    };
                }
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