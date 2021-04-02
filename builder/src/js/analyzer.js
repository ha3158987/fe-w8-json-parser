import { util } from './util.js';
import tokenizer from './tokenizer.js';
import lexer from './lexer.js';
import parser from './parser.js';

const analysisResult = util.$(".analyzer-result");
let MAXDEPTH;
let strTypeCount;
let numTypeCount;

const analyzer = (str) => {
    MAXDEPTH = 0;
    strTypeCount = 0;
    numTypeCount = 0;
    const parserResult = parser(lexer(tokenizer(str)), null, "   ");

    getDepth(parserResult, 0)
    countStrType(parserResult)
    countNumType(parserResult)
    const template = createTemplate(MAXDEPTH, strTypeCount, numTypeCount);
    analysisResult.innerHTML = template;
}

function getDepth(JSON, depth){
    if(JSON.child){
        depth += 1;
        for(let obj in JSON.child){
            getDepth(JSON.child[obj], depth)
        }
    }
    if(depth > MAXDEPTH){
        MAXDEPTH = depth;
    }
}

function countStrType(JSON){
    if(JSON.child){
        for(let obj in JSON.child){
            countStrType(JSON.child[obj])
        }
    } else {
        if(JSON.type === "string"){
            strTypeCount += 1;
        }
    }
}

function countNumType(JSON){
    if(JSON.child){
        for(let obj in JSON.child){
            countNumType(JSON.child[obj])
        }
    } else {
        if(JSON.type === "number"){
            numTypeCount += 1;
        }
    }
}

const createTemplate = (MAXDEPTH, strTypeCount, numTypeCount) => {
    return `
    <div class="arrDepth">배열 중첩 수준 : ${MAXDEPTH} 단계</div>
    <div class="stringCount">문자열 타입 갯수 : ${strTypeCount} 개</div>
    <div class="numCount">숫자 타입 갯수 : ${numTypeCount} 개</div>`;
}

export { analyzer }