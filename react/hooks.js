
// import React, { useState } from 'react';
/*react生命周期
1.constructor()
在react挂载前调用，仅用于以下两种情况
a.来初始化函数内部state;
b.为事件处理函数绑定实例;

2.static getDerivedStateFromProps(nextProps,state)   ---这是一个静态函数
其中：nextProps代表即将更新的props值，state代表上一个状态的state;

3.render()  
       
4.componentDidMount()  
是发送网络请求，启用事件监听方法的好时机，在此钩子中可调用setState()

5.shouldComponentUpdate(nextProp,nextState)
在组件更新前调用，返回true更新组件，返回false不更新
不要在此钩子中调用setState()

6.getSnapshotBeforeUpdate(prevProps,prevState)
在render之后，即将对组件进行挂载时调用，此生命周期中返回任何值，都会作为参数传递给
componentDidUpdate(),如不需传递返回null

7.componentDidUpdate(priProps,prevState,snapshot) 
在更新后会被立即调用，首次渲染不会执行

8.componentWillUnmount()
组件卸载或销毁时调用
*/


/* hooks用例*/
/**
-------------------hooks之数据更新驱动---------------------------
 *1.useState 
 用例：const DemoState=(props)=>{
    let [number,setNumber]=useState(0)
    return (<div>
        <span>{number}</span>
        <button onClick={()=>{
            setNumber(number+1)
            console(number+1)   //这里的number是不能够即时改变的
        }}></button>
        </div>)
 }


 * 2.useReducer
 const DemoUseReducer=()=>{
    // number为更新后的state值,dispatchNumber为当前的派发函数
    const [number,dispatchNumber]=useReducer((state,action)=>{
        const {payload,name}=action 
        switch(name){
            case 'add':
                return state+1
                break
            case 'sub':
                return state-1
                break
            case 'reset':
                return 0
        }
        return state

    },0)
    return <div>
    当前值:{number}
    <button onClick={()=>dispatchNumber({name:'add'})}>增加</button>
    <button onClick={()=>dispatchNumber({name:'sub'})}>减少</button>
    <button onClick={()=>dispatchNumber({name:'reset'})}>赋值</button>  
    </div>
 }


 * 3.useSyncExternalStore
    useSyncExternalStore(
    subscibe,  //订阅函数
    getSnapshot, //判断是否更新,如果是触发更新
    getServerSnapshot //用于hydration模式下的getSnapshot
 )
import { combineReducers , createStore  } from 'redux'
function numberReducer(state=1,action){
    switch (action.type){
      case 'ADD':
        return state + 1
      case 'DEL':
        return state - 1
      default:
        return state
    }
}
// 注册reducer 
const rootReducer = combineReducers({ number:numberReducer  })
// 创建 store 
const store = createStore(rootReducer,{ number:1  })
function Index(){
   // 订阅外部数据源 
    const state = useSyncExternalStore(store.subscribe,() => store.getState().number)
    console.log(state)
    return <div>
        {state}
        <button onClick={() => store.dispatch({ type:'ADD' })} >点击</button>
    </div>
}

 * 4. useTransition   //过渡  执行返回一个数组,有两个状态值:
 第一个是处于过渡状态的标志:isPending, 
 第二个是方法,可以理解为上述的startTransition,可以把里面的更新任务变为过渡任务

const mockList1 = new Array(10000).fill('tab1').map((item,index)=>item+'--'+index )
const mockList2 = new Array(10000).fill('tab2').map((item,index)=>item+'--'+index )
const mockList3 = new Array(10000).fill('tab3').map((item,index)=>item+'--'+index )

const tab = {
  tab1: mockList1,
  tab2: mockList2,
  tab3: mockList3
}

export default function Index(){
  const [ active, setActive ] = React.useState('tab1') //需要立即响应的任务，立即更新任务
  const [ renderData, setRenderData ] = React.useState(tab[active]) //不需要立即响应的任务，过渡任务
  const [ isPending,startTransition  ] = React.useTransition() 
  const handleChangeTab = (activeItem) => {
     setActive(activeItem) // 立即更新
     startTransition(()=>{ // startTransition 里面的任务优先级低
       setRenderData(tab[activeItem])
     })
  }
  return <div>
    <div className='tab' >
       { Object.keys(tab).map((item)=> <span className={ active === item && 'active' } onClick={()=>handleChangeTab(item)} >{ item }</span> ) }
    </div>
    <ul className='content' >
       { isPending && <div> loading... </div> }
       { renderData.map(item=> <li key={item} >{item}</li>) }
    </ul>
  </div>
}


 * 5. useDeferredValue
  React 18 提供了 useDeferredValue 可以让状态滞后派生。useDeferredValue 的实现效果也类似于 transtion，
  当迫切的任务执行后，再得到新的状态，而这个新的状态就称之为 DeferredValue。
  const deferredValue=React.useDeferredValue(value) //接收一个参数value,返回一个延迟状态的deferredValue


-------------------hooks之执行副作用---------------------------
 * 6. useEffect
useEffect 第一个参数 callback, 返回的 destory ， destory 作为下一次callback执行之前调用，用于清除上一次 callback 产生的副作用。
第二个参数作为依赖项，是一个数组，可以有多个依赖项，依赖项改变，执行上一次callback 返回的 destory ，和执行新的 effect 第一个参数 callback
useEffect(()=>{
    return destory
},dep)

 * 7.useLayoutEffect
    首先 useLayoutEffect 是在 DOM 更新之后，浏览器绘制之前，这样可以方便修改 DOM，获取 DOM 信息，这样浏览器只会绘制一次，如果修改 DOM 布局放在 useEffect ，那 useEffect 执行是在浏览器绘制视图之后，接下来又改 DOM ，就可能会导致浏览器再次回流和重绘。而且由于两次绘制，视图上可能会造成闪现突兀的效果。
    useLayoutEffect callback 中代码执行会阻塞浏览器绘制。
      
    useLayoutEffect基础用法
    const DemoUseLayoutEffect = () => {
        const target = useRef()
        useLayoutEffect(() => {
            //我们需要在dom绘制之前，移动dom到制定位置
            const { x ,y } = getPositon() /* 获取要移动的 x,y坐标 
            animate(target.current,{ x,y })
        }, []);
        return (
            <div >
            <span ref={ target } className="animate"></span>
        </div>
    )
}
 * 8.useInsertionEffect
    本质上 useInsertionEffect 主要是解决 CSS-in-JS 在渲染中注入样式的性能问题。这个 hooks 主要是应用于这个场景，
    在其他场景下 React 不期望用这个 hooks 。
    export default function Index(){
      React.useInsertionEffect(()=>{
         //   动态创建 style 标签插入到 head 中 
         const style = document.createElement('style')
         style.innerHTML = `
           .css-in-js{
             color: red;
             font-size: 20px;
           }
         `
         document.head.appendChild(style)
      },[])
      return <div className="css-in-js" > hello , useInsertionEffect </div>
    }

-------------------hooks之状态获取与传递---------------------------  
 * 9.useContext 可以等价代替Provider.Consumer
    const contextValue=useContext(context)

    //用useContext方式 
   const DemoContext = ()=> {
       const value:any = useContext(Context)
       //my name is alien 
   return <div> my name is { value.name }</div>
   }
   
   // 用Context.Consumer 方式 
   const DemoContext1 = ()=>{
       return <Context.Consumer>
            / /my name is alien 
           { (value)=> <div> my name is { value.name }</div> }
       </Context.Consumer>
   }
   export default ()=>{
       return <div>
           <Context.Provider value={{ name:'alien' , age:18 }} >
               <DemoContext />
               <DemoContext1 />
           </Context.Provider>
       </div>
   }

* 10 useRef
  useRef 可以用来获取元素，缓存状态，接受一个状态 initState 作为初始值，返回一个 ref 对象 cur, 
  cur 上有一个 current 属性就是 ref 对象需要获取的内容
  //获取元素
  const DemoUseRef = ()=>{
    const dom= useRef(null)
    const handerSubmit = ()=>{
        //  <div >表单组件</div>  dom 节点 
        console.log(dom.current)
    }
    return <div>
        // ref 标记当前dom节点 
        <div ref={dom} >表单组件</div>
        <button onClick={()=>handerSubmit()} >提交</button> 
    </div>
     }

    //可以利用 useRef 返回的 ref 对象来保存状态，只要当前组件不被销毁，那么状态就会一直存在。
    const status = useRef(false)
    //改变状态
    const handleChangeStatus = () => {
    status.current = true
  }

* 11 useImperativeHandle
    useImperativeHandle 可以配合 forwardRef 自定义暴露给父组件的实例值。这个很有用，我们知道，
    对于子组件，如果是 class 类组件，我们可以通过 ref 获取类组件的实例，但是在子组件是函数组件的情况，
    如果我们不能直接通过 ref 的，那么此时 useImperativeHandle 和 forwardRef 配合就能达到效果。
   
    useImperativeHandle 接受三个参数： 
    第一个参数ref: 接受 forWardRef 传递过来的 ref。
    第二个参数 createHandle ：处理函数，返回值作为暴露给父组件的 ref 对象。
    第三个参数 deps : 依赖项 deps ，依赖项更改形成新的 ref 对象。
  
-------------------hooks之状态派生与保存---------------------------  
* 12 useMemo
    const cacheSomething = useMemo(create,deps)
    create：第一个参数为一个函数，函数的返回值作为缓存值，
    deps： 第二个参数为一个数组，存放当前 useMemo 的依赖项，在函数组件下一次执行的时候，会对比 deps 依赖项里面的状态，是否有改变，
    如果有改变重新执行 create ，得到新的缓存值。cacheSomething：返回值，执行 create 的返回值。如果 deps 中有依赖项改变，
    返回的重新执行 create 产生的值，否则取上一次缓存值。


* 13 useCallback
    useMemo 和 useCallback 接收的参数都是一样，都是在其依赖项发生变化后才执行，都是返回缓存的值，
    区别在于 useMemo 返回的是函数运行的结果，useCallback 返回的是函数，
    这个回调函数是经过处理后的也就是说父组件传递一个函数给子组件的时候，
    由于是无状态组件每一次都会重新生成新的 props 函数，这样就使得每一次传递给子组件的函数都发生了变化，
    这时候就会触发子组件的更新，这些更新是没有必要的，此时我们就可以通过 usecallback 来处理此函数，然后作为 props 传递给子组件。


* 14 useDebugValue
    //用react.memo 
    const DemoChildren = React.memo((props)=>{
      //只有初始化的时候打印了 子组件更新 
       console.log('子组件更新')
      useEffect(()=>{
          props.getInfo('子组件')
      },[])
      return <div>子组件</div>
    })
    
    const DemoUseCallback=({ id })=>{
       const [number, setNumber] = useState(1)
       // 此时usecallback的第一参数 (sonName)=>{ console.log(sonName) }
        经过处理赋值给 getInfo 
       const getInfo  = useCallback((sonName)=>{
             console.log(sonName)
       },[id])
       return <div>
           {// 点击按钮触发父组件更新 ，但是子组件没有更新 }
           <button onClick={ ()=>setNumber(number+1) } >增加</button>
           <DemoChildren getInfo={getInfo} />
       </div>
    }
   
-------------------hooks之工具hooks---------------------------  
    
* 15 useDebugValue
    我们不推荐你向每个自定义 Hook 添加 debug 值。当它作为共享库的一部分时才最有价值。在某些情况下，
    格式化值的显示可能是一项开销很大的操作。除非需要检查 Hook，否则没有必要这么做。因此，
    useDebugValue 接受一个格式化函数作为可选的第二个参数。该函数只有在 Hook 被检查时才会被调用。
    它接受 debug 值作为参数，并且会返回一个格式化的显示值。
    function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);
    // ...
    // 在开发者工具中的这个 Hook 旁边显示标签
    // e.g. "FriendStatus: Online"
    useDebugValue(isOnline ? 'Online' : 'Offline');
    return isOnline;
    }
 

* 16 useld
    useId 也是 React v18 产生的新的 hooks , 它可以在 client 和 server 生成唯一的 id , 
    解决了在服务器渲染中，服务端和客户端产生 id 不一致的问题，
    更重要的是保障了 React v18 中 streaming renderer （流式渲染） 中 id 的稳定性。
    


 */
console.log(Number(null))
