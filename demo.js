

//校验函数

// var isValid=function(s){
//     let len=s.length
//     if(len%2) return false
//     let stack=[]
//     for(let i=0;i<s.length;i++){
//         if(s[i]=='('||s[i]=="{"||s[i]=="["){
//             stack.push(s[i])
//         }else{
//             let end=stack[stack.length-1]
//             if(s[i]==')'&&end=="("||
//             s[i]=="}"&&end=="}"||
//             s[i]=="]"&&end=="]"){
//                  stack.pop()
//             }else{
//                 console.log(stack.length)
//                 return false
//             }
//         }
//     }
//     console.log(stack.length)

//    return   stack.length==0
// }
var isValid = function (s) {
    let len = s.length;
    if (len % 2) return false
    let stack = [];
    let static = new Map([
        [')', '('],
        [']', '['],
        ['}', '{']
    ])
    for (let ch of s) {
        if (static.has(ch)) {
            if (!stack.length || stack[stack.length - 1] != static.get(ch)) {
                return false
            }
            stack.pop()
        } else {
            stack.push(ch)
        }
    }
    return stack.length == 0
}

isValid("((]]))")



