
# demo
1.这一块主要看一下 demo2 对图片懒加载的实现
核心模块：
  if(dom.getBoundingClientRect().top < document.documentElement.clientHeight){
    
  }
  当前图片顶部距离窗口顶部的距离  -   可视窗口高度