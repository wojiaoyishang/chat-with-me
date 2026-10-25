import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { graphNodeColor, knowledgeGraphPresentation } from '../src/features/chat/ui/message/components/knowledgeGraphPresentation.js';
import { createChatKnowledgeGraph } from '../src/features/chat/ui/message/components/chatKnowledgeGraphRenderer.js';

test('source chunks and Time use contrasting stable colors while dynamic schema colors stay deterministic', () => {
    const model = knowledgeGraphPresentation({ nodes: [
        { id: 'source', labels: ['Knowledge', 'Chunk'] },
        { id: 'time', label: 'OrderedNode', labels: ['OrderedNode', 'Time'] },
        { id: 'chapter', label: 'Chapter', labels: ['Chapter', 'OrderedNode'] },
        { id: 'custom', label: '自定义分类' },
    ] });
    const colors = new Map(model.nodes.map(node => [node.id, node.color]));
    assert.equal(colors.get('source'), '#4f8bb8');
    assert.equal(colors.get('time'), '#dc8792');
    assert.notEqual(colors.get('source'), colors.get('time'));
    assert.equal(colors.get('chapter'), graphNodeColor('Chapter'));
    assert.equal(colors.get('custom'), graphNodeColor('自定义分类'));
    assert.equal(graphNodeColor('Event'), '#b28aca');
});

test('chat graph keeps distinct Chunk and Time fills through hover and selection', t => {
    const dom = new JSDOM('<section><svg><g data-graph-camera><g data-graph-edges></g><g data-graph-nodes></g></g></svg></section>', { pretendToBeVisual: true });
    const { window } = dom, svg = window.document.querySelector('svg');
    window.matchMedia = () => ({ matches: true });
    window.requestAnimationFrame = () => 1;
    window.cancelAnimationFrame = () => {};
    const controller = createChatKnowledgeGraph(svg, { markerId: 'colors-test' });
    t.after(() => { controller.destroy(); dom.window.close(); });
    controller.setData(knowledgeGraphPresentation({ nodes: [
        { id: 'chunk', label: 'Chunk', name: '原文' },
        { id: 'time', label: 'Time', name: '9月12日' },
    ], relationships: [{ id: 'source', from: 'time', to: 'chunk', type: 'EXTRACTED_FROM' }] }));
    const fills = () => [...svg.querySelectorAll('.knowledge-node > circle:first-child')].map(circle => circle.getAttribute('fill'));
    assert.deepEqual(fills(), ['#4f8bb8', '#dc8792']);
    const chunk = svg.querySelector('[data-node-id="chunk"]');
    chunk.dispatchEvent(new window.MouseEvent('mouseenter', { bubbles: true }));
    chunk.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert.deepEqual(fills(), ['#4f8bb8', '#dc8792']);
});
