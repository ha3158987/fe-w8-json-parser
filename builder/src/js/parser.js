//구조를 분석해서 tree구조를 생성한다.
import tokenizer from "./tokenizer.js";
import lexer from "./lexer.js";

/*
type이 array인지 아닌지를 판단해서 재귀를 실행한다.
*/
const parser = (lexerToken) => {
    console.log("lexerToken", lexerToken);

    return {
        type : 'array',
        child : lexerToken.map(token => {
            if (token.type === "array") {
                return createChild(token.value);
            } else {
                return {
                    type: token.type,
                    value: token.value
                };
            }
        })
    };

}

const createChild = (value) => (parser(lexer(tokenizer(value))));



export default parser;