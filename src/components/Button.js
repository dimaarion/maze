import { useState } from "react"

export default function Button(props) {
   
    return (
        <div><div><button onClick={(e)=>props.setPress(1)} >Жми</button></div>
        <div><button onClick={(e)=>props.setPress(0)} >Жми2</button></div></div>
    )
}