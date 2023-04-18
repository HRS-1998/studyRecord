import React  from "react";
import { Routes,Route,Link ,useNavigate} from "react-router-dom";
import Child1 from "./child1";
import Child2 from "./child2";


function About(){
    return <div>
        <main>
            <h2>This is a about page</h2>
        </main>
        <nav>
            <Link to='/'>to home page</Link>
            <Link to='/about'>to about page</Link>
            <Link to='/about/child1'>to about page</Link>
        </nav>
        <Skip></Skip>
    </div>
}
function Skip(props){
    let navigate=useNavigate()
    const Onskip=()=>{
        navigate('/about/child1')
    }
    return ( <button onClick={Onskip}>跳转至child1页面</button>)
}
const Index=()=>{
    return (
        <div>
        <Routes>
        <Route path="/" element={<About/>}></Route>
        <Route path="/child1" element={<Child1/>}></Route>
        <Route path="/child2" element={<Child2/>}></Route>
        {/* <Route path="*" element={<Error/>}></Route> */}
        </Routes>
        </div>
    )
}
export default Index