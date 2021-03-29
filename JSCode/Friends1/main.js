const log = console.log;
const tokenizer = require('./tokenizer');
const check = require('./check');
const lexer = require('./lexer');
const parser = require('./parser');
const test = "[1, [2,[3]],'hello123', 'world', null]";
const test2 = "[[1,[2,[3],'hello']]";

const pipe = (...fns) => (args) => fns.reduce((arg,fn) => fn(arg), args);

const composed = str => pipe(tokenizer, check, lexer)(str);

const compose = (parser, main2) => (args)=> parser(main2(args),0);

const main = str => compose(parser, composed)(str);

console.dir(main(test)[0], { depth: null });