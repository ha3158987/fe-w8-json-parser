const tokenizer = require("./Tokenizer");
const lexer = require("./Lexer");

const filterBracket = (lexicalToken) => {
  return (
    lexicalToken.type !== "leftBracket" && lexicalToken.type !== "rightBracket"
  );
};

const parser = (lexicalTokenArray) => {
  return {
    type: "array",
    child: lexicalTokenArray.filter(filterBracket).map((lexicalToken) => {
      const { type, value } = lexicalToken;
      if (type === "array")
        return { type, child: parser(lexer(tokenizer(value))) };
      else return { type, value, child: [] };
    }),
  };
};

module.exports = parser;