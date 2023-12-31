import './App.css';
import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
import scena_2 from "./asset/scena/scena2.json";
import scena_3 from "./asset/scena/scena3.json"
import { useEffect, useState } from 'react';


function App() {
  const [seconds, setSeconds] = useState(1);
  const [load, setLoad] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
     //setSeconds(seconds => seconds + 1);

      if(document.getElementsByTagName("canvas")[0]){
         document.querySelector("#loading").classList.remove("active");
         document.querySelector("#loading").classList.add("hidden");
      }else{
          document.querySelector("#loading").classList.add("active");

      }

    }, 10);
    // очистка интервала
    return () => clearInterval(timer);
  });

  
  return (
    <div className="App">
        <div id="loading" className={"active"}><img className={"spinner"} src={"./img/gui/spiner.gif"}/></div>
         <Level bg={[
            { scena: scena_1, level: 1, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"] },
            { scena: scena_2, level: 2, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"] },
            { scena: scena_3, level: 3, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"] }
          ]} />
    </div>
  );
}

export default App;
