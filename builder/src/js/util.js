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

//--------------test cases--------------
const ex1 = '[123,[2,3),4, "abd", "aadcd"]';
const ex2 = "[123,[2,3],4, 'abd', 'aadcd']" ;
const ex3 = '[1, [1,[2,[3]]],"hello world", "codesquadFE", null, true, false]';
const ex4 = '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]';


export { util, brackets };