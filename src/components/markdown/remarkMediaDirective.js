/** Build an explicit Markdown media marker without enabling arbitrary HTML. */
export function createMediaDirective(mediaType) {
    const marker = `{type=${mediaType}}`;

    function followsImageExactly(image, text, source) {
        if (image.type !== 'image' || text?.type !== 'text' || !text.value.startsWith(marker)) return false;

        const imageEnd = image.position?.end?.offset;
        const textStart = text.position?.start?.offset;
        if (typeof imageEnd === 'number') {
            if (typeof textStart === 'number' && imageEnd !== textStart) return false;
            // Character references and escaped braces are ordinary text, not opt-ins.
            if (typeof source === 'string') return source.slice(imageEnd, imageEnd + marker.length) === marker;
        }
        return true;
    }

    function splitParagraph(paragraph, source) {
        const result = [];
        let buffer = [];
        let foundMedia = false;
        const flush = () => {
            if (buffer.length && buffer.some((child) => child.type !== 'text' || child.value.trim())) {
                result.push({ ...paragraph, children: buffer });
            }
            buffer = [];
        };

        for (let index = 0; index < paragraph.children.length; index += 1) {
            const image = paragraph.children[index];
            const following = paragraph.children[index + 1];
            if (!followsImageExactly(image, following, source)) {
                buffer.push(image);
                continue;
            }
            foundMedia = true;
            flush();
            result.push({
                type: `${mediaType}Embed`,
                data: {
                    hName: mediaType,
                    hProperties: { src: image.url, title: image.alt || image.title || '' },
                    hChildren: [],
                },
                position: image.position,
            });
            const remainder = following.value.slice(marker.length);
            if (remainder) buffer.push({ ...following, value: remainder, position: undefined });
            index += 1;
        }
        if (!foundMedia) return [paragraph];
        flush();
        return result;
    }

    return () => (tree, file) => {
        const source = typeof file?.value === 'string' ? file.value : null;
        function transformChildren(parent) {
            if (!Array.isArray(parent.children)) return;
            const transformed = [];
            for (const child of parent.children) {
                if (child.type === 'paragraph') transformed.push(...splitParagraph(child, source));
                else {
                    transformChildren(child);
                    transformed.push(child);
                }
            }
            parent.children = transformed;
        }
        transformChildren(tree);
    };
}
