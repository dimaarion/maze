import './App.css';
import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
import scena_2 from "./asset/scena/scena2.json";
import scena_3 from "./asset/scena/scena3.json"


function App() {
  return (
    <div className="App">
          <Level bg={[
            { scena: scena_1, level: 1, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"] },
            { scena: scena_2, level: 2, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"] },
            { scena: scena_3, level: 3, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"] }
          ]} />
    </div>
  );
}

export default App;
