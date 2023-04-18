import React from "react"
import { useNavigate } from "react-router-dom"
function Child2() {
    return (
        <div>
            <div>这是child2页面</div>
            <Skip></Skip>
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
export default Child2