import Phaser from "phaser"
import {useEffect, useRef} from "react";
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import Preloader from "../scene/Preloader";
import StartMenu from "../scene/StartMenu";
import InterFace from "../scene/InterFace";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import SliderPlugin from "phaser3-rex-plugins/plugins/slider-plugin";

import Scene_1 from "../scene/Scene_1";
import Scene_2 from "../scene/Scene_2";
import Scene_3 from "../scene/Scene_3";
import Scene_4 from "../scene/Scene_4";
import Scene_5 from "../scene/Scene_5";
import Scene_6 from "../scene/Scene_6";
import Scene_7 from "../scene/Scene_7";
import Scene_8 from "../scene/Scene_8";
import Scene_9 from "../scene/Scene_9";
import Scene_10 from "../scene/Scene_10";
import Scene_11 from "../scene/Scene_11";
import Scene_12 from "../scene/Scene_12";


export default function GamePhaser() {
    const phaserRef = useRef(null);


    useEffect(() => {


        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "#00a9da",
            plugins: {
                global: [{
                    key: 'rexvirtualjoystickplugin',
                    plugin: VirtualJoystickPlugin,
                    start: true
                }, {
                    key: 'rexSlider',
                    plugin: SliderPlugin,
                    start: true
                }

                ],
                scene: [
                    {
                        plugin: PhaserMatterCollisionPlugin, // The plugin class
                        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
                        mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision

                    }, {
                        key: 'rexUI',
                        plugin: UIPlugin,
                        mapping: 'rexUI'
                    }, {
                        key: 'rexBoard',
                        plugin: BoardPlugin,
                        mapping: 'rexBoard'
                    }, {
                        key: 'rexSlider',
                        plugin: SliderPlugin,
                        mapping: 'rexSlider',
                        start: true
                    }, {
                        key: 'rexvirtualjoystickplugin',
                        plugin: VirtualJoystickPlugin,
                        mapping: 'rexvirtualjoystickplugin',
                        start: true
                    }
                ]
            },
            physics: {
                default: 'matter',
                matter: {
                    enabled: true,
                    positionIterations: 6,
                    velocityIterations: 4,
                    constraintIterations: 2,
                    enableSleeping: false,
                    gravity: {
                        x: 0,
                        y: 0
                    },
                    setBounds: {
                                x: 0,
                                y: 0,
                                thickness: 64,
                                left: true,
                                right: true,
                                top: true,
                                bottom: true,
                            },
                    timing: {
                                timestamp: 0,
                                timeScale: 1,
                            },
                    correction: 1,
                        getDelta: (function() { return 1000 / 60; }),
                        autoUpdate: true,
                    debug: {
                        //  hullColor: '#ffffff'
                    }
                }
            },
            audio: {
                disableWebAudio: false
            },
            scene: [Preloader,
                StartMenu,
                InterFace,
                Scene_1,
                Scene_2,
                Scene_3,
                Scene_4,
                Scene_5,
                Scene_6,
                Scene_7,
                Scene_8,
                Scene_9,
                Scene_10,
                Scene_11,
                Scene_12
            ],
        };

        const game = new Phaser.Game(config);
        window.addEventListener('resize', event => {
            game.scale.resize(window.innerWidth, window.innerHeight);
        }, false);


        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref={phaserRef}/>;

}