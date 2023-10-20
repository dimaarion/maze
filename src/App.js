import logo from './logo.svg';
import './App.css';

import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
import scena_2 from "./asset/scena/scena2.json"
import Button from './components/Button';
import { useEffect, useState } from 'react';
import LevelPanel from './components/LevelPanel';
import { useSelector } from 'react-redux';
function App() {
  const [mousePress, setMousePress] = useState(0);
  const [money, setMoney] = useState(0);
  const [money2, setMoney2] = useState(0);
  const [moneySt, setMoneySt] = useState(0);
  let mst = window.localStorage.getItem("money");
  useEffect(() => {
    setMoneySt(mst);
  }, [mst])
  const SELECTMONEY = useSelector((store) => store.getMoney)

  return (
    <div className="App">
      <Level press={mousePress} setMoney={setMoney} scena={scena_1} bg={[
        { scena: scena_1,level:1, img: ["./img/scene/scena1.png"] },
        { scena: scena_2,level:2, img: ["./img/scene/scena2.png"] }
      ]} />
    </div>
  );
}

export default App;
