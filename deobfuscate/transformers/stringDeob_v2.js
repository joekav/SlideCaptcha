const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const vm = require('vm');
const genCode = require('../utils/genCode');


const clone = t.cloneDeepWithoutLoc;

function stringDeobfuscationV2(ast) {
  const props = ast.program.body[0].expression.argument.arguments[0].properties;

  console.log("We have " + props.length + " files!");
  for (let i = 0; i < props.length; i++) {
    const context = {};
    const prop = props[i];

    const program = t.program([t.expressionStatement(t.unaryExpression("!", clone(prop.value.elements[0])))]);

    /** @type {t.BlockStatement} */
    const wantedMainBlockStatement = program.body[0].expression.argument.body;

    for (let node of wantedMainBlockStatement.body) {
      if (
        !(
          t.isFunctionDeclaration(node) ||
          t.isVariableDeclaration(node)
        )
      ) continue;

      if(t.isVariableDeclaration(node)){
        const declarations = node.declarations;
        if(declarations.length > 1)continue;

        const [declaration] = declarations;

        if(!declaration.init || !t.isArrayExpression(declaration.init))continue;
      }

      vm.runInNewContext(genCode(node), context);
    }

    traverse(t.file(program), {
      CallExpression: {
        exit(path) {
          const [callee, args] = [path.get("callee"), path.get("arguments")];

          if (!callee.isIdentifier()) return;

          const calleeName = callee.node.name;

          if (context[calleeName] == undefined) return;

          if(typeof context[calleeName] !== "function")return;

          if(args.some(arg => !arg.isNumericLiteral()))return;

          const value = vm.runInNewContext(path.toString(), context);

          path.replaceWith(t.valueToNode(value));

        }
      }
    });

    traverse.cache.clear();

    traverse(t.file(program), {
      Program(path){
        const stmts = path.get("body.0.expression.argument.body.body");

        for(let stmt of stmts){
          if(!stmt.isFunctionDeclaration())continue;

          const id = stmt.get("id");

          if(!id.isIdentifier())continue;

          const isReferenced = stmt.scope.getBinding(id.node.name).referenced;

          if(!isReferenced)stmt.remove();
        }
      }
    });

    traverse.cache.clear();

    prop.value.elements[0] = clone(program.body[0].expression.argument);

    console.log(`Finished file ${i+1}`);
  }
}


module.exports = stringDeobfuscationV2;
