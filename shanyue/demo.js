// const a=['','a','b']
// console.log(a.join(','))

//数组中出现次数最多的二个元素
let arr5 = Array(5).fill(5), arr4 = Array(4).fill(4), arr3 = Array(3).fill(3), arr2 = Array(2).fill(2), arr1 = Array(1).fill(1);
let oderArr = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5]
console.log(oderArr)
let middleArr = Array.from(new Set(oderArr))
let endArr = middleArr.map(item => {
    let time = oderArr.filter(v => {
        return v == item
    })
    let obj = {
        time: time.length,
        key: item
    }
    return obj
})
let needArr = [endArr[0]]
for (let i = 1; i < endArr.length; i++) {
    for (let j = 0; j < needArr.length; j++) {
        if (endArr[i].time > needArr[j].time) {
            needArr.splice(j, 0, endArr[i])
            break
        }
    }
}
console.log(needArr)

let arr = needArr.map(value => {
    return value.key
})
console.log(arr.join(','))

function repeat(subArray){
let a={}
for(let i=0;i<subArray.length;i++){
    a[subArray[i]]=='undefined'? a[subArray[i]]=1:a[subArray[i]]=a[subArray]++
}
for(const [key,value] of Object.entries(a)){
    
}
}