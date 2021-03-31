import util from './util.js';

const [SBRACKETS_LEFT, SBRACKETS_RIGHT] = ["(",")"];
const [MBRACKETS_LEFT, MBRACKETS_RIGHT] = ["{","}"];
const [BBRACKETS_LEFT, BBRACKETS_RIGHT] = ["[","]"];
let BRACKETS_SET = [SBRACKETS_LEFT,SBRACKETS_RIGHT, MBRACKETS_LEFT, MBRACKETS_RIGHT, BBRACKETS_LEFT, BBRACKETS_RIGHT];
let BRACKETS_RIGHT = [SBRACKETS_RIGHT, MBRACKETS_RIGHT, BBRACKETS_RIGHT]

const isValidate = (str) => {
    let isValid = true;
    const bracketStack = [];
    const letterArr = util.strToLetter(str);
    const bracketArr = letterArr.filter(el => BRACKETS_SET.includes(el));
    bracketArr.forEach(ele => {
        if(BRACKETS_RIGHT.includes(ele)){
            const lastEl = bracketStack[bracketStack.length - 1];
            switch(lastEl) {
                case SBRACKETS_LEFT:
                    ele !== SBRACKETS_RIGHT ? isValid =  false : "";
                case MBRACKETS_LEFT:
                    ele !== MBRACKETS_RIGHT ? isValid =  false : "";
                case BBRACKETS_LEFT:
                    ele !== BBRACKETS_RIGHT ? isValid =  false : "";
            }
        } else {
            bracketStack.push(ele);
        }
    });
    return isValid;
}

export default isValidate;