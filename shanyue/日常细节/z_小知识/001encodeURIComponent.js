// url转换
let url='path=pages/fprocessUnPass/index?problemid=42&listid=118&status=1&3ftype=2&processcode=WTLC202211066757'
console.log(encodeURIComponent(url))

//typeof和instanceof区别
/* typeof会返回一个变量的基本类型，instanceof返回的是一个布尔值  */
let a=1 ,b=function(){}
// typeof a   -------->  'number'
//  b instanceof Function --------> true

//