```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .parent {
        width: 80%; /* 假设父元素宽度为容器宽度的80% */
        padding: 20px 0; /* 上下内边距20px，左右为0 */
        display: flex; /* 使用Flexbox布局使子元素横向排列 */
        justify-content: space-between; /* 子元素之间间隔相等，且两端对齐 */
        margin: 0 auto; /* 父元素居中显示 */
      }

      .child {
        width: 25%; /* 子元素宽度为父元素宽度的25% */
        height: 0; /* 子元素高度为0，由padding-top实现 */
        padding-top: 25%; /* 正方形高度通过padding-top实现，与宽度相同 */
        background: linear-gradient(
          to right,
          red,
          orange
        ); /* 红色到橙色的渐变背景 */
        margin: 0 5%; /* 子元素之间的外边距为父元素宽度的5%，除以4是因为有4个子元素间隔 */
        animation: fadeIn 0.5s forwards; /* 应用渐入动画 */
        animation-delay: var(--delay); /* 使用CSS变量设置动画延迟 */
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        } /* 动画开始时完全透明 */
        to {
          opacity: 1;
        } /* 动画结束时完全不透明 */
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="child" style="--delay: 1s"></div>
      <div class="child" style="--delay: 2s"></div>
      <div class="child" style="--delay: 3s"></div>
    </div>
  </body>
</html>
```

```js
//类似发布订阅模式
//1.定义一个map收集所有事件
//2.on时注册事件和绑定回调函数，如果回调函数已存在则不重复添加
//3.emit时触发事件，执行所有回调函数
//4.remove时移除事件
class Event {
  constructor() {
    this.eventMap = new Map();
  }
  on(name, callback) {
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, []);
    } else {
      let cbs = this.eventMap.get(name);
      if (cbs.includes(callback)) return;
      cbs.push(callback);
      this.eventMap.set(name, cbs);
    }
  }
  emit(name) {
    let cbs = this.eventMap.get(name);
    while (cbs.length) {
      cbs.shift()();
    }
  }
  remove(name) {
    this.eventMap.delete(name);
  }
}
```

```js
/*
01 背包问题，对于每个地块可以选择收割或者不收割，对于当前为 i 的地块，可以选择不收割，也可以选择收割， 
1.收割，则收益为 max(dp[i-1][j],dp[i-1][j-oil]+money) 
2.不收割，则收益为 dp[i-1][j]
*/
function maxProfit(n, arr) {
  const len = arr.length;
  const dp = new Array(len + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = 1; i <= len; i++) {
    let [oil, money] = arr[i - 1];
    for (let j = 1; j <= n; j++) {
      if (j >= oil) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - oil] + money);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[len][n];
}
let arr = [
  [1, 1],
  [7, 9],
  [6, 10],
  [2, 4],
  [3, 5],
  [6, 10],
];
console.log(maxProfit(10, arr)); //16
```
