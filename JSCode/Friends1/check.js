const check_array = (str) => {
    const stack = str.reduce((acc,val) => {
        if(val == '[' || val == ']') acc.push(val);
        return acc;
    },[])
    if (stack[0] == ']') throw new Error( `ERROR : "올바른 배열 형태가 아니네요"`);
    stack.shift();
    const result = stack.reduce((acc,val) => {
        if(acc[acc.length-1] == val) acc.push(val);
        else acc.pop();
        return acc;
    },['['])
    if (result.length != 0) throw new Error( `ERROR : "올바른 배열 형태가 아니네요"`);
}

const check = (str) =>{
    try{
        check_array(str)
    }catch (e){
        console.log(e);
        process.exit();
    }
    return str
}

module.exports = check;