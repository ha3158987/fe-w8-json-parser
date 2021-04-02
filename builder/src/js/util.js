//--------------util obj----------------
const util = {
    $: (selector, base = document) => base.querySelector(selector),
    pipe : (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg),
    strToLetter: str => str.split('').filter(el => el !== ' ')
}

//------------bracket obj---------------
const brackets = {
    SBRACKETS_LEFT : "(",
    SBRACKETS_RIGHT : ")",
    MBRACKETS_LEFT : "{",
    MBRACKETS_RIGHT : "}",
    BBRACKETS_LEFT : "[",
    BBRACKETS_RIGHT : "]"
}

export { util, brackets };

