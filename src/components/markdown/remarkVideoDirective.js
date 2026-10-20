const VIDEO_MARKER = '{type=video}';

function followsImageExactly(image, text, source) {
    if (image.type !== 'image' || text?.type !== 'text' || !text.value.startsWith(VIDEO_MARKER)) {
        return false;
    }

    const imageEnd = image.position?.end?.offset;
    const textStart = text.position?.start?.offset;
    if (typeof imageEnd === 'number') {
        if (typeof textStart === 'number' && imageEnd !== textStart) return false;
        // The parser also turns escaped braces and character references into
        // text. Only a literal, adjacent suffix opts into video rendering.
        if (typeof source === 'string') {
            return source.slice(imageEnd, imageEnd + VIDEO_MARKER.length) === VIDEO_MARKER;
        }
    }

    return true;
}

function videoNodeFromImage(image) {
    return {
        type: 'videoEmbed',
        data: {
            hName: 'video',
            hProperties: {
                src: image.url,
                title: image.alt || image.title || '',
            },
            hChildren: [],
        },
        position: image.position,
    };
}

function splitParagraph(paragraph, source) {
    const result = [];
    let buffer = [];
    let foundVideo = false;

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

        foundVideo = true;
        flush();
        result.push(videoNodeFromImage(image));

        const remainder = following.value.slice(VIDEO_MARKER.length);
        if (remainder) {
            // The original positional range includes the consumed marker.
            buffer.push({ ...following, value: remainder, position: undefined });
        }
        index += 1;
    }

    if (!foundVideo) return [paragraph];
    flush();
    return result;
}

/**
 * Render `![description](url){type=video}` as a block video player.
 * Only the exact suffix is special; ordinary images, code, and :::card blocks
 * remain under the existing Markdown parser's control.
 */
export default function remarkVideoDirective() {
    return (tree, file) => {
        const source = typeof file?.value === 'string' ? file.value : null;

        function transformChildren(parent) {
            if (!Array.isArray(parent.children)) return;

            const transformed = [];
            for (const child of parent.children) {
                if (child.type === 'paragraph') {
                    transformed.push(...splitParagraph(child, source));
                } else {
                    transformChildren(child);
                    transformed.push(child);
                }
            }
            parent.children = transformed;
        }

        transformChildren(tree);
    };
}
