import Matter, { Engine, Composite, Events } from "matter-js";
import mobile from "mobile-detect";
import Sketch from 'react-p5';
import Scena from './Scena';
import Body from './Body';
import Player from './Player';
import Money from './Money';
import Interface from './Interface';
import Ladder from "./Ladder";
import TileMap from "./TileMap";
import Animate from "./Animate";


export default function Level(props) {

    let engine;
    let world;
    let md = new mobile(window.navigator.userAgent);
    const scena = props.bg.map((el) => new Scena(el.scena, el.img, el.level));
    const player = new Player("player");
    const platform = new Body("platform");
    const platformB = new Body("platform_b");
    const money = new Money("money");
    const ladder = new Ladder("ladder");
    const point = new Body("point");
    const bgHeadBar = new Interface(0, 0, 50, 5, "./img/headBar/Stats_Bar.png");
    const textMoney = new Interface(5, 5.5, 2, 0);
    const imageMoney = new Interface(1, 1.5, 3, 3, "./img/money/moneySt.png");
    const countKey = new Interface();
    const action = new Scena();
    const fakel = new Body("fakel", "./img/fakel/fakel.png");
    const stone = new Body("stone", "./img/object/stone.png");
    const key = new Body("key", "./img/object/key.png");
    const dor = new Body("dor", "./img/object/dorOpen.png");
    const dorClose = new Body("dorClose", "./img/object/dorClose.png");
    let press = { pressUp: 0, pressLeft: 0, pressRight: 0, rePress: 1 };
    let tileMap = scena.map((el) => el.img.map((image) => new TileMap(image, el.level, el)));
    //  let play = new Button(45, 45, 10, 10, 1, "./img/gui/step_level.png");
    let animateTest = new Animate(["./img/player/runL.png", "./img/player/run.png", "./img/player/ladder.png"],54);

    const preload = (p5) => {

        tileMap.map((el) => el.map((map) => map.preloadImage(p5)))
        player.loadImg(p5);
        money.loadImg(p5);
        ladder.loadImg(p5);
        bgHeadBar.loadImg(p5);
        imageMoney.loadImg(p5);
        fakel.frame = 30;
        fakel.preloadImage(p5);
        stone.preloadImage(p5);
        key.preloadImage(p5);
        dor.preloadImage(p5);
        dorClose.preloadImage(p5);
        animateTest.loadImg(p5);
    }


    function createObject(scena, engine, n) {
        return scena.filter((f) => f.level === n).map((el) => {
            engine.gravity.y = el.size(1, el.scale);
            point.sensor = true;
            point.createRect(world, el);
            platformB.createRect(world, el);
            platform.createRect(world, el);
            ladder.setup(world, el);
            money.setup(world, el);
            fakel.sensor = true;
            fakel.createRect(world, el);
            stone.static = false;
            stone.createRect(world, el);
            key.sensor = true;
            key.createRect(world, el);
            player.defaultKey = key.body.length;
            player.setup(world, el);
            dor.sensor = true;
            dor.createRect(world, el);
            dorClose.sensor = true;
            dorClose.createRect(world, el);

            return world;
        })
    }

    function removeObject(engine, n) {
        Composite.remove(world, engine.world.bodies.filter((f) => f.level === n))
    }


    function collideLevel(removeObject, createObject, player, pair, n) {
        if (pair.bodyA.typeObject === "level_" + n && pair.bodyB.label === "player") {
            player.level = n
            removeObject(engine, n - 1);
            createObject(scena, engine, n);
        }
    }

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        scena.map((el) => el.create(p5));
        engine = Engine.create();
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
                        // eslint-disable-next-line use-isnan
                        mst = Number.parseInt(mst);
                        mst++;
                    } else {
                        mst = 0;
                    }
                    window.localStorage.setItem("money", mst);
                    player.money = window.localStorage.getItem("money");

                    Composite.remove(world, pair.bodyA)
                    pair.bodyA.remove = true;



                }

                if (pair.bodyA.label === "key" && pair.bodyB.label === "player") {
                    player.key++;
                    Composite.remove(world, pair.bodyA);
                    pair.bodyA.remove = true;
                    if (player.key === key.body.length) {
                        Matter.Body.setPosition(point.getTypeObject("level_2", 0), { x: point.getTypeObject("exit", 0).position.x, y: point.getTypeObject("exit", 0).position.y });
                        dorClose.body.map((el) => el.remove = true);
                    }



                }

                scena.filter((f) => f.level > 1).map((el) => collideLevel(removeObject, createObject, player, pair, el.level))
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
        if (player.level === 1) {
            createObject(scena, engine, 1);
        }

        bgHeadBar.setup(p5);
        textMoney.setup(p5);
        imageMoney.setup(p5);
        action.create(p5);
        countKey.setup(p5);
        animateTest.setupAnimate();
        
       
        
    };


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

    }

    const mouseReleased = () => {

    }


    function getScena(scena, player) {
        return scena.filter((f) => f.level === player.level).map((el) => el)[0]
    }

    const draw = (p5) => {
        p5.background("#000");
        p5.rectMode(p5.CENTER);
        p5.push();
        player.translates(p5);
        tileMap.map((el) => el.filter((f) => f.level === player.level).map((map) => map.view(p5)))
        //   tileMap.map((el) => el.view(p5));
        // ladder.draw(p5);

        stone.spriteAnimate(p5, stone.animate);
        //  stone.viewRect(p5)
        // platformB.viewRect(p5)
        money.draw(p5);
        key.sprite(p5);
        dor.sprite(p5);
        dorClose.sprite(p5);
        fakel.spriteAnimate(p5, fakel.animate);
        player.draw(p5, world, press);
        // platform.viewRect(p5)
        p5.pop();
        bgHeadBar.viewImage();
        textMoney.viewMoney(player.money, 5, 3);
        imageMoney.viewImage();
        countKey.viewText(player.key, 10, 5, 20, 255);
        //interface
        animateTest.format = "one"
        if (p5.mouseIsPressed === true) {
            p5.frameCount = 0;
          } else {
           
          }
        p5.image(animateTest.sprite(p5),0,0,100,100);


    };


    return <Sketch setup={setup} keyPressed={keyPressed} mouseReleased={mouseReleased} mousePressed={mousePressed} keyReleased={keyReleased} preload={preload} draw={draw} />



}