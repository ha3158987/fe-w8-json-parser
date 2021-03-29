const pipe = (...fns) => (args) => fns.reduce((arg,fn) => fn(arg), args);

const str_to_letter = str => str.split('').filter(x => x != ' ');

const letter_to_word = str => {
    const NUMBER = /[0-9]/;
    const ARRAY = /[\[\]]/;
    const STRING = /[\-A-Za-z.]/;
    const END = /[,\]\'\"]/;
    const result = [];
    let buffer = '';
    let idx = 0
    while(str[idx]){
        if(END.test(str[idx]) && buffer != ''){
            if(STRING.test(buffer) && str[idx] == ',' && STRING.test(str[idx+1])) {
                buffer += str[idx];
                idx ++;
                continue
            }
            result.push(buffer);
            buffer = '';
        }
        if(ARRAY.test(str[idx])) result.push(str[idx]);
        else if(NUMBER.test(str[idx]) || STRING.test(str[idx])) buffer += str[idx];
        idx++;
    }
    return result;
}

const tokenizer = (str) => pipe(str_to_letter, letter_to_word)(str);

module.exports = tokenizer;