import logo from './logo.svg';
import './App.css';

import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
import scena_2 from "./asset/scena/scena2.json"
import Button from './components/Button';
import { useEffect, useState } from 'react';
import LevelPanel from './components/LevelPanel';
function App() {
  const [mousePress, setMousePress] = useState(0);
  const [money, setMoney] = useState(0);
  const [money2, setMoney2] = useState(0);
  const [moneySt, setMoneySt] = useState(0);
  useEffect(() => {
    let mst = window.localStorage.getItem("money");
    setMoneySt(mst);
  }, [money])


  return (
    <div className="App">
      {mousePress !== 0?<div onClick={()=>setMousePress(0)} className='position-absolute z-2 top-0 end-0 col-1 settings'><img className='w-100' src='./img/levelPanel/Settings.png' /></div>:""}
      {mousePress === 0? <LevelPanel press={mousePress} setMousePress = {setMousePress} /> : ""}
      {mousePress === 1? <Level press={mousePress} setMoney={setMoney} scena={scena_1} bg={[{ name: "bg", img: "./img/scene/scena1.png" }]} /> : ""}
      {mousePress === 2? <Level press={mousePress} setMoney={setMoney} scena={scena_2} bg={[{ name: "bg", img: "./img/scene/scena2.png" }]} /> : ""}
    </div>
  );
}

export default App;
