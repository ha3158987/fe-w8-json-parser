const util = {
    $: (selector, base = document) => base.querySelector(selector),
    pipe : (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg),
    strToLetter : str => str.split('').filter(el => el !== ' ')
}

export default util;