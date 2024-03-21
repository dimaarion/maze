import './App.css';

import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
import scena_2 from "./asset/scena/scena2.json";
import scena_3 from "./asset/scena/scena3.json"
import scena_4 from "./asset/scena/scena4.json"
import scena_5 from "./asset/scena/scena5.json"
import Database from "./components/Database";
import {useEffect, useState} from 'react';



function App() {
    let db = new Database();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
let loadImg = <div id="loading" className={"active"}><img className={"spinner"} src={"./img/gui/spiner.gif"}/></div>;
    return <>
        <div className="App">
            <div id="p5_loading" className="loadingclass">{loadImg}</div>

        </div>
    </>
}

export default App;
