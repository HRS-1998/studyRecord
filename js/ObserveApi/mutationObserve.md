#### <p align='center'> MutationObserver API</p>

[参考文档 1](https://juejin.cn/post/6866725132027559944)&ensp;&ensp;[参考文档 2](https://juejin.cn/post/7295277070388035622?searchId=20240112113954A6ABB4537D430B150DC8)

```js
//简单使用 (该API可以监听水印是否被更改)
const observer = new MutationObserver((mutationList, observer) => {
  console.log(mutationList);
});
```

mutationList 描述所有被触发改动的 MutationRecord 对象数组

- ==type==: 变化的类型，attributes 表示属性变化，characterData 表示节点所有字符变化，childList 表示子节点树变化。
- ==target==： 发生变化的节点
- ==addedNodes==： 如果是添加了节点，添加的节点会在这个属性表示
- ==removedNodes==： 如果是移出了节点，移出的节点会在这个属性表示
- ==previousSibling==： 返回被添加或移除的节点之前的兄弟节点，或者 null。
- ==nextSibling==： 返回被添加或移除的节点之后的兄弟节点，或者 null。
- ==attributeName==:返回被修改的属性的属性名，或者 null。
- ==attributeNamespace==： 返回被修改属性的命名空间，或者 null。
- ==oldValue==： 对于属性 attributes 变化，返回变化之前的属性值。对于 characterData 变化，返回变化之前的数据。对于子节点树 childList 变化，返回 null。

```js
observer.observe(el, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
});
```

上述的 childList、subtree 等属于 MutationObserverlnit,可以将其简单分类
<b>主配置项</b> 在 observe()时，这三个属性至少一个必须为 true
==childList==
负责监听子节点的增删

==attributes==
负责监听目标元素的属性变化

==characterData==
监视文本节点的变化,只监视文本节点本身，不监视 HTMLElement,因此其无法监视表单输入框文本呢的变化，如果要监视，直接将文本节点传递给 observe()

<b>辅配置项</b>
==subtree==
childList、attributes、characterData 的辅助配置项，负责是否将后代节点的增删冒泡给被监听的节点（即可以监听目标节点下的所有节点）

==attributeOldValue==
attributes 的辅助配置项,记录有改动的属性的上一个值，MutationRecord 中有记录信息

==atttibuteFilter==
attributes 的辅助配置项,可以监视特定名称属性，属性数组形式 ['title','class','style']

==characterDataOldValue==
characterData 的辅助配置项,记录有改动的文本的上一个值
