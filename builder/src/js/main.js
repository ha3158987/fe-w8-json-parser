import { util } from './util.js';
import tokenizer from './tokenizer.js';
import lexer from './lexer.js';
import parser from './parser.js';
import isValidate from './isValidate.js';
import { analyzer } from  './analyzer.js';

const _ = util;
const analyzerBtn = _.$(".analyzer");
let dataObj = {};

const runJSONParser = (str) => isValidate(str) ? processData(str) : showErrorMsg();

const chgToStr = (obj) => JSON.stringify(obj, null, "   ");

const processData = (str) => {
    analyzerBtn.addEventListener("click", () => analyzer(str));
    analyzerBtn.disabled = false;
    analyzerBtn.classList.add("activate");
    dataObj["tokenArr"] = chgToStr(tokenizer(str));
    dataObj["lexicalTokenArr"] = chgToStr(_.pipe(tokenizer, lexer)(str));
    dataObj["parsedData"] = chgToStr(_.pipe(tokenizer, lexer, parser)(str));
    return dataObj;
}

const showErrorMsg = () => {
    analyzerBtn.disabled = true;
    analyzerBtn.classList.remove("activate");
    const keys = ["tokenArr", "lexicalTokenArr", "parsedData"];
    keys.forEach(key => dataObj[key] = "Invalid Input ❌");
    return dataObj;
}

export default runJSONParser;
