import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import rehypeKatex from 'rehype-katex';
import {visit} from 'unist-util-visit';
import {remarkCardReplace, rehypeInlineCodeProperty} from './remarkDirectiveToComponent.js';
import {remarkWorkProcess} from './remarkWorkProcess.js';
import {remarkCollapseExecutionStatuses} from './remarkCollapseExecutionStatuses.js';
import remarkVideoDirective from './remarkVideoDirective.js';
import remarkAudioDirective from './remarkAudioDirective.js';
import remarkCwmLinks from './remarkCwmLinks.js';
import remarkStudyDirectives from './remarkStudyDirectives.js';
import rehypeDocumentTasks from './rehypeDocumentTasks.js';
import {rehypeStreamingText} from './rehypeStreamingText.js';

/** The same full-document syntax pipeline on the main thread and in the Worker. */
export function parseMarkdownSyntax(content, {replacement = {}, renderSurface = 'conversation', snapshot = false,
    studyDirectivesEnabled, studyIdPrefix, cardSpec, extraRehypePlugins = [], editableTasks, taskSourceContent, normalizeLine} = {}) {
    const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath)
        .use(studyDirectivesEnabled ? [[remarkDirective], [remarkStudyDirectives, {idPrefix: studyIdPrefix, spec: cardSpec}]] : [])
        .use(remarkCardReplace)
        .use(renderSurface === 'conversation' ? remarkWorkProcess : remarkCollapseExecutionStatuses, {replacement, renderSurface, snapshot})
        .use(remarkVideoDirective).use(remarkAudioDirective).use(remarkCwmLinks).use(rehypeInlineCodeProperty)
        .use(remarkRehype, {allowDangerousHtml: true}).use(rehypeKatex).use(extraRehypePlugins)
        .use(editableTasks ? [[rehypeDocumentTasks, {sourceContent: taskSourceContent,
            normalizeLine}]] : [])
        .use(rehypeStreamingText, {enabled: renderSurface === 'conversation'});
    const tree = processor.runSync(processor.parse(content), {value: content});
    // Match ReactMarkdown's default: raw HTML is displayed as text, never executed.
    visit(tree, 'raw', (node, index, parent) => { parent.children[index] = {type: 'text', value: node.value}; });
    return tree;
}
