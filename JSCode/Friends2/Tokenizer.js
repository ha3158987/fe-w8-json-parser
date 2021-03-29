const isValidArray = require("./IsValidArray");

const [LEFT_BRACKET, RIGHT_BRACKET, COMMA, BLANK] = ["[", "]", ",", " "];

const tokenizer = (str) => {
  try {
    if (!isValidArray(str)) throw new Error("올바른 배열 형태가 아닙니다.");
  } catch (e) {
    console.log(e.message);
    process.exit();
  }

  const isQuote = (ch) => ch === '"' || ch === "'";

  const tokenArr = [];
  let token = "";
  const quoteStack = [];
  const bracketStack = [];

  // 첫번째 [
  tokenArr.push(str.charAt(0));

  for (let i = 1; i < str.length - 1; i++) {
    const ch = str.charAt(i);
    if (ch === BLANK) continue;

    if (ch === LEFT_BRACKET) bracketStack.push(ch);
    if (ch === RIGHT_BRACKET) bracketStack.pop();

    if (isQuote(ch)) {
      if (quoteStack[0] === ch) quoteStack.pop();
      else quoteStack.push(ch);
    }

    if (ch === COMMA) {
      if (bracketStack.length === 0 && quoteStack.length === 0) {
        tokenArr.push(token);
        token = "";
        continue;
      }
    }
    token += ch;
  }
  tokenArr.push(token);
  tokenArr.push(str.charAt(str.length - 1));

  return tokenArr;
};

module.exports = tokenizer;