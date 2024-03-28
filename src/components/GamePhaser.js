import Phaser from "phaser"
import {useEffect, useRef, useState} from "react";
import Scena from "./Scena";
import level from "../asset/scena/scena.json"
import {getObjects, arrayCount} from "../action";
import Scene_1 from "../scene/Scene_1";
import Preloader from "../scene/Preloader";
import StartMenu from "../scene/StartMenu";
import Scene_2 from "../scene/Scene_2";
import InterFace from "../scene/InterFace";

export default function GamePhaser() {
    const phaserRef = useRef(null);

    useEffect(() => {

        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "#5DACD8",
            physics: {
                default: 'matter',
                matter: {
                    gravity: {
                        x: 0,
                        y: 0
                    },
                    debug: {
                      //  hullColor: '#ffffff'
                    }
                }
            },
            scene:[Preloader,StartMenu,InterFace, Scene_1,Scene_2],
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref={phaserRef}/>;

}