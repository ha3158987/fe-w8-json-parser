import { util } from './js/util.js'
import runJSONParser from './js/main.js';

const _ = util;
const submitBtn = _.$(".submit");
const result = {
    tokenizer: _.$(".tokenizer_viewer"),
    lexer: _.$(".lexer_viewer"),
    parser: _.$(".parser_viewer")
}

submitBtn.addEventListener("click", () => {
    const inputStr = _.$("#input-data").value;
    const { tokenArr, lexicalTokenArr, parsedData } = runJSONParser(inputStr);
    result.tokenizer.innerHTML = tokenArr;
    result.lexer.innerHTML = lexicalTokenArr;
    result.parser.innerHTML = parsedData;
})

