import {parseMarkdownSyntax} from './markdownParser.js';

self.onmessage = ({data}) => {
    try { self.postMessage({id: data.id, tree: parseMarkdownSyntax(data.content, data.options)}); }
    catch (error) { self.postMessage({id: data.id, error: String(error?.message || 'Markdown parsing failed').slice(0, 300)}); }
};
