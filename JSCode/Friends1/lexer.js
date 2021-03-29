const lexer = (strings) => {
    const NUMBER = /[0-9]/
    const ARRAY_START = /[\[]/
    const ARRAY_END = /[\]]/
    const NULL = /null/
    const result = [];
    for (let token of strings){
        if(ARRAY_START.test(token)) result.push({type: 'array', child : []});
        else if(ARRAY_END.test(token)) result.push({type: 'array_end'});
        else if(NUMBER.test(token)) result.push({type: 'number', value: token});
        else if(NULL.test(token)) result.push({type: 'NULL', value: token});
        else result.push({type: 'string', value: token});
    }
    return result;
}

module.exports = lexer;