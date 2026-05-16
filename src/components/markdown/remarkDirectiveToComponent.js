import {visit} from 'unist-util-visit';

function parseCardReplaceAttrs(rawAttrs = '') {
    const attrs = {};

    const attrRe = /([a-zA-Z_$][\w$-]*)=(?:"([^"]*)"|'([^']*)'|([^\s}]+))/g;
    let match;

    while ((match = attrRe.exec(rawAttrs)) !== null) {
        const key = match[1];
        const value = match[2] ?? match[3] ?? match[4] ?? '';
        attrs[key] = value;
    }

    return attrs;
}

function createCardReplaceNode(attrs) {
    const id = attrs.id || '';
    const type = attrs.type || '';

    const hProperties = {
        component: 'cardReplace',
    };

    if (id) {
        hProperties.id = id;
    }

    if (type) {
        hProperties.type = type;
    }

    return {
        type: 'cardReplace',
        data: {
            hName: 'card-replace',
            hProperties,
            hChildren: [],
        },
    };
}

function hasMeaningfulChildren(children) {
    return children.some((child) => {
        if (child.type === 'text') {
            return child.value.length > 0 && child.value.trim().length > 0;
        }

        return true;
    });
}

function createParagraphFromChildren(children, originalParagraph) {
    return {
        ...originalParagraph,
        children,
    };
}

function splitTextNodeByCardReplace(node) {
    const text = node.value || '';
    const tokenRe = /\{\{cardReplace\s+([^}]+)\}\}/g;

    tokenRe.lastIndex = 0;

    if (!tokenRe.test(text)) {
        tokenRe.lastIndex = 0;
        return [node];
    }

    tokenRe.lastIndex = 0;

    const newNodes = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRe.exec(text)) !== null) {
        const fullMatch = match[0];
        const rawAttrs = match[1];

        if (match.index > lastIndex) {
            newNodes.push({
                type: 'text',
                value: text.slice(lastIndex, match.index),
            });
        }

        const attrs = parseCardReplaceAttrs(rawAttrs);

        // 允许：
        // {{cardReplace id=xxx}}
        // {{cardReplace id=xxx type=thinking}}
        // {{cardReplace type=thinking}}
        if (attrs.id || attrs.type) {
            newNodes.push(createCardReplaceNode(attrs));
        } else {
            newNodes.push({
                type: 'text',
                value: fullMatch,
            });
        }

        lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < text.length) {
        newNodes.push({
            type: 'text',
            value: text.slice(lastIndex),
        });
    }

    return newNodes;
}

export function remarkCardReplace() {
    return function transformer(tree) {
        visit(tree, 'paragraph', (paragraphNode, paragraphIndex, paragraphParent) => {
            if (!paragraphParent || typeof paragraphIndex !== 'number') return;
            if (!Array.isArray(paragraphNode.children)) return;

            const expandedChildren = [];

            for (const child of paragraphNode.children) {
                if (child.type === 'text') {
                    expandedChildren.push(...splitTextNodeByCardReplace(child));
                } else {
                    expandedChildren.push(child);
                }
            }

            const hasCardReplace = expandedChildren.some((child) => {
                return child.type === 'cardReplace';
            });

            if (!hasCardReplace) {
                paragraphNode.children = expandedChildren;
                return;
            }

            const replacementNodes = [];
            let paragraphBuffer = [];

            const flushParagraphBuffer = () => {
                if (!hasMeaningfulChildren(paragraphBuffer)) {
                    paragraphBuffer = [];
                    return;
                }

                replacementNodes.push(
                    createParagraphFromChildren(paragraphBuffer, paragraphNode)
                );

                paragraphBuffer = [];
            };

            for (const child of expandedChildren) {
                if (child.type === 'cardReplace') {
                    flushParagraphBuffer();
                    replacementNodes.push(child);
                } else {
                    paragraphBuffer.push(child);
                }
            }

            flushParagraphBuffer();

            if (replacementNodes.length === 0) {
                paragraphParent.children.splice(paragraphIndex, 1);
                return;
            }

            paragraphParent.children.splice(
                paragraphIndex,
                1,
                ...replacementNodes
            );
        });
    };
}

export function rehypeInlineCodeProperty() {
    return function transformer(tree) {
        visit(tree, 'code', (node) => {
            const data = node.data || (node.data = {});

            data.hProperties = {
                ...(data.hProperties || {}),
                isCodeBlock: true,
            };
        });
    };
}