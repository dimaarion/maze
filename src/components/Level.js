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
import Database from "./Database";
import Bubble from "./Bubble";
import Action from "./Action";


export default function Level(props) {
    let engine;
    let world;
    let md = new mobile(window.navigator.userAgent);
    const scena = props.bg.map((el) => new Scena(el.scena, el.img, el.level, el.id, el.bg));
    const action = new Action();
    const bubble = new Bubble();
    const player = new Player("player");
    const platform = new Body("platform");
    const platformB = new Body("platform_b");
    const money = new Money("money");
    const ladder = new Ladder("ladder");
    const point = new Body("point");
    const interFace = new Interface();
    const stone = new Body("stone", ["./img/object/stone.png"]);
    const key = new Body("key", ["./img/object/key.png"]);
    const dor = new Body("dor", ["./img/object/dorClose.png", "./img/object/dorOpen.png"]);
    const meduza = new Body("meduza", ["./img/object/meduza2.png"], 76);
    const fugu = new Body("fugu", ["./img/object/fugu.png", "./img/object/fugu2.png", "./img/object/fuguActive.png", "./img/object/fuguActive2.png"], 20);
    const dorClose = new Body("dorClose", ["./img/object/dorClose.png", "./img/object/dorOpen.png"]);
    const hp = new Body("hp", ["./img/object/hp.png"]);
    const ej = new Body("ej", ["./img/object/еj/ej.png", "./img/object/еj/ej.png"]);
    const shark = new Body("shark", ["./img/object/shark/shark2.png", "./img/object/shark/shark.png", "./img/object/shark/shark3.png", "./img/object/shark/shark4.png"], 60, 1);
    const ocoptus = new Body("ocoptus",["./img/object/ocoptusPasive.png","./img/object/ocoptus.png","./img/object/ocoptusAttack.png"],60);
    let press = {attack: 0, pressUp: 0, pressDown: 0, pressLeft: 0, pressRight: 0, rePress: 1};
    let tileMap = scena.map((el) => el.img.map((image) => new TileMap(image, el.level, el, el.id, el.bg)));
    const db = new Database();

    player.level = 2;
    player.live = db.get().live;
    ocoptus.static = false;
    ocoptus.gravityStab = 0.1
    ocoptus.rotating = true;

    const preload = (p5) => {

        tileMap.map((el) => el.map((map) => map.preloadImage(p5)));
        tileMap.map((el) => el.filter((f)=>f.scena.level === player.level).map((map) => map.loadBg(p5,"bgTest")))
        player.loadImg(p5);
        money.loadImg(p5);
        ladder.loadImg(p5);
        stone.preloadImage(p5);
        key.preloadImage(p5);
        dor.preloadImage(p5);
        dorClose.preloadImage(p5);
        meduza.preloadImage(p5);
        interFace.loadImg(p5);
        fugu.preloadImage(p5);
        hp.preloadImage(p5);
        ej.preloadImage(p5);
        // shark.speedMonster = 0.5
        shark.preloadImage(p5);
        ocoptus.preloadImage(p5);


    }


    function createObject(scena, engine, n) {
        return scena.filter((f) => f.level === n).map((el) => {
            engine.gravity.y = 0;
            tileMap.map((el) => el.filter((f) => f.level === player.level).map((map, i) => map.createTile(map.id[i], "wall")));
            point.sensor = true;
            point.createRect(world, el);
            platformB.createRect(world, el);
            platform.createRect(world, el);
            ladder.setup(world, el);
            money.setup(world, el);
            key.sensor = true;
            key.createRect(world, el);
            player.defaultKey = key.body.length;
            player.sensorSize = 4
            player.setup(world, el);
            player.createSensor();
            dor.createRect(world, el);
            dorClose.createRect(world, el);
            meduza.static = false;
            meduza.attack = meduza.attack + el.level
            meduza.createEllipse(world, el);
            fugu.static = false;
            fugu.createEllipse(world, el);
            fugu.createSensor();
            fugu.attack = fugu.attack + el.level * 2;
            hp.sensor = true;
            hp.createEllipse(world, el);
            shark.static = false;
            shark.createRect(world, el);
            shark.createSensor();
            ej.sensor = true;
            ej.createRect(world, el);
            ocoptus.createEllipse(world,el);
            db.create(world, el);


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
            player.key = 0;
            window.localStorage.setItem("level", n)
            db.setLevel(n);
        }
    }

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        scena.map((el) => el.create(p5));
        engine = Engine.create();
        world = engine.world;
        Engine.run(engine);
        let mst = 0;
        let moneyCount = db.get().money;

        fugu.animate.setupAnimate();
        meduza.animate.setupAnimate();
        hp.animate.setupAnimate();
        key.animate.setupAnimate();
        dor.animate.setupAnimate();
        dorClose.animate.setupAnimate();
        shark.animate.setupAnimate();
        ej.animate.setupAnimate();
        ocoptus.animate.setupAnimate();

        function attack(pair) {
            if (pair.bodyA.typeObject === "alive" && pair.bodyB.label === "player_attack") {
                if (pair.bodyA.live > 0) {
                    pair.bodyA.live -= pair.bodyB.attack;
                    if (pair.bodyA.live < 5) {
                        Matter.Composite.remove(world, pair.bodyA);
                        pair.bodyA.remove = true;
                    }
                }
                setTimeout(() => {
                    Matter.Composite.remove(world, pair.bodyB);
                    pair.bodyB.remove = true;
                }, 10)

            }

            if (pair.bodyB.label === "player_attack" && pair.bodyA.label === "platform") {
                pair.bodyB.remove = true;
                Matter.Composite.remove(world, pair.bodyB);
            }
        }


        function moneyStart(pair) {
            if (pair.bodyA.label === "money" && pair.bodyB.label === "player") {


                moneyCount++
                db.setMoney(moneyCount)

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
        }

        function keyStart(pair) {
            if (pair.bodyA.label === "key" && pair.bodyB.label === "player") {
                player.key++;
                Composite.remove(world, pair.bodyA);
                pair.bodyA.remove = true;
                if (player.key === key.body.length) {
                    // Matter.Body.setPosition(point.getTypeObject("level_2", 0), { x: point.getTypeObject("exit", 0).position.x, y: point.getTypeObject("exit", 0).position.y });
                    dor.body.forEach((el) => {
                        el.countImg = 1;
                      //  el.isSensor = true;
                    });
                }


            }
        }


        function hpStart(pair) {
            if (pair.bodyB.label === "hp" && pair.bodyA.label === "player") {
                pair.bodyA.live += action.percent(db.get().live, 30);
                Composite.remove(world, pair.bodyB);
                pair.bodyB.remove = true;
                if (pair.bodyA.live > db.get().liveMax) {
                    pair.bodyA.live = db.get().liveMax;
                }
            }
        }

        function direction(pair, name) {
            if (pair.bodyA.typeObject === "left" && pair.bodyB.label === name) {
                pair.bodyB.direction = 1;

            }
            if (pair.bodyA.typeObject === "right" && pair.bodyB.label === name) {
                pair.bodyB.direction = 0;

            }
            if (pair.bodyA.typeObject === "top" && pair.bodyB.label === name) {
                pair.bodyB.direction = 2;

            }
            if (pair.bodyA.typeObject === "bottom" && pair.bodyB.label === name) {
                pair.bodyB.direction = 3;

            }
        }

        function sensorAttack(pair, name, bol, persecution = false,speedDop = 2) {
            if ((pair.bodyB.label === name || pair.bodyB.label === name + "_sensor") && (pair.bodyA.label === "player_sensor" || pair.bodyA.label === "player")) {
                pair.bodyB.collision = bol;
                if (persecution === true) {
                    let pos = action.getPositions(p5, pair.bodyA.position.x, pair.bodyA.position.y, pair.bodyB.position.x, pair.bodyB.position.y);
                    let speed = pair.bodyB.speedBody * speedDop;
                    Matter.Body.setVelocity(pair.bodyB, {
                        x: p5.constrain(pos.x, -speed, speed),
                        y: p5.constrain(pos.y, -speed, speed)
                    })
                    pair.bodyB.vX = pos.x;
                    pair.bodyB.vY = pos.y;
                    
                }
            }
        }

        function setSensor(pair,name, ) {
            if (pair.bodyB.label === "alive") {

            }
        }

        function animationSprite(pair,name,n){
            if (pair.bodyB.label === name) {
                pair.bodyB.countImg = n;
              //  pair.bodyA.countImg = n;
            }
        }

        Events.on(engine, "collisionStart", function (event) {

            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];

                attack(pair);
                moneyStart(pair);
                keyStart(pair);
                hpStart(pair);
                direction(pair, "shark");
                direction(pair, "fugu");
                direction(pair, "ej");
                direction(pair, "ocoptus");
                

                scena.filter((f) => f.level > 0).map((el) => collideLevel(removeObject, createObject, player, pair, el.level))
            }
        });

        Events.on(engine, "collisionActive", function (event) {
            let pairs = event.pairs;

            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];

                sensorAttack(pair, "fugu", true);
                sensorAttack(pair, "shark", true,true,2);
                sensorAttack(pair, "ej", true);
                sensorAttack(pair, "ocoptus", true,true,1);
                


                if (pair.bodyB.typeObject === "player" && pair.bodyA.label === "alive") {
                    pair.bodyA.attackActive = true;
                    if (pair.bodyB.live > 5) {
                        pair.bodyB.live -= pair.bodyA.attack;
                    }
                }
                if (pair.bodyB.typeObject === "alive" && pair.bodyA.label === "player") {
                    pair.bodyB.attackActive = true;
                    if (pair.bodyA.live > 5) {
                        pair.bodyA.live -= pair.bodyB.attack;
                    }
                }
                attack(pair)
            }
        });

        Events.on(engine, "collisionEnd", function (event) {
            let pairs = event.pairs;

            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];

                sensorAttack(pair, "fugu", false);
                sensorAttack(pair, "shark", false,true);
                sensorAttack(pair, "ej", false);
                sensorAttack(pair, "ocoptus", false,true);
                
                if (pair.bodyB.typeObject === "player" && pair.bodyA.label === "alive") {
                    pair.bodyA.attackActive = false;
                   
                }
                if (pair.bodyB.typeObject === "alive" && pair.bodyA.label === "player") {
                    pair.bodyB.attackActive = false;
                   
                }
                
            }


        });

        createObject(scena, engine, player.level);


        bubble.bubbleNum = 10;
        bubble.x = 10;
        bubble.y = 100
        scena.filter((f) => f.level === player.level).forEach((el) => {
            interFace.setup(p5, el);
            bubble.setup(p5, el);

        })

        hp.createBubble(p5, 20);
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
        if (e.key === "Control") {
            press.attack = e.key
            // player.createAttack()
        }
        press.rePress = 0;

        player.press = press;
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
        if (e.key === "Control") {
            // press.attack = 0
        }
        press.rePress = 1;

    }

    const mousePressed = (e) => {


    }

    const mouseReleased = () => {

    }


    const draw = (p5) => {

        p5.background("aqua");
        p5.rectMode(p5.CENTER);
        p5.push();
        player.translates(p5);
        tileMap.map((el) => el.filter((f) => f.level === player.level).map((map, i) => map.imageBgView()));
        dor.sprite(p5);
        dorClose.sprite(p5);
        tileMap.map((el) => el.filter((f) => f.level === player.level).map((map, i) => map.viewMap()));
        bubble.view();
        stone.spriteAnimate(p5, stone.animate);
        key.spriteAnimateArr(p5);
        meduza.spriteAnimateArr(p5);
        player.draw(p5, world, press);
        fugu.movementLeftRight();
        fugu.viewAttacks(3, 2)
        fugu.spriteAnimateArr(p5);
        fugu.viewXp(p5);
        meduza.movementUpDown(p5);
        meduza.viewXp(p5);
        player.viewXp(p5)
        money.draw(p5);
        hp.viewBubble();
        hp.sprite(p5);
        shark.movementLeftRight("shark");
        shark.viewAttacks(2,3,2,3,0);
        shark.spriteAnimateArr(p5);
        ej.spriteAnimateArr(p5, 0, 10, 10);
        ocoptus.viewAttacks(1,1,2,2,0);
        ocoptus.spriteAnimateArr(p5);
        

        p5.pop();

        if (md.mobile()) {
            player.joystick.view(p5);
        }
        interFace.view(p5, player, key, db);


    };


    return <Sketch  setup={setup} keyPressed={keyPressed} mouseReleased={mouseReleased} mousePressed={mousePressed}
                   keyReleased={keyReleased} preload={preload} draw={draw}/>
                 


}