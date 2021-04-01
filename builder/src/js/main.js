import util from './util.js';
import tokenizer from './tokenizer.js';
import lexer from './lexer.js';
import parser from './parser.js';
import isValidate from './isValidate.js';

const jsonParser = (str) = util.pipe(tokenizer, lexer, parser)(str);
console.log(isValidate);


export default jsonParser;

