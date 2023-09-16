import { useState } from "react"

export default function Button(props) {
   
    return (
        <div className = "button"><button onClick={(e)=>props.setPress(1)} >Жми</button></div>
    )
}