import logo from './logo.svg';
import './App.css';

import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
import scena_2 from "./asset/scena/scena2.json"
import Button from './components/Button';
import { useEffect, useState } from 'react';
function App() {
const[mousePress,setMousePress] = useState(0);
const[money, setMoney] = useState(0);
const[money2, setMoney2] = useState(0);
const[moneySt, setMoneySt] = useState(0);
useEffect(()=>{
let mst = window.localStorage.getItem("money");
setMoneySt(mst);
},[money])


  return (
    <div className="App">
      <button onClick={()=>window.localStorage.setItem("money",0)}>cleaner</button>
      <div>{moneySt}</div>
      {mousePress === 0?<Level press = {mousePress} setMoney = {setMoney} scena = {scena_1} bg = {[{name:"bg",position:{x:0,y:0},size:{w:6200,h:6200},img:"./img/scene/scena1.png"}]} />:""}
      {mousePress === 1?<Level press = {mousePress} setMoney = {setMoney} scena = {scena_2} bg = {[{name:"bg",position:{x:0,y:0},size:{w:6200,h:6200},img:"./img/scene/scena2.png"}]}/>:""}
   
    <Button setPress = {setMousePress} />
    </div>
  );
}

export default App;
