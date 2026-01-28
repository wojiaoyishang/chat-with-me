import {visit} from 'unist-util-visit';


export function componentBlockDirective() {
    return (tree, file) => {
        visit(tree, (node) => {
            if (node.type === 'containerDirective') {

                // 确保节点包含位置信息 (remark 默认会开启 position: true)
                if (!node.position) {
                    return;
                }

                const startOffset = node.position.start.offset;
                const endOffset = node.position.end.offset;

                // 从原始文件中截取整个 block 的字符串 (包含 ::: 标记)
                // file.value 是原始文件的完整字符串
                const blockSource = file.value.slice(startOffset, endOffset);

                // 使用正则去除第一行和最后一行，保留中间所有内容的“原汁原味”
                const rawContent = blockSource
                    .replace(/^[^\n]*\n/, '')  // 去除第一行 (:::demo...)
                    .replace(/\n[^\n]*$/, ''); // 去除最后一行 (:::)

                const data = node.data || (node.data = {});

                data.hName = 'component-block';
                data.hProperties = {
                    'component': node.name,
                    'type': node.attributes?.type || '',
                    'id': node.attributes?.id,
                    'rawContent': rawContent // 这里的 rawContent 是字节级精确的源码
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