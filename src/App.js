import './App.css';
import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
import scena_2 from "./asset/scena/scena2.json";
import scena_3 from "./asset/scena/scena3.json"
import scena_4 from "./asset/scena/scena4.json"
import Database from "./components/Database";
import {useEffect, useState} from 'react';


function App() {
    let db = new Database();
let loadImg = <div id="loading" className={"active"}><img className={"spinner"} src={"./img/gui/spiner.gif"}/></div>;
    return (
        <div className="App">
            <div id="p5_loading" className="loadingclass">{loadImg}</div>
            <div className={"position-absolute m-auto top-0 end-0 col-1"} onClick={() => db.cleaner()}><img
                className={"w-100"} src={"./img/gui/buttons/click/restart.png"}/></div>

           <Level bg={[
                {scena: scena_1, level: 1, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"]},
                {scena: scena_2, level: 2, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"]},
                {scena: scena_3, level: 3, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"]},
                {scena: scena_4, level: 4, id: [0], bg: "./img/Tiles/bg1.png", img: ["./img/Tiles/tiles.png"]}
            ]}/>
        </div>
    );
}

export default App;
