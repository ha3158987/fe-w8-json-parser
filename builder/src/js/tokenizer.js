import { util, brackets } from './util.js';

const { SBRACKETS_LEFT, SBRACKETS_RIGHT, MBRACKETS_LEFT, MBRACKETS_RIGHT, BBRACKETS_LEFT, BBRACKETS_RIGHT } = brackets;
const [SQUOTES, DQUOTES] = ["'",'"'];
const LEFTS = [SBRACKETS_LEFT, MBRACKETS_LEFT, BBRACKETS_LEFT];
const RIGHTS = [SBRACKETS_RIGHT, MBRACKETS_RIGHT, BBRACKETS_RIGHT];
const QUOTES = [SQUOTES, DQUOTES]

const tokenizer = (str) => {
    let BRACKETS_SET = [...LEFTS, ...RIGHTS, ...QUOTES];
    const splitedArr = util.strToLetter(str);
    const bracketStack = [];
    const tokenStack =[];
    let buffer = '';

    for (let i = 1; i < splitedArr.length - 1; i++){
        const currEl = splitedArr[i];
        if (BRACKETS_SET.includes(currEl)) {
            if (LEFTS.includes(currEl)) {
                bracketStack.push(currEl);
                buffer += currEl;
            }
            if (RIGHTS.includes(currEl)) {
                bracketStack.pop();
                buffer += currEl;
            }
            if (QUOTES.includes(currEl)) {
            bracketStack[bracketStack.length - 1] == currEl ? bracketStack.pop() : bracketStack.push(currEl)
                buffer += currEl
            }
        } else if(!BRACKETS_SET.includes(currEl) && bracketStack.length === 0){
            if(currEl === ","){
                tokenStack.push(buffer)
                buffer = ""
            } else {
                buffer += currEl;
            }
        } else {
            buffer += currEl;
        }
    }
    tokenStack.push(buffer);
    return tokenStack;
}

export default tokenizer;