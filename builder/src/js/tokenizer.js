import { util, brackets } from './util.js';
/*
- 제일 바깥의 괄호를 제외하고 쉼표(,)를 기준으로 토큰을 나눈다.
- 단, 괄호([], {}, ())나 따옴표("", '')가 나올 경우, 하나의 토큰 단위로 묶는다.
- 괄호([], {}, ())나 따옴표("", '')가 열렸을 경우, buffer 안에 문자열을 하나씩 쌓아간다. buffer가 끝나는 조건은 bracketstack이 비어있고(&&), 쉽표가 들어왔을때.
- bracketstack은 왼쪽(열리는 괄호)일 경우, push를 하고, 오른쪽(닫히는)일 경우 pop을 한다.
- bracketstack이 빈 상태가 되면, 완성된 buffer를 tokenizerstack에 push한다.
*/
const { SBRACKETS_LEFT, SBRACKETS_RIGHT, MBRACKETS_LEFT, MBRACKETS_RIGHT, BBRACKETS_LEFT, BBRACKETS_RIGHT } = brackets;
const [SQUOTES, DQUOTES] = ["'",'"'];
const LEFTS = [SBRACKETS_LEFT, MBRACKETS_LEFT, BBRACKETS_LEFT];
const RIGHTS = [SBRACKETS_RIGHT, MBRACKETS_RIGHT, BBRACKETS_RIGHT];
const QUOTES = [SQUOTES, DQUOTES]

const tokenizer = (str) => {
    let BRACKETS_SET = []
    BRACKETS_SET.push(SBRACKETS_LEFT,SBRACKETS_RIGHT, MBRACKETS_LEFT, MBRACKETS_RIGHT, BBRACKETS_LEFT, BBRACKETS_RIGHT, SQUOTES, DQUOTES);

    const splitedArr = util.strToLetter(str);
    let buffer = '';
    const bracketStack = [];
    const tokenStack =[];
    for (let i = 1; i < splitedArr.length - 1; i++){
        // brackets_set에 해당 하는 값이 들어온 경우
        const currEl = splitedArr[i];
        if (BRACKETS_SET.includes(currEl)) {
            // left 브라켓이 들어오면 push
            if (LEFTS.includes(currEl)) {
                bracketStack.push(currEl);
                buffer += currEl;
            }
            if (RIGHTS.includes(currEl)) {
                // right 브라켓이 들어오면 pop
                bracketStack.pop();
                buffer += currEl;
            }

            if (QUOTES.includes(currEl)) {
            bracketStack[bracketStack.length - 1] == currEl ? bracketStack.pop() : bracketStack.push(currEl)

                buffer += currEl
            }
        // brackets_set에 해당되지 않고, bracketStack의 길이가 0인 경우 => 숫자 또는 문자가 계속 들어올 예정
        // 이 분기에서는 , 기준으로 buffer에 추가할지 tokenStack에 추가할지를 결정하게 됨.
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