import './App.css';


import Database from "./components/Database";
import {useEffect, useState} from 'react';

import GamePhaser from "./components/GamePhaser";


function App() {
    let db = new Database();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
let loadImg = <div id="loading" className={"active"}><img className={"spinner"} src={"./img/gui/spiner.gif"}/></div>;
    return <>
        <div className="App">
          <GamePhaser/>
        </div>
    </>
}

export default App;
