import Matter, {Engine, Composite, Events} from "matter-js";
import mobile from "mobile-detect";
import Sketch from 'react-p5';
import Scena from './Scena';
import Body from './BodyS';
import Player from './PlayerS';
import Interface from './Interface';

import TileMap from "./TileMap";
import Database from "./Database";
import Bubble from "./Bubble";
import Action from "./Action";
import Timer from "./Timer";
import Button from "./Button";

import Sprite from "./Sprite";
import scena from "../asset/scena/scena.json"
import scena2 from "../asset/scena/scena2.json"
import scena3 from "../asset/scena/scena3.json"

export default function Game() {
    let engine;
    let world;

    const level = [
        {
            scene: new Scena(scena),
            level:1
        },{
            scene: new Scena(scena2),
            level:2
        },{
            scene: new Scena(scena3),
            level:3
        }
    ]

    const action = new Action();
    let simpleTimer;
    let elapsedSeconds = 0;
    let md = new mobile(window.navigator.userAgent);
    let img1, img2;
    const mapsButton = new Button(95, 1, 4, 4, true,"./img/gui/buttons/click/map.png",true);
    const interFace = new Interface();


    const bubble = new Bubble();
    const player = new Player("player");
    const platform = new Body("platform");
    const platformB = new Body("platform_b");
    const money = new Body("money",["./img/money/money.png"],63);
    const point = new Body("point");
    const key = new Body("key", ["./img/object/key.png"]);
    const dor = new Body("dor", ["./img/object/dorFish.png","./img/object/dorFishActive.png","./img/object/dorFishLeftAttack.png","./img/object/dorFishTopAttack.png","./img/object/dorFishRightAttack.png","./img/object/dorFishbottomAttack.png"],60);
    const meduza = new Body("meduza", ["./img/object/meduza.png"], 60);
    const fugu = new Body("fugu", ["./img/object/fugu.png", "./img/object/fugu2.png", "./img/object/fuguActive.png", "./img/object/fuguActive2.png"], 60);
    const hp = new Body("hp", ["./img/object/hp.png", "./img/object/hp.png"]);
    const ej = new Body("ej", ["./img/object/еj/ej.png", "./img/object/еj/ej.png"]);
    const ej2 = new Body("ej2", ["./img/object/еj/ej2.png"]);
    const shark = new Body("shark", ["./img/object/shark/shark2.png", "./img/object/shark/shark.png", "./img/object/shark/shark3.png", "./img/object/shark/shark4.png", "./img/object/shark/sharkAttack.png", "./img/object/shark/sharkAttackR.png"], 60, 1);
    const ocoptus = new Body("ocoptus", ["./img/object/ocoptusTop.png", "./img/object/ocoptusUp.png"], 60);
   // const kalmar = new Body("kalmar", ["./img/object/kalmar/kalmarP.png", "./img/object/kalmar/kalmarR.png", "./img/object/kalmar/kalmarL.png", "./img/object/kalmar/attackL.png"], 60);
    const crab = new Body("crab", ["./img/object/crab/crab.png", "./img/object/crab/crab.png", "./img/object/crab/crabP.png", "./img/object/crab/crabA.png"], 30);
    const gubka = new Body("gubka", ["./img/object/gubka.png"])
    const bubbleM = new Body("bubble", ["./img/object/bubble/bubble.png"], 60);
    const chest = new Body("chest", ["./img/object/chest/1.png", "./img/object/chest/2.png"]);
  //  const food = new Body("food", ["./img/object/food/red.png"], 60);
   // const foodGreen = new Body("food", ["./img/object/food/green.png"], 60);
    const ugri = new Body("ugri", ["./img/object/ugri/ugriL.png", "./img/object/ugri/ugriR.png"], 60);
    const anglerfish = new Body("anglerfish", ["./img/object/Anglerfish/left.png", "./img/object/Anglerfish/right.png", "./img/object/Anglerfish/leftA.png", "./img/object/Anglerfish/rightA.png"], 60);
    const goldFish = new Body("goldFish", ["./img/object/goldFish/left.png", "./img/object/goldFish/right.png"], 60);
    const blueSlime = new Body("blue-slime", ["./img/object/slim/slim.png"], 60);
    const savePosition = new Body("save-position",["./img/object/flafSave.png"]);
    const db = new Database();
    const map = level.map((el)=>new TileMap(el.level,el.scene))
    let press = {attack: 0, pressUp: 0, pressDown: 0, pressLeft: 0, pressRight: 0, rePress: 1};

    player.live = db.get().live;
    player.speedLive = db.get().speedLive;
    platform.static = true;
    platformB.static = true;
    money.static = true;
    money.sensor = true;
    ocoptus.gravityStab = 0.5
    ocoptus.rotating = false;
    ocoptus.sensor = true;
   // kalmar.rotating = true;
    meduza.gravityStab = 0.1
    ej2.gravityStab = 0.1;
    crab.gravityStab = 0.1;
    gubka.sensor = true;
    bubbleM.gravityStab = 0.5;
    bubbleM.sensor = true;
    chest.sensor = true;
    dor.static = true;
    ej.sensor = true;
    hp.sensor = true;
    player.sensorSize = 4;
    point.static = true;
    point.sensor = true;
    key.static = true;
    key.sensor = true;
    blueSlime.sensor = true;
    blueSlime.static = true;
    meduza.sensor = true;
    fugu.sensor = true;
    savePosition.static = true;
    savePosition.sensor = true;

    function preload(p5) {
        map.forEach((el)=>{
            el.loadBg(p5);
        })
        crab.preloadImage(p5);
        anglerfish.preloadImage(p5);
        interFace.loadImg(p5);
        player.preloadImage(p5);
        money.preloadImage(p5);
        key.preloadImage(p5);
        dor.preloadImage(p5);
        meduza.preloadImage(p5);
        fugu.preloadImage(p5);
        hp.preloadImage(p5);
        ej.preloadImage(p5);
        ej2.preloadImage(p5);
        gubka.preloadImage(p5);
        bubbleM.preloadImage(p5);
        ocoptus.preloadImage(p5);
        chest.preloadImage(p5);
        ugri.preloadImage(p5);
        shark.preloadImage(p5);

    }

    function createElementsGame(p5,num){
        function elements(p5,el) {
            el.scene.create(p5,el.level)
            player.level = el.level
            player.createEllipse(world, el.scene)
            player.createSensor();
            player.createJoystick(el.scene);
            platform.createRect(world,el.scene);
            platformB.createRect(world,el.scene);
            money.createRect(world,el.scene);
            point.createRect(world,el.scene);
            key.createRect(world,el.scene);
            dor.createRect(world,el.scene);
            fugu.createEllipse(world,el.scene);
            hp.createEllipse(world,el.scene);
            ej.createEllipse(world,el.scene);
            shark.createEllipse(world,el.scene);
            ocoptus.createEllipse(world,el.scene);
            crab.createEllipse(world,el.scene);
            ej2.createEllipse(world,el.scene);
            gubka.createEllipse(world,el.scene);
            bubbleM.createEllipse(world,el.scene);
            chest.createRect(world,el.scene);
            ugri.createEllipse(world,el.scene);
            interFace.setup(p5, el.scene);
            bubble.setup(p5, el.scene);
            meduza.createEllipse(world,el.scene);
            anglerfish.createEllipse(world,el.scene);
        }

        level.filter((f)=>f.level === num).forEach((el)=>{
            elements(p5,el);
        })
    }

    function setup(p5, canvasParentRef) {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        engine = Engine.create();
        world = engine.world;
        Engine.run(engine);
        engine.gravity.y = 0;
        simpleTimer = new Timer(p5, 1000);
        player.setupSprite(p5);
        anglerfish.setupSprite(p5);
        simpleTimer.start();
        chest.setupSprite(p5);
        money.setupSprite(p5);
        key.setupSprite(p5);
        dor.setupSprite(p5);
        meduza.setupSprite(p5);
        fugu.setupSprite(p5);
        hp.setupSprite(p5);
        shark.setupSprite(p5);
        ugri.setupSprite(p5);
        ocoptus.setupSprite(p5);
        crab.setupSprite(p5);
        ej2.setupSprite(p5);
        gubka.setupSprite(p5);
        bubbleM.setupSprite(p5);
        ej.setupSprite(p5);



        bubble.bubbleNum = 10;
        bubble.x = 10;
        bubble.y = 100
        createElementsGame(p5,1)
        hp.createBubble(p5, 20);
        //  crab.createBubble(p5, 20);
        events(p5)

    }

    function draw(p5) {
        p5.background("aqua");
        p5.rectMode(p5.CENTER);
        p5.push();

        player.translates(p5);
        bubbleM.moveUp("bubble")
        bubbleM.spriteAnimateArr(p5);
        gubka.spriteAnimateArr(p5);
        map.filter((f)=>f.level === player.level).forEach((el)=>{
            el.imageBgView(p5)
        });
        player.draw(p5, world, press);
       // platform.viewRect(p5);
        money.spriteAnimateArr(p5);
        key.spriteAnimateArr(p5);
        dor.spriteAnimateArr(p5);
        meduza.movementUpDown(p5)
        meduza.spriteAnimateArr(p5);
        fugu.movementLeftRight();
        fugu.viewAttacks(3, 2, 3, 2);
        fugu.spriteAnimateArr(p5, 20, 20);
        hp.viewBubble();
        hp.spriteAnimateArr(p5);
        ej.spriteAnimateArr(p5, 10, 10);
        shark.movementLeftRight("shark");
        shark.viewAttacks(2, 3, 5, 4);
        shark.spriteAnimateArr(p5, 50, 10);
        ocoptus.moveView(0, 1,0,1,1 );
        ocoptus.movementUpDown(p5);
        ocoptus.spriteAnimateArr(p5, 30, 30);
        crab.movementLeftRight("timer");
        crab.spriteAnimateArr(p5, 20, 20);
        crab.gravity();
        ej2.spriteAnimateArr(p5, 10, 10);
        ej2.gravity();
        chest.spriteAnimateArr(p5);
        ugri.movementLeftRight();
        ugri.spriteAnimateArr(p5, 60, 60);
        anglerfish.viewAttacks(1, 0, 3, 2)
        anglerfish.movementLeftRight("anglerfish");
        anglerfish.spriteAnimateArr(p5, 30, 30);
        //point.viewRect(p5)

        player.spriteAnimateArr(p5);
        player.recoveryLive();
        bubble.view();
        p5.pop();
        mapsButton.draw(p5);
        player.joystickButton.draw(p5);
        if (md.mobile()) {
            player.joystick.view(p5, img1, img2);
        }
        interFace.view(p5, player, key, db);
        updateTimer()
    }


    function events(p5) {
        let mst = 0;
        let moneyCount = db.get().money;

        function attack(pair) {
            if (pair.bodyA.typeObject === "alive" && pair.bodyB.label === "player") {
                if (pair.bodyB.live > 5) {
                    pair.bodyB.live -= pair.bodyA.attack;
                    pair.bodyA.attackActive = true;
                }
            }
            if (pair.bodyB.typeObject === "alive" && pair.bodyA.label === "player") {
                if (pair.bodyA.live > 5) {
                    pair.bodyA.live -= pair.bodyB.attack;
                    pair.bodyB.attackActive = true;
                }

            }
        }


        function moneyStart(pair) {
            if (pair.bodyB.label === "money" && pair.bodyA.label === "player") {
                if (pair.bodyB.label === "money") {
                    Composite.remove(world, pair.bodyB)
                    pair.bodyB.remove = true;
                    moneyCount++
                    db.setMoney(moneyCount)

                }
            }
            if (pair.bodyA.label === "player" && pair.bodyB.label === "chest" && pair.bodyB.countImg === 0) {
                moneyCount = moneyCount + pair.bodyB.width;
                db.setMoney(moneyCount)
                pair.bodyB.countImg = 1;
            }
            if (pair.bodyA.label === "player" && pair.bodyB.label === "goldFish") {
                pair.bodyB.remove = true;
                moneyCount = moneyCount + 100;
                Composite.remove(world, pair.bodyB)
                db.setMoney(moneyCount)

            }
        }


        function keyStart(pair) {
            if (pair.bodyA.label === "key" && pair.bodyB.label === "player") {
                player.key++;
                Composite.remove(world, pair.bodyA);
                pair.bodyA.remove = true;
                if (player.key === key.body.length) {
                    // Matter.Body.setPosition(point.getTypeObject("level_2", 0), { x: point.getTypeObject("exit", 0).position.x, y: point.getTypeObject("exit", 0).position.y });
                    dor.body.filter((f) => f.label === "dor").forEach((el) => {
                        el.isSensor = true;
                        el.remove = true;
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
            if (pair.bodyB.typeObject === "hp" && pair.bodyA.label === "player") {
                pair.bodyA.live += action.percent(db.get().live, 10);
                Composite.remove(world, pair.bodyB);
                pair.bodyB.remove = true;
                if (pair.bodyA.live > db.get().liveMax) {
                    pair.bodyA.live = db.get().liveMax;
                }
            }
        }

        function direction(pair) {
            if (pair.bodyA.typeObject === "left" && pair.bodyB.typeObject === "alive") {
                pair.bodyB.direction = 1;

            }
            if (pair.bodyA.typeObject === "right" && pair.bodyB.typeObject === "alive") {
                pair.bodyB.direction = 0;

            }
            if (pair.bodyA.typeObject === "top" && pair.bodyB.typeObject === "alive") {
                pair.bodyB.direction = 2;

            }
            if (pair.bodyA.typeObject === "bottom" && pair.bodyB.typeObject === "alive") {
                pair.bodyB.direction = 3;

            }
        }

        function sensorAttack(pair, bol) {
            if (pair.bodyA.typeObject === "alive" && (pair.bodyB.label === "player_sensor" || pair.bodyB.label === "player")) {

                pair.bodyA.collision = bol;
            }
        }

        function sensorDor(pair,n = 1) {
            if (pair.bodyB.label === "dor" && (pair.bodyA.label === "player_sensor" || pair.bodyA.label === "player")) {
                pair.bodyB.countImg = n;
            }

        }


        function persecution(pair, name, bol, speedDop = 2) {
            if (pair.bodyB.label === name && (pair.bodyA.label === "player_sensor" || pair.bodyA.label === "player")) {
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

        function setSensor(pair, name,) {
            if (pair.bodyB.label === "alive") {

            }
        }

        function animationSprite(pair, name, n) {
            if (pair.bodyB.label === name) {
                pair.bodyB.countImg = n;
                //  pair.bodyA.countImg = n;
            }
        }

        function save(pair){
            if (pair.bodyB.label === "save-position" && pair.bodyA.label === "player") {
                scena.filter((el)=>el.level === player.level).forEach((el)=>{
                    db.setPosition(pair.bodyB.position.x,pair.bodyB.position.y)
                })
                //
            }
        }

        Events.on(engine, "collisionStart", function (event) {

            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];

                direction(pair);
                save(pair);
                if (pair.bodyB.label === "bubble" && pair.bodyA.label === "platform") {
                    pair.bodyB.collision = true;
                }
                level.forEach((el,i)=>{
                    if (pair.bodyB.typeObject === "level_" + (i + 1) && pair.bodyA.label === "player") {
                        createElementsGame(p5,el.level)
                        Composite.remove(world, engine.world.bodies.filter((f) => f.level === (el.level - 1)))
                    }
                })

            }
        });

        Events.on(engine, "collisionActive", function (event) {
            let pairs = event.pairs;

            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                attack(pair);
                moneyStart(pair);
                hpStart(pair);
                keyStart(pair);
                sensorAttack(pair, true);
                persecution(pair, "ej2", true, 2);
                persecution(pair, "shark", true, 2);
                //  persecution(pair, "ocoptus", true, 2);
                persecution(pair, "anglerfish", true, 2);
                sensorDor(pair,1);
            }
        });

        Events.on(engine, "collisionEnd", function (event) {
            let pairs = event.pairs;

            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                sensorAttack(pair, false);
                persecution(pair, "ej2", false, 2)
                persecution(pair, "shark", false, 2)
                //  persecution(pair, "ocoptus", false, 2)
                persecution(pair, "anglerfish", false, 2)
                sensorDor(pair,0);
                if (pair.bodyB.typeObject === "player" && pair.bodyA.label === "alive") {
                    pair.bodyA.attackActive = false;

                }
                if (pair.bodyB.typeObject === "alive" && pair.bodyA.label === "player") {
                    pair.bodyB.attackActive = false;

                }
                if (pair.bodyB.label === "bubble" && pair.bodyA.label === "platform") {
                    pair.bodyB.collision = false;
                }

            }


        });


    }




    const keyPressed = (e) => {
        if (e.key === "ArrowUp") {
            press.pressUp = e.key
        }
        if (e.key === "ArrowRight") {
            press.pressRight = e.key;
            player.setImage(3, 0)
        }
        if (e.key === "ArrowLeft") {
            press.pressLeft = e.key;
            player.setImage(2, 0)
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
            press.pressRight = 0;

        }
        if (e.key === "ArrowLeft") {
            press.pressLeft = 0;

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
        mapsButton.mousePress();

    }

    const mouseReleased = () => {
        mapsButton.mouseRelass(1)
    }

    function restartTimer(n) {
        if (elapsedSeconds >= n) {
            elapsedSeconds = 0
        }
    }


    function updateTimer() {
        if (simpleTimer.expired()) {
            elapsedSeconds++;
            simpleTimer.start();
        }
    }

    return <Sketch setup={setup} keyPressed={keyPressed} mouseReleased={mouseReleased} mousePressed={mousePressed}
                   keyReleased={keyReleased} preload={preload} draw={draw}/>
}
