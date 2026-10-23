import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

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
export default function remarkStudyDirectives({ idPrefix = 'study', spec } = {}) {
    const safePrefix = String(idPrefix).replace(/[^a-zA-Z0-9_-]/g, '') || 'study';
    const directives = new Map((spec?.directives || []).map((entry) => [entry.name, entry]));
    return (tree, file) => {
        const sessions = [];
        const source = typeof file?.value === 'string' ? file.value : '';

        const rawSource = (node) => {
            const start = node.position?.start?.offset;
            const end = node.position?.end?.offset;
            return Number.isInteger(start) && Number.isInteger(end) && end >= start && end <= source.length
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
                if (isDirective && (node.type !== 'containerDirective' || !directives.has(node.name))) {
                    const restored = restoreUnknown(node);
                    parent.children.splice(index, 1, ...restored);
                    index += restored.length - 1;
                    continue;
                }
                if (node.type !== 'containerDirective') {
                    transformChildren(node);
                    continue;
                }

                const definition = directives.get(node.name);
                const attributes = node.attributes || {};
                const defaults = definition.defaultAttributes || {};
                const allowed = definition.allowedAttributes;
                const attributeNames = Array.isArray(allowed)
                    ? allowed.map((item) => typeof item === 'string' ? item : item?.name).filter(Boolean)
                    : Object.keys(allowed || defaults);
                const properties = {};
                for (const name of attributeNames) {
                    if (!Object.prototype.hasOwnProperty.call(defaults, name) && !Object.prototype.hasOwnProperty.call(attributes, name)) continue;
                    const value = attributes[name] ?? defaults[name];
                    const rule = Array.isArray(allowed)
                        ? allowed.find((item) => item?.name === name) || {}
                        : allowed?.[name] || {};
                    if (rule.type === 'time') properties[name] = time(value);
                    else if (rule.type === 'enum') properties[name] = rule.values?.includes(value) ? value : String(defaults[name] || '');
                    else {
                        const limit = Number.isInteger(rule.maxLength) ? rule.maxLength : 120;
                        const cleaned = shortText(value, String(defaults[name] || ''), limit);
                        properties[name] = name === 'number' ? cleaned.replace(/[^\p{L}\p{N}_.-]/gu, '') : cleaned;
                    }
                }

                if (definition.kind === 'session') {
                    const id = `${safePrefix}-session-${sessions.length + 1}`;
                    properties.id = id;
                    properties.title ||= '未命名时段';
                    sessions.push(properties);
                } else if (definition.kind === 'section') {
                    properties.title ||= '学习主题';
                } else {
                    properties.title ||= '重点内容';
                    properties.tone ||= 'info';
                    properties.icon ||= 'book';
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

        if (sessions.length && spec?.features?.autoOutline !== false && tree.type === 'root') {
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
