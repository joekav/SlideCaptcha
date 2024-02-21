const traverse = require('@babel/traverse').default;


// Removes hexadecimal encoding from StringLiterals
function traverseHexStrings(ast) {
    traverse(ast, {
        StringLiteral(path) {
            delete path.node.extra;
        }
    });
}

module.exports = traverseHexStrings;