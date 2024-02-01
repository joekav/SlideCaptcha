const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const vm = require('vm');



function stringDeobfuscation(ast) {
    // Finds all functions which are called to deob strings
    var functions = {}

    // Keeps track of which ObjectProperty we are in, there is 8 of them as of 1.8.2
    var contextStack = []

    // Context for vm
    var context = {}

    traverse(ast, {
        ObjectProperty: {
            enter(path) {
                if (path.node.key.type === "NumericLiteral" && path.node.key.value >= 1 && path.node.key.value <= 8) {
                    contextStack.push(path.node.key.value);

                    if (path.node.key.value == 2 || path.node.key.value == 7) {
                        return
                    }

                    functions[path.node.key.value] = {}
                    for (var i = 0; i < path.node.value.elements[0].body.body.length; i++) {
                        var subNode = path.node.value.elements[0].body.body[i]

                        if (subNode.type != "FunctionDeclaration") {
                            continue
                        }

                        functions[path.node.key.value][subNode.id.name] = generate(subNode).code

                    }
                }
            },
            exit(path) {
                if (path.node.key.type === "NumericLiteral" && path.node.key.value >= 1 && path.node.key.value <= 8) {
                    contextStack.pop();
                }
            },
        },
        VariableDeclarator(path) {
            const currentContextKey = contextStack[contextStack.length - 1];

            if (path.node.id.name === 'wn' && path.node.init && path.node.init.type === 'ArrayExpression') {
                var codeToRun = Object.values(functions[currentContextKey]).join("\n")
                vm.runInNewContext(`${codeToRun}\nvar ${generate(path.node).code}\n`, context)
            }

        },
        CallExpression(path) {
            const { node } = path;
            const { arguments: args, callee } = node;
            const currentContextKey = contextStack[contextStack.length - 1];

            if (currentContextKey && functions[currentContextKey] && Object.keys(functions[currentContextKey]).includes(callee.name)) {
                var codeToRun = Object.values(functions[currentContextKey]).join("\n")

                try {
                    vm.runInNewContext(`${codeToRun}\nvar result = ${generate(node).code} `, context)

                    if (context.result === undefined) {
                        return
                    }
                    if (typeof context.result === "function") {
                        return
                    }
                    var val = t.valueToNode(context.result)

                    path.replaceWith(val)
                } catch (e) {
                    return
                }

            }
        }
    });
}


module.exports = stringDeobfuscation;
