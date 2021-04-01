import util from './js/util.js';
import tokenizer from './js/tokenizer.js';
import lexer from './js/lexer.js';
import parser from './js/parser.js';
import _ from './js/util.js';
import isValidate from './js/isValidate.js';

// const jsonParser = (str) = util.pipe(tokenizer, lexer, parser)(str);
const submitBtn = _.$(".submit");
const result = {
    tokenizer: _.$(".tokenizer_viewer"),
    lexer: _.$(".lexer_viewer"),
    parser: _.$(".parser_viewer")
}

// console.log(util.pipe)

submitBtn.addEventListener("click", () => {
    let inputStr = _.$("#input-data").value;
    if(isValidate(inputStr)){
        result.tokenizer.textContent = JSON.stringify(tokenizer(inputStr));
        result.lexer.textContent = JSON.stringify(lexer(tokenizer(inputStr)));
        result.parser.textContent = JSON.stringify(parser(lexer(tokenizer(inputStr))), null, "   ");
    } else {
        result.tokenizer.textContent = "Invalid Input";
        result.lexer.textContent = "Invalid Input";
        result.parser.textContent = "Invalid Input";
    }
})