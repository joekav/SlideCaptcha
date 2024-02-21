const traverse = require('@babel/traverse').default;
const t = require("@babel/types");


// BASIC string concatenation
function stringConcatenation(ast) {
    traverse(ast, {
        BinaryExpression: {
          exit(path){
            const [left, right] = [path.get("left"), path.get("right")];
            if(!left.isStringLiteral() || !right.isStringLiteral())return;

            path.replaceWith(t.stringLiteral(left.node.value + right.node.value));
          }
        }
    });
}

module.exports = stringConcatenation;