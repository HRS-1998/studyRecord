import React from "react";
import { Routes,Route,Link ,useNavigate} from "react-router-dom";

function Home(){
    return <div>
        <main>
            <h2>this is a home page</h2>
        </main>
        <nav>
            <Link to="/about">to about</Link>
        </nav>
       <h4>----------------------</h4>
       <Skip>{1111111111111}</Skip>
       <h4>----------------------</h4>
       <DemoState></DemoState>
       <h4>----------------------</h4>
       <DemoUseReducer></DemoUseReducer>
       <h4>----------------------</h4>
       <Index1></Index1>
       <h4>----------------------</h4>
       <Index></Index>
       <h5>----------------------</h5>
       <DemoUseCallback></DemoUseCallback>
    </div>
}
function Skip(props){
    let navigate=useNavigate()
    debugger
    const Onskip=(e)=>{   
       
            navigate(e)  
    }
    return ( 
        <div>
    <button onClick={()=>Onskip('/about')}>跳转至about页面</button>
    <button onClick={()=>Onskip('/toggle')}>跳转至toggle页面</button>
    </div>
    )
}
//useState
const DemoState=(props)=>{
    let [number,setNumber]=React.useState(0)
    return (<div>
        <span>{number}</span>
        <button onClick={()=>{
            setNumber(number+1)
            console.log(number+1)   //这里的number是不能够即时改变的
        }}>改变number</button>
        </div>)
 }
 //useuseReducer
 const DemoUseReducer=()=>{
    // number为更新后的state值,dispatchNumber为当前的派发函数
    const [number,dispatchNumber]=React.useReducer((state,action)=>{
        const {payload,name}=action 
        console.log(payload,name,action)
        switch(name){
            case 'add':
                return state+1
            
            case 'sub':
                return state-1
                
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

 //useTransition
 /* 模拟数据 */
const mockList1 = new Array(10000).fill('tab1').map((item,index)=>item+'--'+index )
const mockList2 = new Array(10000).fill('tab2').map((item,index)=>item+'--'+index )
const mockList3 = new Array(10000).fill('tab3').map((item,index)=>item+'--'+index )

const tab = {
  tab1: mockList1,
  tab2: mockList2,
  tab3: mockList3
}

 function Index(){
  const [ active, setActive ] = React.useState('tab1') //需要立即响应的任务，立即更新任务
  const [ renderData, setRenderData ] = React.useState(tab[active]) //不需要立即响应的任务，过渡任务
  const [ isPending,startTransition  ] = React.useTransition() 
  const handleChangeTab = (activeItem) => {
    
     setActive(activeItem) // 立即更新
     startTransition(()=>{ // startTransition 里面的任务优先级低
    console.log(isPending)
       setRenderData(tab[activeItem])
     })
  }
  return <div>
    <div className='tab' >
       { Object.keys(tab).map((item)=> <button className={ active === item && 'active' } onClick={()=>handleChangeTab(item)} >{ item }</button> ) }
    </div>
    <ul className='content' >
       { isPending && <div> loading... </div> }
       { (renderData.map(item=> <li key={item} >{item}</li>) ).slice(0,5)}
    </ul>
  </div>
}


//useImperativeHandle
function Son (props,ref) {
    console.log(props)
    const inputRef = React.useRef(null)
    const [ inputValue , setInputValue ] = React.useState('')
    React.useImperativeHandle(ref,()=>{
       const handleRefs = {
           /* 声明方法用于聚焦input框 */
           onFocus(){
              inputRef.current.focus()
           },
           /* 声明方法用于改变input的值 */
           onChangeValue(value){
               setInputValue(value)
           }
       }
       return handleRefs
    },[])
    const onChange=(e)=>{
       setInputValue(e.target.value)
    }
    return <div>
        <input
            placeholder="请输入内容"
            ref={inputRef}
            value={inputValue}
            onChange={(e)=>onChange(e)}
        />
    </div>
}


const ForwarSon = React.forwardRef(Son)
class Index1 extends React.Component{
    inputRef = null
    handerClick(){
        debugger
       const { onFocus , onChangeValue } =this.inputRef
       onFocus()
       onChangeValue('let us learn React!')
    }
    render(){
        return <div style={{ marginTop:'50px' }} >
            <ForwarSon ref={node => (this.inputRef = node)} />
            <button onClick={this.handerClick.bind(this)} >操控子组件</button>
        </div>
    }
}

//useCallback
const DemoChildren = React.memo((props)=>{
    /* 只有初始化的时候打印了 子组件更新 */
     console.log('子组件更新')
    React.useEffect(()=>{
        props.getInfo('子组件')
    },[props])
    return <div>子组件</div>
 })
 
 const DemoUseCallback=({ id })=>{
     const [number, setNumber] = React.useState(1)
     /* 此时usecallback的第一参数 (sonName)=>{ console.log(sonName) }
      经过处理赋值给 getInfo */
     const getInfo  = React.useCallback((sonName)=>{
           console.log(sonName)
     },[id])
     return <div>
         {/* 点击按钮触发父组件更新 ，但是子组件没有更新 */}
         <button onClick={ ()=>setNumber(number+1) } >增加</button>
         <DemoChildren getInfo={getInfo} number={number}/>
     </div>
 }





export {Home,Skip}