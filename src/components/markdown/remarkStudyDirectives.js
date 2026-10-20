import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const STUDY_DIRECTIVES = new Set(['study-session', 'study-section', 'study-card']);
const CARD_TONES = new Set(['info', 'success', 'warning']);
export const STUDY_CARD_ICONS = ['book', 'calendar', 'check', 'clock', 'idea', 'scale', 'star', 'target', 'users'];
const CARD_ICONS = new Set(STUDY_CARD_ICONS);
const plainMarkdown = unified().use(remarkParse).use(remarkGfm).use(remarkMath);

const shortText = (value, fallback, limit = 120) => {
    const text = typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, limit) : '';
    return text || fallback;
};

const time = (value) => {
    const text = typeof value === 'string' ? value.trim() : '';
    return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(text) ? text : '';
};

/**
 * Document-only visual blocks. Directive attributes are never copied directly
 * into HTML properties: only the small, validated public contract is kept.
 */
export default function remarkStudyDirectives({ idPrefix = 'study' } = {}) {
    const safePrefix = String(idPrefix).replace(/[^a-zA-Z0-9_-]/g, '') || 'study';
    return (tree, file) => {
        const sessions = [];
        const source = typeof file?.value === 'string' ? file.value : '';

        const rawSource = (node) => {
            const start = node.position?.start?.offset;
            const end = node.position?.end?.offset;
            return Number.isInteger(start) && Number.isInteger(end) && end >= start
                ? source.slice(start, end)
                : null;
        };

        const shiftOffsets = (node, base) => {
            if (node.position?.start && Number.isInteger(node.position.start.offset)) node.position.start.offset += base;
            if (node.position?.end && Number.isInteger(node.position.end.offset)) node.position.end.offset += base;
            for (const child of node.children || []) shiftOffsets(child, base);
        };

        const restoreUnknown = (node) => {
            const raw = rawSource(node);
            if (node.type === 'textDirective') {
                return [{ type: 'text', value: raw ?? node.name ?? '', position: node.position }];
            }
            if (raw !== null) {
                const restored = plainMarkdown.parse(raw).children;
                const base = node.position.start.offset;
                restored.forEach((child) => shiftOffsets(child, base));
                return restored;
            }
            return node.children?.length ? node.children : [{ type: 'text', value: node.name || '' }];
        };

        const transformChildren = (parent) => {
            if (!Array.isArray(parent.children)) return;
            for (let index = 0; index < parent.children.length; index += 1) {
                const node = parent.children[index];
                const isDirective = ['containerDirective', 'leafDirective', 'textDirective'].includes(node.type);
                if (isDirective && (node.type !== 'containerDirective' || !STUDY_DIRECTIVES.has(node.name))) {
                    const restored = restoreUnknown(node);
                    parent.children.splice(index, 1, ...restored);
                    index += restored.length - 1;
                    continue;
                }
                if (node.type !== 'containerDirective') {
                    transformChildren(node);
                    continue;
                }

                const attributes = node.attributes || {};
                let properties;

                if (node.name === 'study-session') {
                    const id = `${safePrefix}-session-${sessions.length + 1}`;
                    properties = {
                        id,
                        title: shortText(attributes.title, '未命名时段'),
                        start: time(attributes.start),
                        end: time(attributes.end),
                    };
                    sessions.push(properties);
                } else if (node.name === 'study-section') {
                    properties = {
                        title: shortText(attributes.title, '学习主题'),
                        number: shortText(attributes.number, '', 16).replace(/[^\p{L}\p{N}.-]/gu, ''),
                    };
                } else {
                    properties = {
                        title: shortText(attributes.title, '重点内容'),
                        tone: CARD_TONES.has(attributes.tone) ? attributes.tone : 'info',
                        icon: CARD_ICONS.has(attributes.icon) ? attributes.icon : 'book',
                    };
                }

                node.data = {
                    ...node.data,
                    hName: node.name,
                    hProperties: properties,
                };
                transformChildren(node);
            }
        };

        transformChildren(tree);

        if (sessions.length && tree.type === 'root') {
            const outline = {
                type: 'studyOutline',
                data: {
                    hName: 'study-outline',
                    hProperties: { items: JSON.stringify(sessions) },
                    hChildren: [],
                },
            };
            // Preserve an opening document title and place the generated agenda
            // immediately below it. There is no second outline to maintain.
            const position = tree.children[0]?.type === 'heading' && tree.children[0].depth === 1 ? 1 : 0;
            tree.children.splice(position, 0, outline);
        }
    };
}
