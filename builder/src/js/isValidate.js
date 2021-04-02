import { util, brackets } from './util.js';

const { SBRACKETS_LEFT, SBRACKETS_RIGHT, MBRACKETS_LEFT, MBRACKETS_RIGHT, BBRACKETS_LEFT, BBRACKETS_RIGHT } = brackets;
let BRACKETS_SET = [SBRACKETS_LEFT,SBRACKETS_RIGHT, MBRACKETS_LEFT, MBRACKETS_RIGHT, BBRACKETS_LEFT, BBRACKETS_RIGHT];
let BRACKETS_RIGHT = [SBRACKETS_RIGHT, MBRACKETS_RIGHT, BBRACKETS_RIGHT]
let isValid = true;

const isValidate = (str) => {
    isValid = true;
    const bracketStack = [];
    const bracketArr = util.strToLetter(str).filter(el => BRACKETS_SET.includes(el));
    bracketArr.forEach(ele => {
        if(BRACKETS_RIGHT.includes(ele)){
            bracketPairCheck(ele, bracketStack[bracketStack.length - 1])
            bracketStack.pop();
        } else {
            bracketStack.push(ele);
        }
    });
    if(bracketStack.length !== 0) isValid = false;
    return isValid;
}

function bracketPairCheck(RightBracket, lastEl){
    RightBracket === SBRACKETS_RIGHT && lastEl !== SBRACKETS_LEFT ? isValid = false : "";
    RightBracket === MBRACKETS_RIGHT && lastEl !== MBRACKETS_LEFT ? isValid = false : "";
    RightBracket === BBRACKETS_RIGHT && lastEl !== BBRACKETS_LEFT ? isValid = false : "";
}


export default isValidate;