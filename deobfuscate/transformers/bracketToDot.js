const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

function bracketToDot(ast) {
    traverse(ast, {
        MemberExpression(path) {
            if (path.node.computed && t.isArrayExpression(path.node.property)) {
                path.node.computed = false;
                path.node.property = t.identifier(path.node.property.elements[0].value);
            }

            if (path.node.computed && t.isStringLiteral(path.node.property) && path.node.property.value !== "") {
                path.node.computed = false;
                path.node.property = t.identifier(path.node.property.value);
            }
        }
    });
}


module.exports = bracketToDot;