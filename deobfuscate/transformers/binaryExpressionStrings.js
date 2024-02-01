const traverse = require('@babel/traverse').default;
const t = require('@babel/types');


function deobBinaryExpressionStrings(ast) {
    traverse(ast, {
        BinaryExpression(path) {
            if (path.node.operator === '+') {
                let nodes = [];
                let current = path.node;

                while (t.isBinaryExpression(current, { operator: '+' })) {
                    nodes.unshift(current.right);
                    current = current.left;
                }
                nodes.unshift(current);

                if (nodes.every(node => t.isStringLiteral(node))) {
                    let concatenatedString = nodes.reduce((acc, node) => acc + node.value, '');
                    path.replaceWith(t.stringLiteral(concatenatedString));
                }
            }
        }
    });
}



module.exports = deobBinaryExpressionStrings;