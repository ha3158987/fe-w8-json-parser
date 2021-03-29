// const str = "[1123, [2,[3]],'hello', 'world', null]";
// const str = "[1, [2,[3,[4,[5]]]],'hello', 'world', null]";
// const str = '[123,"adfd",456]'
// const str = "[123,'aaaddd',456]"

const str1 = "[1, [2,[3,[4,[5]]]],'hello', 'world', null]"
const str2 = "[[1,[2,[3],'hello']]"

const result1 = ArrayParser(str1);
const result2 = ArrayParser(str2);

function ArrayParser(str){
    console.log(`input : ${str}`)
    // str = str.replace(/\[/,'').replace(/\]$/,'')
    // console.log(str)
    
    if (!exception(str)){
        console.log('//ERROR : "올바른 배열 형태가 아니네요.')
        // return '//ERROR : "올바른 배열 형태가 아니네요.'
        process.exit()
    }
    
    str = bracketRemover(str)
    console.log(`bracketRemoved : ${str}`)
    finalResult = []
    parseResult = {}
    factor = ''

    let quotes1Flag = 0
    let quotes2Flag = 0

    for (var i = 0; i < str.length+1; i++){
        
        // parsing number
        if(typeChecker(str[i]) === "number" && quotes1Flag === 0 && quotes2Flag === 0){
            factor = numberCompressor(factor,str[i])
        }

        // // parsing quotes1 
        if(typeChecker(str[i]) === "quotes1"){
            quotes1Flag ? quotes1Flag = 0 : quotes1Flag = 1
        }else if(quotes1Flag === 1){
            factor = stringCompressor(factor,str[i])
        }

        // // parsing quotes12
        if(typeChecker(str[i]) === "quotes2"){
            quotes2Flag ? quotes2Flag = 0 : quotes2Flag = 1
        }else if(quotes2Flag === 1){
            factor = stringCompressor(factor,str[i])
        }

        // parsing rest & undefined
        if(typeChecker(str[i]) === "rest"){
            finalResult.push(close(factor,parseResult))
            parseResult={}
            factor = ''
        } else if(typeChecker(str[i]) === "undefined"){
            finalResult.push(close(factor,parseResult))
            parseResult={}
            factor = ''
            // Object.keys(result).length
        }
    }
    console.log(finalResult)

}

function exception(str){
    return str.match(/\[/g).length === str.match(/\]/g).length ? true : false
}

function bracketRemover(str){
    return str.replace(/\[/,'').replace(/\]$/,'')
}

function typeChecker(spell){
    isNaN(parseFloat(spell)) ? returnType =  typeof(spell) : returnType =  typeof(parseFloat(spell))
    if (returnType !== "number"){
        if (spell === '[') returnType = "array"
        if (spell === '"') returnType = "quotes1"
        if (spell === "'") returnType = "quotes2"
        if (spell === ',') returnType = "rest"
    }
    return returnType
}

function compressor(factor, spell){
    // console.log(typeChecker(spell))
    if (typeChecker(spell) === "number"){
        // console.log(`${factor} + ${spell} "AAA"`)
        factor += spell
    }
    // console.log(factor)
    return factor
}

function numberCompressor(factor, spell){
    factor += spell
    return factor
}

function stringCompressor(factor, spell){
    factor += spell
    return factor
}

function close(factor,parseResult){
    parseResult.type = typeChecker(factor.charAt(factor.lenght-1))
    parseResult.value = factor
    return parseResult
}

