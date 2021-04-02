import tokenizer from "./tokenizer.js";
import lexer from "./lexer.js";

const parser = (lexerToken) => {
    console.log("lexerToken", lexerToken);
    return lexerToken.map(token => {
        if(token.type === "array" || token.type === "object"){
            if(token.type === "array") {
                return {
                    type: token.type,
                    value: createChild(token.value)
                }
            }
            if(token.type === "object"){
                return {
                    type: token.type,
                    child: createChild(token.value)
                    // key: getKey(token.value),
                    // value: getValue(token.value)
                }
            }
        } else {
            return {
                type: token.type,
                value: token.value
            };
        }
    })
}

const createChild = (value) => (parser(lexer(tokenizer(value))));

const getKey = (str) => {
    const temp = [];
    const keyStack = [];
    for(let i = 1; i < str.length; i++){
        if(str[i] !== ":") {
            temp.push(str[i]);
        }
        if(str[i] === ":") {
            keyStack.push(temp.join(""));
        }
        if(str[i] === ",") {
            getKey(str.slice(i, str.length -1));
        }
    }
    return keyStack.join("");
};

const getValue = (str) => {
    const valueStack = [];
    let idx;
    for(let i = 1; i < str.length - 1; i++){
        console.log(str[i])
        if (str[i] === ":") {
            idx = i;
        }
        if (i > idx) {
            valueStack.push(str[i]);
        }
        if (str[i] === "[" || str[i] === "{"){
            createChild(str[i]);
        }
    }
    return valueStack.join("");
};

const parser = (lexerToken) => {
    console.log("lexerToken", lexerToken);
    return {
        type : 'array',
        child : lexerToken.map(token => {
            if (token.type === "array") {
                return createChild(token.value);
            } else if (token.type === "object"){
                return createChild(token.type === "array");
            }
            else {
                return {
                    type: token.type,
                    value: token.value
                };
            }
        })
    };
}


// type: Object,
// child: [
//     {
//         key: value
//     },
//     {
//         key: value
//     }
// ]

export default parser;