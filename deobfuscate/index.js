const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const fs = require('fs');
const generate = require('@babel/generator').default;
const traverseHexStrings = require('./transformers/hex.js');
// const stringDeobfuscation = require('./transformers/stringDeob.js');
// const deobBinaryExpressionStrings = require('./transformers/binaryExpressionStrings.js');
const bracketToDot = require('./transformers/bracketToDot.js');
const stringDeobfuscationV2 = require('./transformers/stringDeob_v2.js');
const stringConcatenation = require('./transformers/stringConcatenation.js');

const obfuscatedCode = fs.readFileSync('./assets/in.js', 'utf8');
const ast = babel.parseSync(obfuscatedCode);

console.log("Hexadecimal encoding")
traverseHexStrings(ast);
fs.writeFileSync('./assets/out_hex.js', generate(ast).code);

console.log("Bracket to dot notation");
bracketToDot(ast);
fs.writeFileSync("./assets/bracket_to_dot_notation.js", generate(ast).code);

console.log("Deobfuscating strings");
stringDeobfuscationV2(ast);
fs.writeFileSync('./assets/out_string_decode.js', generate(ast).code);

console.log("Concatenating strings");
stringConcatenation(ast);
fs.writeFileSync("./assets/out_string_concatenation.js", generate(ast).code);

console.log("Converting bracket notation to dot notation")
bracketToDot(ast);
fs.writeFileSync('./assets/out_bracket_dot1.js', generate(ast).code);

const { code } = babel.transformFromAstSync(ast);

fs.writeFileSync('./assets/out_final.js', code);
