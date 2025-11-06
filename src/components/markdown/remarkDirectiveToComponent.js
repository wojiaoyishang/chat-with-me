import { visit } from 'unist-util-visit';

export default function remarkDirectiveToComponent() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type === 'containerDirective') {
                const data = node.data || (node.data = {});

                data.hName = 'component-block';
                data.hProperties = {
                    'component': node.name,
                    'type': node.attributes?.type || '',
                    'id': node.attributes?.id,
                };
            }
        });
    };
}