import './App.css';
import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
import scena_2 from "./asset/scena/scena2.json";
import scena_3 from "./asset/scena/scena3.json"

import { useState } from 'react';

function App() {
  const [mousePress, setMousePress] = useState(0);


 


  return (
    <div className="App">
      <Level  bg={[
        { scena: scena_1,level:1, img: ["./img/scene/scena1.png"] },
        { scena: scena_2,level:2, img: ["./img/scene/scena2.png"] },
        { scena: scena_3,level:3, img: ["./img/scene/scena3.png"] }
      ]} />
    </div>
  );
}

export default App;
