const trim = (s) => s.trim()
const isDigit = (str) => /^\d+$/.test(str);

function makeObj({type,value}){
    if(type === "array") return { type, child: [] }
    return {
        type : type,
        value : value,
        child : []
    }
}

// tokenizer
function tokenizer(s){
    const operators = ['[', ']', '{', '}', ',', ':'];
    let _tmpStr = "";
    const tokenArray = [];

    for(let i=0; i < s.length; i++){
        let ch = s[i]

        if(ch === " ") continue;

        if(operators.indexOf(ch) > -1){
            tokenArray.push(ch)
            continue;
        }

        _tmpStrp = s.substr(i).match( /^('[^']+') | (\d+) | (null)/);
        if(_tmpStr){
            tokenizer.push(_tmpStr[0]);
            i += _tmpStr[0].length-1;
        } else{
            if(/'\w+.*/.test(s.substr(i))){
                throw new Error("올바른 문자형태가 아니네요");
            }
        }
    }
    return tokenArray
}

// lexer
function lexer(a) {
    const lexerTokens = [];
    for (el of a){
        if(el === "["){
            lexerTokens.push(makeObj({ "type": "array"}))
        }else if(el === "]"){
            lexerTokens.push(makeObj({ "type": "arrayClose", "value": el}))
        }else if(/^'.*'$/.test(el)){
            lexerTokens.push(makeObj({ "type": "string", "value": el}))
        }else if(/\d+/.test(el)){
            lexerTokens.push(makeObj({ "type": "number", "value": el}))
        }else if(el === 'null') {
            lexerTokens.push(makeObj({ "type": "NULL", "value": el}))
        }else {
            // console.log("what is token",el);
        }
    }
    return lexerTokens;
}

//parser
function parser(a) {
    const arrayOpenCount = a.filter( ({type}) => type === "array").length;
    const arrayCloseCount = a.filter( ({type}) => type === "arrayClose").length;
    if(arrayOpenCount !== arrayCloseCount) throw new Error("배열이 잘 안닫힌거 같은데?")

    const reuslt = {type:'root',child:[]};
    const _stack = [];
    for(el of a){
        if(el.type ==="array") _stack.push(el);

        if(el.type === "number" || el.type === "string" || el.type === "NULL"){
            _stack[_stack.length-1].child.push(el);
        }

        if(el.type === "arrayClose"){
            const currentStack = _stack.pop();
            const _stackLength = _stack.length;
            if(_stackLength === 0) result.child.push(currentStack)
            else _stack[_stack.length-1].child.push(currentStack);
        }
    }
    return reuslt;
}

try {
    // const d = "[[1,[2,[3]], 'hello] world']";
    const d = "[[1,[2,[3]], 'hello','world',null]";
    const tokens = tokenizer(d);
    const lexerTokens = lexer(tokens);
    const resultData = parser(lexerTokens);
    console.log(JSON.stringify(resultData, null, 2))
} catch (err){
    console.log("ERROR : ",err.message)
}