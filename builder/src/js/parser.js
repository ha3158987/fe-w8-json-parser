import tokenizer from "./tokenizer.js";
import lexer from "./lexer.js";

const parser = (lexerToken) => {
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