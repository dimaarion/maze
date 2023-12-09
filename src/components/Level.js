import Matter, {Engine, Composite, Events} from "matter-js";
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
import Joystick from "./Joystick";
import Database from "./Database";


export default function Level(props) {

    let engine;
    let world;
    let md = new mobile(window.navigator.userAgent);
    const scena = props.bg.map((el) => new Scena(el.scena, el.img, el.level, el.id, el.bg));
    const player = new Player("player");
    const platform = new Body("platform");
    const platformB = new Body("platform_b");
    const money = new Money("money");
    const ladder = new Ladder("ladder");
    const point = new Body("point");
    const interFace = new Interface();
    const action = new Scena();
    const fakel = new Body("fakel", "./img/fakel/fakel.png");
    const stone = new Body("stone", "./img/object/stone.png");
    const key = new Body("key", "./img/object/key.png");
    const dor = new Body("dor", "./img/object/dorOpen.png");
    const meduza = new Body("meduza", "./img/object/meduza2.png", ["./img/object/meduza2.png"], 76);
    const fugu = new Body("fugu","./img/object/fuguActive.png",["./img/object/fugu.png","./img/object/fugu2.png","./img/object/fuguActive2.png","./img/object/fuguActive.png"],20);
    const dorClose = new Body("dorClose", "./img/object/dorClose.png");
    let press = {pressUp: 0, pressDown: 0, pressLeft: 0, pressRight: 0, rePress: 1};
    let tileMap = scena.map((el) => el.img.map((image) => new TileMap(image, el.level, el, el.id, el.bg)));
    const db = new Database();
    let p5 = {};

    const preload = (p5) => {

        tileMap.map((el) => el.map((map) => map.preloadImage(p5)))
        player.loadImg(p5);
        money.loadImg(p5);
        ladder.loadImg(p5);
        fakel.frame = 30;
        fakel.preloadImage(p5);
        stone.preloadImage(p5);
        key.preloadImage(p5);
        dor.preloadImage(p5);
        dorClose.preloadImage(p5);
        meduza.preloadImage(p5);
        interFace.loadImg(p5);
        fugu.preloadImage(p5);

    }


    function createObject(scena, engine, n) {
        return scena.filter((f) => f.level === n).map((el) => {
            engine.gravity.y = 0;
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
            meduza.static = false;
            meduza.attack = meduza.attack + el.level
            meduza.createEllipse(world, el);
            fugu.static = false;
            fugu.createEllipse(world,el);
            fugu.attack = fugu.attack + el.level * 2;

            db.add(world, el);

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
            removeObject(engine, n + 1);
            createObject(scena, engine, n);
        }
    }

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        p5 = p5;
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
                        // Matter.Body.setPosition(point.getTypeObject("level_2", 0), { x: point.getTypeObject("exit", 0).position.x, y: point.getTypeObject("exit", 0).position.y });
                        // dorClose.body.map((el) => el.remove = true);
                    }


                }

                scena.filter((f) => f.level > 0).map((el) => collideLevel(removeObject, createObject, player, pair, el.level))
            }
        });

        Events.on(engine, "collisionActive", function (event) {
            let pairs = event.pairs;

            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA.typeObject === "alive" && pair.bodyB.typeObject === "alive") {
                    if (pair.bodyB.live > 10) {
                        pair.bodyB.live -= pair.bodyA.attack;
                    }
                }else {

                }
                if (pair.bodyB.label === "fugu_sensor" && pair.bodyA.label === "player") {
                    pair.bodyB.collision = true;
                }else {
                    pair.bodyB.collision = false;
                }

                if (pair.bodyB.typeObject === "alive" && pair.bodyA.label === "player") {
                    if (pair.bodyB.live > 10 && Matter.Body.getSpeed(pair.bodyA) > 1) {
                        pair.bodyB.live -= pair.bodyA.attack;
                    }
                }
                if (pair.bodyB.typeObject === "alive" && pair.bodyA.label === "player") {

                    if (pair.bodyA.live > 10) {
                        pair.bodyA.live -= pair.bodyB.attack;
                    }
                }else {

                }
            }
        });
        if (player.level === 1) {
            createObject(scena, engine, 1);
        }
        action.create(p5);
        interFace.setup(p5)


    };


    const keyPressed = (e) => {
        if (e.key === "ArrowUp") {
            press.pressUp = e.key
        }
        if (e.key === "ArrowRight") {
            press.pressRight = e.key
        }
        if (e.key === "ArrowLeft") {
            press.pressLeft = e.key
        }
        if (e.key === "ArrowDown") {
            press.pressDown = e.key
        }
        press.rePress = 0;
    }

    const keyReleased = (e) => {

        if (e.key === "ArrowUp") {
            press.pressUp = 0
        }
        if (e.key === "ArrowRight") {
            press.pressRight = 0
        }
        if (e.key === "ArrowLeft") {
            press.pressLeft = 0
        }
        if (e.key === "ArrowDown") {
            press.pressDown = 0
        }

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
        p5.background("aqua");
        p5.rectMode(p5.CENTER);


        p5.push();
        player.translates(p5);
        tileMap.map((el) => el.filter((f) => f.level === player.level).map((map, i) => map.view(p5)))
        tileMap.map((el) => el.filter((f) => f.level === player.level).map((map, i) => map.viewMap(p5, map.id[i], "wall")));
        //   tileMap.map((el) => el.view(p5));
        // ladder.draw(p5);

        stone.spriteAnimate(p5, stone.animate);
        //  stone.viewRect(p5)
        // platformB.viewRect(p5)
        meduza.viewXp(p5);
        player.viewXp(p5)
        fugu.viewXp(p5);
        key.sprite(p5);
        dor.sprite(p5);
        meduza.spriteAnimateArr(p5);
        dorClose.sprite(p5);
        fakel.spriteAnimate(p5, fakel.animate);
        player.draw(p5, world, press);
        // platform.viewRect(p5)
        fugu.movementLeftRight(p5,"player",2,3);
        meduza.movementUpDown(p5);
        money.draw(p5);
        p5.pop();

        player.joystick.view(p5);

        interFace.view(p5, player);


    };


    return <Sketch setup={setup} keyPressed={keyPressed} mouseReleased={mouseReleased} mousePressed={mousePressed}
                   keyReleased={keyReleased} preload={preload} draw={draw}/>


}