
// 재귀 -> tokenizer(문자열 쪼개기) -> lexer(type, value 부여) -> parser(객체화)
const tokenizer = require("./Tokenizer");
const lexer = require("./Lexer");
const parser = require("./Parser");

const pipe = (...fns) => (args) => fns.reduce((arg, fn) => fn(arg), args);

const ArrayParser = (str) => pipe(tokenizer, lexer, parser)(str);

const str = "[1, [2,[3,[4,[5]]]],'hello', 'world', null]";
const str2 = "[[1,[2,[3],'hello']]";

const result = ArrayParser(str);

console.dir(result, { depth: null });

// console.log(tokenizer(str))
// console.log(lexer(tokenizer(str)))
// console.log(parser(lexer(tokenizer(str))))
// console.log(result)