/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import Scena from "./Scena"
import { useState } from "react";

export default function LevelPanel(props) {
    const [lang, setLang] = useState("ru")
    const scene = new Scena();
    let arr = scene.arrayCount(3);

    return (
        <div>
            <div className="container position-relative">
                <div className="position-absolute head-level">{lang === "ru" ? "Уровни" : "Levels"}</div>
                <div className="col">
                    <div className="position-absolute body-level row">{arr.map((el) => <div className="col-2 p-0" onClick={() => props.setMousePress(el)} key={el}>
                        <img className="w-100" src={"./img/levelPanel/"+ el +".png"} />
                    </div>)}
                    </div>
                </div>

                <img className="w-100" src="./img/levelPanel/Window.png" />

            </div>
        </div>
    )
}