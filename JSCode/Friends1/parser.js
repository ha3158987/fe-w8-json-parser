const parser = (str, idx) => {
    const result = [];
    let temp_result;
    let curr;
    while (str[idx]){
        if(str[idx].type === 'array'){
            curr = idx;
            [temp_result, idx] = parser(str, idx+1);
            str[curr].child= temp_result;
            result.push(str[curr]);
        }else if(str[idx].type === 'array_end'){
            return [result , idx];
        }else{
            result.push(str[idx])
        }
        idx++;
    }
    return [result , idx];
}

module.exports = parser;