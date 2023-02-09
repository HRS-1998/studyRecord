import { Routes,Route,Link ,useNavigate} from "react-router-dom";
import React from "react";
import {Home as Page1}  from './pages/page1'
import Page2 from './pages/page2'
import Parent from './pages/parent'

function App(){
    return (
        <div className="App">
            <header className="App-header">
                <Routes>
                    {/* 默认首页 */}
                    <Route path="/" element={<Page1/>}></Route>
                    {/* about页面，具有子路由 */}
                    <Route path="/about/*" element={<Page2/>} />  
                    <Route path='/toggle/*' element={<Parent/>} />                  
                       
                </Routes>
            </header>
        </div>
    )  
}
export default App