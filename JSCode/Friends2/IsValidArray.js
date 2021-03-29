const [LEFT_BRACKET, RIGHT_BRACKET] = ["[", "]"];

const isValidArray = (str) => {
  const stack = [];

  for (let ch of str) {
    if (ch === LEFT_BRACKET) stack.push(ch);
    else if (ch === RIGHT_BRACKET) stack.pop();
  }

  return stack.length === 0;
};

module.exports = isValidArray;