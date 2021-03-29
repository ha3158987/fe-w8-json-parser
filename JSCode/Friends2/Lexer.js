const tokenizer = require("./Tokenizer");
const staticTypes = {
  "[": "leftBracket",
  "]": "rightBracket",
  null: "NULL",
};

const lexicalToken = (type, value) => {
  return { type, value };
};

const lexer = (tokenArr) => {
  return tokenArr.map((token) => lexicalToken(getType(token), getValue(token)));
};

const getType = (token) => {
  const isArrayType = (token) => {
    return token.charAt(0) === "[" && token.charAt(token.length - 1) === "]";
  };

  const isNumberType = (token) => Number(token);

  if (token in staticTypes) return staticTypes[token];
  if (isArrayType(token)) return "array";
  if (isNumberType(token)) return "number";
  return "string";
};

const getValue = (token) => {
  if (token.charAt(0) === "'" && token.charAt(token.length - 1) === "'")
    return token.slice(1, -1);
  else return token;
};
module.exports = lexer;