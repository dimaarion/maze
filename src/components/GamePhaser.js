import Phaser from "phaser"
import {useEffect, useRef, useState} from "react";
import Scena from "./Scena";
import level from "../asset/scena/scena.json"
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import {getObjects, arrayCount} from "../action";
import Scene_1 from "../scene/Scene_1";
import Preloader from "../scene/Preloader";
import StartMenu from "../scene/StartMenu";
import Scene_2 from "../scene/Scene_2";
import InterFace from "../scene/InterFace";
import Scene_3 from "../scene/Scene_3";
import Scene_4 from "../scene/Scene_4";

export default function GamePhaser() {
    const phaserRef = useRef(null);

    useEffect(() => {

        const config = {
            type: Phaser.CANVAS,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "#5DACD8",
            plugins: {
                global: [{
                    key: 'rexVirtualJoystick',
                    plugin: VirtualJoystickPlugin,
                    start: true
                }

                ]
            },
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
            scene:[Preloader,StartMenu,InterFace, Scene_1,Scene_2,Scene_3,Scene_4],
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref={phaserRef}/>;

}