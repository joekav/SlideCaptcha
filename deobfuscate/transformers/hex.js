const traverse = require('@babel/traverse').default;


// Removes hexadecimal encoding from StringLiterals
function traverseHexStrings(ast) {
    traverse(ast, {
        StringLiteral(path) {
            if (path.node.extra.raw !== path.node.value) {
                path.node.extra = undefined;
            }
        }
    });
}

module.exports = traverseHexStrings;