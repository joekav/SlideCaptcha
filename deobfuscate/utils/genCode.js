const generate = require("@babel/generator").default;
function genCode(code){
  return generate(code).code;
}
module.exports = genCode