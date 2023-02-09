import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
function Child1() {
    return (
        <div>
            <div>这是child1页面</div>
            <Skip></Skip>
            {/* <Container></Container> */}
        </div>

    )
}
function Skip() {
    const navigate = useNavigate()
    const onSkip = () => {
        navigate(-1)
    }
    return <button onClick={onSkip}>返回about页面</button>
}
// function Container(){
//     return <div><Outlet></Outlet></div>
// }
export default Child1