import React  from "react";
import  ReactDOM  from "react-dom";
import {BrowserRouter} from "react-router-dom"
import Root from './router.js'
import './App.css'
// class Hello extends React.Component{
//     render(){
//         return(
//             <div>
//                 测试项目
//             </div>
//         )
//     }
// }
// ReactDOM.render(<Root />,document.getElementById('root'))

ReactDOM.render(<React.StrictMode>
    <BrowserRouter>
    <Root />
    </BrowserRouter>
</React.StrictMode>,document.getElementById('root'))

