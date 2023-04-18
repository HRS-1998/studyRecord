
// function add(n1, n2) {
//     // ...省略参数类型判断及容错代码
//     const nums1Digits = n1.toString().split(".")[1].length;
//     const nums2Digits = n2.toString().split(".")[1].length;
//     const baseNum = Math.pow(10, Math.max(nums1Digits, nums2Digits));
//     // 或者用10 ** Math.max(nums1Digits , nums2Digits)
//     return (n1 * baseNum + n2 * baseNum) / baseNum;
//   }

//   console.log(0.1 + 0.2); // 0.30000000000000004
//   console.log(add(0.1, 0.2)); // 0.3

// //随机生成一个字符串
// radom = (n) => {
//     let i = Math.random()
//     let b = i.toString(36)
//     console.log(b) 
//     let c=b.slice(2,n+2)
//     console.log(c);

// }
// radom(5)


