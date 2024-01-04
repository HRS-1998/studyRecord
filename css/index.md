### <p align='center'>css 相关记录</p>

#### **一、CSS 关键字： initial、inherit、unset、revert**

[参考文档](https://juejin.cn/post/6987565731881680903?searchId=20231226152245E2E582F98F4EAE4646E5)

> 1. initial 将属性的初始（或默认）值应用于元素；
> 2. inherit 继承；
> 3. unset 未设置，一般搭配==all==属性使用，其更像 initial 和 inherit 的集合，对可继承元素，unset == inherit，对不可继承元素 unset == initial；
> 4. revert 恢复，与 unset 类似，对可继承元素 revert == inherit，但对不可继承元素 revert == 浏览器默认样式

```css
.div {
  background-color: red;
  color: skyblue;
  all: initial; /** 将所有属性设置为初始值 */
}

.content {
  all: unset; /** 将可继承属性设置继承值，不可继承设置为初始值 */
}
```

#### **二、CSS 动画：translate、transform、transition、animation**

[参考文档](https://juejin.cn/post/6844903615920898056?searchId=202312261522023DD164F7DE8C29461673)
![动画属性](./images/css动画.png)

> 1.transition 过渡，其有四个参数 transition-property、transition-duration、transition-timing-function、transition-delay
> ![动画属性](./images/css_transition.png)

> 2.  animation 动画，有 8 个参数 name 、duration 、timing-function、 delay 、iteration-count、 direction、 play-state、 fill-mode;
>     ![动画属性](./images/css_animation.png)
> 3.  translate 平移,沿 x 轴、y 轴
>
> 4.  transform 形变，包含 rotate,scale,skew 等可以同时执行一个或多个，transform-origin 可以改变图形的原点,perspective 距离 3D 页面视口的距离

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    div {
      height: 100px;
      width: 100px;
      background-color: green;
      transform: rotate(45deg);
    }
  </style>
  <body>
    <div></div>
  </body>
</html>
```

#### **三、媒体查询**

[参考文档](https://juejin.cn/post/7021398878461100040?searchId=20231226164559F4A155E36300034FA5E0)

```css
/**屏幕大于 1024px 或小于 1440px 时应用该样式 */
@media screen and (min-width: 1024px) and (max-width: 1440px) {
  body {
  }
  div {
  }
}
/**屏幕宽度小于320px时 */
@media screen and (max-width: 320px) {
  body {
    background-color: #ffff00;
  }
}
```

#### **四、requestAnimationFrame**

[参考文档](https://juejin.cn/post/6991297852462858277?searchId=2023122616345582E63AD853D1BB2D4BE6)
[案例 ](./cssdemo/index_requestAnimationFrame.html)

> 这是一个 js 的 api,但是和动画相关，就放到这里
>
> 1. requestAnimationFrame 需要在函数中再次调用下一帧才可以持续触发
> 2. requestAnimationFrame 会向待执行函数中传入一个时间戳，执行频率为页面刷新率
> 3. requestAnimationFrame 执行时会返回一个值，将这个值放 cancelAnimationFrame 中就可以取消这个动画帧

```js
let ref;
function test(timestamp) {
  console.log(timestamp);
  ref = requestAnimationFrame(test);
}
ref = requestAnimationFrame(test);
setTimeout(() => {
  window.cancelAnimationFrame(ref);
}, 10000);
```

#### **五、css 滤镜 filter**

[参考文档](https://juejin.cn/post/7002829486806794276?searchId=20231227081503C8FCD3092656DD9B892A)
[案例 01](./cssdemo/index_filter01.html) &emsp; [案例 02](./cssdemo/index_filter.html)&emsp;[案例 03](./cssdemo/index_filter03.html)&emsp;[案例 04](./cssdemo/index_filter04.html)&emsp;[案例 05](./cssdemo/index_filter05.html)

```css
/** 使用单个滤镜 （如果传入的参数是百分数，那么也可以传入对应的小数：40% --> 0.4）*/
filter: blur(5px); /**将高斯模糊应用于图片，越大越模糊*/
filter: brightness(
  40%
); /**将线性乘法器应用于输入图像，以调整其亮度。值为 0% 将创建全黑图像；值为 100% 会使输入保持不变，其他值是该效果的线性乘数。如果值大于 100% 将使图像更加明亮。*/
filter: contrast(
  200%
); /**调整输入图像的对比度。值是 0% 将使图像变灰；值是 100%，则无影响；若值超过 100% 将增强对比度。 */
filter: drop-shadow(
  16px 16px 20px blue
); /**使用 <shadow> 参数沿图像的轮廓生成阴影效果。阴影语法类似于 <box-shadow> */
filter: grayscale(
  50%
); /**将图像转换为灰度图。值为 100% 则完全转为灰度图像，若为初始值 0% 则图像无变化。值在 0% 到 100% 之间，则是该效果的线性乘数。 */
filter: hue-rotate(
  90deg
); /**应用色相旋转。<angle> 值设定图像会被调整的色环角度值。值为 0deg，则图像无变化 */
filter: invert(
  75%
); /**反转输入图像。值为 100% 则图像完全反转，值为 0% 则图像无变化。值在 0% 和 100% 之间，则是该效果的线性乘数。 */
filter: opacity(
  25%
); /**应用透明度。值为 0% 则使图像完全透明，值为 100% 则图像无变化。 */
filter: saturate(
  30%
); /**改变图像饱和度。值为 0% 则是完全不饱和，值为 100% 则图像无变化。超过 100% 则增加饱和度。 */
filter: sepia(
  60%
); /**将图像转换为深褐色。值为 100% 则完全是深褐色的，值为 0% 图像无变化 */

/* 使用多个滤镜 */
filter: contrast(175%) brightness(3%);

/* 不使用任何滤镜 */
filter: none;
```

#### **六、css box-\***

[参考文档 1](https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break)&emsp;[参考文档 2](https://juejin.cn/post/6844903784406073352)

```css
/**这个clone的含义就是存在换行了话补全原来的格式 ，其作用的属性background，border，border-image，box-shadow，clip-path，margin，padding，Syntax*/
box-decoration-brake: slice     /** slice（默认值） | clone */
-webkit-box-decoration-break: slice ; /** slice（默认值） | clone */


/** 当给出两个、三个或四个 <length>值时。
如果只给出两个值，那么这两个值将会被当作 <offset-x><offset-y> 来解释。
如果给出了第三个值，那么第三个值将会被当作<blur-radius>解释。
如果给出了第四个值，那么第四个值将会被当作<spread-radius>来解释。
可选，inset关键字。
可选，<color>值 */
box-shadow: 1px 3px 4px red;

box-sizing: content-box | border-box;
```

#### **七、css text-\***

[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration-color)

```css
text-align-last: center; /** 最后一行对齐方式 */
writing-mode: vertical-rl; /** 文字竖行 */
text-decoration: underline; /** 下划线格式 */
text-decoration-color: red; /** 下划线颜色 */
text-decoration-line: overline; /** 下划线位置 */
text-emphasis:'x' /**文字强调 */
text-indent:3px ; /**首行文本缩进位置 */
text-justify:auto; /**设置文本对齐方式 */
text-orientation:mixed; /**配合writing-mode使用 */
text-overflow:ellipsis /** 文本溢出省略 */
text-shadow: 1px 1px 2px black; /**offsetx,offsety,blur-radius, color */
text-transform:uppercase  /**文字大小写 */
```

#### **八、css 居中**

[参考文档](https://juejin.cn/post/6997020797323706404)

```css
/* 分为块盒和行盒 */
/* 块盒 非固定宽度父盒*/
1. transform方式实现
position: absolute;
top:50%;
left:50%;
transform:(-50%,-50%);
```

![css居中](./images/css_center.png#csscenter)

#### **九、css 文字展开收起**


<style>
  img[src*="#csscenter"]{
    width:556px;
    height:410px;
  }

</style>
