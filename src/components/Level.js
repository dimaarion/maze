import { Engine, Composite, Events } from "matter-js";
import Sketch from 'react-p5';
import Scena from './Scena';
import Body from './Body';
import Player from './Player';
import Money from './Money';
import Interface from './Interface';
import Ladder from "./Ladder";
import TileMap from "./TileMap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";

export default function Level(props) {

    let engine;
    let world;
    const interfaces = new Interface();
    const scena = props.bg.map((el) => new Scena(el.scena, el.img, el.level));
    const player = new Player("player");
    const platform = new Body("platform");
    const platformB = new Body("platform_b");
    const money = new Money("money");
    const ladder = new Ladder("ladder");
    let press = { pressUp: 0, pressLeft: 0, pressRight: 0, rePress: 1 };
    let tileMap = new TileMap();
    let play = new Button(0, 0, 100, 100, 1);
    let countPlay = -1;

    const GETMONEY = useDispatch();


    const preload = (p5) => {
        //    scena.map((el)=>el.img.map((tilemap)=>tileMap.preloadImage(p5,tileMap)))
        player.loadImg(p5);
        money.loadImg(p5);
        interfaces.loadImg(p5);
        ladder.loadImg(p5);

    }



    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        scena.map((el) => el.create(p5));
        engine = Engine.create();
        engine.gravity.y = scena[0].size(0.5, scena.scale)
        world = engine.world;
        Engine.run(engine);
        let mst = 0;
        Events.on(engine, "collisionStart", function (event) {
            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA.label === "money" && pair.bodyB.label === "player") {
                    if (Number.isInteger(mst)) {
                        mst = window.localStorage.getItem("money");
                    }

                    // eslint-disable-next-line use-isnan

                    mst = Number.parseInt(mst);
                    mst++;

                    window.localStorage.setItem("money", mst);
                    player.money = window.localStorage.getItem("money");
                    Composite.remove(world, pair.bodyA)
                    pair.bodyA.remove = true;



                }
            }
        });

        Events.on(engine, "collisionActive", function (event) {
            let pairs = event.pairs;

            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA.label === "ladder" && pair.bodyB.label === "player") {
                    //  engine.gravity.y = 0;
                }
            }
        });
        //  tileMap.map((el) => el.setup(world, el.scena));
        play.create(p5)
        ;

        scena.map((el) => interfaces.setup(p5, el))



    };


    function playBt(p5) {
        scena.filter((f) => f.level === 1).map((el) => {
            //  el.img.map((tilemap)=>tilemap.setup(world, el))
            // interfaces.setup(p5, el);
            platformB.createRect(world, el);
            platform.createRect(world, el);
            ladder.setup(world, el);
            money.setup(world, el);
            player.setup(world, el);

        })
    }


    const keyPressed = (e) => {
        if (e.key === "ArrowUp") { press.pressUp = e.key }
        if (e.key === "ArrowRight") { press.pressRight = e.key }
        if (e.key === "ArrowLeft") { press.pressLeft = e.key }
        press.rePress = 0;
    }

    const keyReleased = (e) => {

        if (e.key === "ArrowUp") { press.pressUp = 0 }
        if (e.key === "ArrowRight") { press.pressRight = 0 }
        if (e.key === "ArrowLeft") { press.pressLeft = 0 }
        press.rePress = 1;

    }

    const mousePressed = (e) => {
        if(play.valueActive === false){
            play.mousePress();
        }
        
        if (play.valueActive === 1) {
            scena.filter((f) => f.level === 1).map((el) => {
                //  el.img.map((tilemap)=>tilemap.setup(world, el))
                // 
                platformB.createRect(world, el);
                platform.createRect(world, el);
                ladder.setup(world, el);
                money.setup(world, el);
                player.setup(world, el);

            })
        }
        console.log(play.valueActive)
    }

    const mouseReleased = () => {
        play.mouseRelass(0);
    }


    const draw = (p5) => {
        p5.background("#000");
        p5.rectMode(p5.CENTER);
        p5.push();
        player.translates(p5);
        //   tileMap.map((el) => el.view(p5));
        ladder.draw(p5);
        money.draw(p5);
        player.draw(p5, world, press);
        platform.viewRect(p5)
        p5.pop();
        //interface
        scena.map((el) => interfaces.headBar(p5, el, player.money));
        if(play.valueActive === false){
        play.draw(p5);
        }

    };


    return <Sketch setup={setup} keyPressed={keyPressed} mouseReleased={mouseReleased} mousePressed={mousePressed} keyReleased={keyReleased} preload={preload} draw={draw} />


}