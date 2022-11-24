  # Grid布局
 
  # 一、[^_^] grid-template-columns;grid-template-rows  
 <!-- .wrapper{
    display: grid||inline-grid;
    grid-template-columns:200px 200px 200px;
    grid-template-columns:repeat(3,200px);           
    grid-template-columns:repeat(auto-fill,200px)      //每列宽度200px,auto-fill一行中尽量填满
    grid-template-columns:200px 1fr 1fr   //fr剩余空间分配比例    类似于flex布局中的flex-grow
    grid-template-columns:200px auto 200px
    grid-template-columns:1fr 2fr minmax(200px 2fr)
}  -->

  # 二、[^_^] grid-row-gap 属性、grid-column-gap 属性以及 grid-gap 属性
  <!-- 设置行列距离 -->

  # 三、[^_^] grid-template-areas 属性 
  <!-- 一般这个属性跟网格元素的 grid-area 一起使用, grid-area 属性指定项目放在哪一个区域 
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px  120px  120px;
  grid-template-areas:
    ". header  header"
    "sidebar content content";
  background-color: #fff;
  color: #444;
}
上面代码表示划分出 6 个单元格，其中值得注意的是 . 符号代表空的单元格，也就是没有用到该单元格。

.sidebar {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

.header {
  grid-area: header;
}
以上代码表示将类 .sidebar .content .header所在的元素放在上面 grid-template-areas 中定义的 sidebar content header 区域中-->

# 四、[^o^]grid-auto-flow 属性
<!-- grid-auto-flow 属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，默认值是 row。 -->

# 五、[(^_^)]justify-items 属性、align-items 属性以及 place-items 属性
<!-- justify-items 属性设置#####单元格内容#####的水平位置（左中右），align-items 属性设置单元格的垂直位置（上中下）
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
} -->

# 六、[^_^]justify-content 属性、align-content 属性以及 place-content 属性 
<!-- justify-content 属性是整个内容区域在容器里面的水平位置（左中右），align-content 属性是整个内容区域的垂直位置（上中下）。。
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
} -->

# 七、grid-auto-columns 属性和 grid-auto-rows 属性
<!-- 隐式和显示网格：显式网格包含了你在 grid-template-columns 和 grid-template-rows 属性中定义的行和列。如果你在网格定义之外又放了一些东西，或者因为内容的数量而需要的更多网格轨道的时候，网格将会在隐式网格中创建行和列
.wrapper {
  display: grid;
  grid-template-columns: 200px 100px;
/*  只设置了两行，但实际的数量会超出两行，超出的行高会以 grid-auto-rows 算 */
  grid-template-rows: 100px 100px;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
} -->

# 八、项目属性介绍 
# a.  grid-column-start 属性、grid-column-end 属性、grid-row-start 属性以及grid-row-end 属性
<!-- 可以指定网格项目所在的四个边框，分别定位在哪根网格线，从而指定项目的位置
grid-column-start 属性：左边框所在的垂直网格线
grid-column-end 属性：右边框所在的垂直网格线
grid-row-start 属性：上边框所在的水平网格线
grid-row-end 属性：下边框所在的水平网格线
.one { 
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  /*   如果有重叠，就使用 z-index */
  z-index: 1;
  background: #8CC7B5;
}
.two {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
  background: #D1BA74;
} -->

# b.justify-self 属性、align-self 属性以及 place-self 属性
<!-- justify-self 属性设置单元格内容的水平位置（左中右），跟 justify-items 属性的用法完全一致，但只作用于单个项目
align-self 属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
} -->