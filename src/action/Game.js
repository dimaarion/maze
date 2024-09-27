import Database from "../components/Database";
import Player from "../objects/Player";
import Point from "../objects/Point";
import Platform from "../objects/Platform";
import Body from "../objects/Body";
import MobileDetect from "mobile-detect";
import * as Phaser from "phaser";

import {getObjects} from "./index";



export default class Game {

    map;
    layer;

    platform = new Platform("platform");

    player = new Player(5);

    money;

    soundGame;
    skills;

    point = new Point("point");

    pointBubble = new Point("point");

    fugu = new Body("monster", "fugu", "alive", 2, 3);

    meduza = new Body("monster", "meduza", "alive", 1, 3);

    crab = new Body("monster", "crab", 'alive', 1, 3);

    shark = new Body("monster", "shark", 'alive', 1, 5);

    ej = new Body("monster", "ej", 'alive-move', 1.5, 5);

    meduzaFind = new Body("monster", "meduzaFind-move", 'alive', 1.5, 5);

    ejDirect = new Body("monster", "ej-direct", 'alive', 1.5);

    chest = new Body("money", 'ch', 'ch', 0, 0);

    grassAttack = new Body("monster", "grassAttack", "alive", 0, 5);

    stone = new Body("monster", "stone", "alive", 0, 0);

    goldFish = new Body("monster", "goldFish", "alive", 1, 0);

    woodSkill = new Body("skills", "wood", "skill", 1, 0);

    hitSkill = new Body("skills", "hit", "skill", 1, 0);

    hpSkill = new Body("skills", "hps", "skill", 1, 0);

    zumGame = 2;

    screenCenterX = 0;

    collectionSound;

    collectionPlayer;
    db = new Database();
    database;

    timeSkill = true;

    timer;

    monsterAll = [];

    thorns;



    setup(t, image, name) {

        this.database = this.db.create();

        this.collectionPlayer = this.database.getCollection("player");

        let playerFindDb = this.collectionPlayer.findOne({"$loki": 1});



        let md = new MobileDetect(window.navigator.userAgent);
        if (md.mobile()) {
            this.zumGame = 1
        }

        let tiles = t.map.addTilesetImage(image, name);
        this.layer = t.map.createLayer(0, tiles, 0, 0);


        let walls = t.map.createLayer('walls', tiles,0,0);


        this.layer.setCollisionByProperty({collides: true});
        t.map.setCollisionByExclusion([-1, 0]);
        t.matter.world.convertTilemapLayer(walls);

        t.map.createLayer('thorns', tiles,0,0)
        t.map.createLayer('objects', tiles,0,0);











        this.pointBubble.sprite(t, "bubble", "bubble-potok");

        this.player.money = playerFindDb.money;
        this.player.liveStatic = playerFindDb.liveMax;
        this.player.live = playerFindDb.live;
        this.player.setup(t);
        t.matter.world.createDebugGraphic();
        t.matter.world.drawDebug = false;
        t.cursor = t.input.keyboard.createCursorKeys();


        t.scene.launch('InterFace', {player: this.player});
        t.cam = t.cameras.main;
        t.cam.startFollow(this.player.body, true);
        t.cameras.main.zoom = this.zumGame;
        t.cameras.main.setBounds(0, 0, t.map.widthInPixels, t.map.heightInPixels);
        t.matter.world.setBounds(0, 0, t.map.widthInPixels, t.map.heightInPixels);






        this.player.sceneKey = t.scene.key;
        this.platform.body = this.platform.setup(t, t.map);
        this.money = t.map.createFromObjects('money', {name: "money"});
        this.skills = t.map.createFromObjects("skills", {name: "hp"})
        t.anims.play('money', this.money);
        this.money.map((b) => t.matter.add.gameObject(b, {isSensor: true, label: "money"}));
        this.skills.map((b) => t.matter.add.gameObject(b, {
            isSensor: true,
            label: "hp",
            live: 100
        }).setTexture('hp').setSize(b.width, b.height))



        this.point.setup(t);
        this.fugu.sprite(t);
        this.fugu.sensors(t, 0.3, 1, 1.8);

        this.meduza.sprite(t);
        this.meduza.sensors(t, 1, 2, 1.5);


        this.ej.sprite(t).map((b) => b.play("ej"));
        this.ej.scale(0.5, 0.5)
        this.ej.sensors(t, 1.5, 4, 4.5);
        this.ej.finding(t)

        this.meduzaFind.sprite(t).map((b) => b.play("meduzaFind"));
        this.meduzaFind.scale(0.5, 0.5)
        this.meduzaFind.sensors(t, 1.5, 4, 4.5);
        this.meduzaFind.finding(t)

        this.crab.sprite(t)
        this.crab.scale(0.6, 0.6)
        this.crab.sensors(t, 0.8, 1, 2);


        this.ejDirect.speedPersecute = 2;
        this.ejDirect.sensorBody = false;
        this.ejDirect.sprite(t).map((b) => b.setTexture("ej-direct").setScale(0.4, 0.4));
        this.ejDirect.sensors(t, 1, 6, 5);


        this.chest.sprite(t).map((b) => b.setTexture("ch").setScale(0.7, 0.7))
        this.chest.sensors(t, 3, 3, 3);

        this.shark.sensorBody = false;
        this.shark.speedPersecute = 2
        this.shark.sprite(t)
        this.shark.scale(1, 1)
        this.shark.sensors(t, 0.2, 1.2, 1);


        this.grassAttack.puleCount = 1
        this.grassAttack.puleScale = 0.5
        this.grassAttack.puleSensor = true;
        this.grassAttack.puleKey = "noimage"
        this.grassAttack.sprite(t);
        this.grassAttack.sensors(t, 2, 1.5, 3, "grassAttackPassive");

        this.stone.upSpeed = 1.5
        this.stone.sensorBody = false;
        this.stone.sprite(t)
        this.stone.sensors(t, 0.4, 1.5, 1, "stone");


        this.goldFish.sensorBody = false;
        this.goldFish.speedPersecute = 2
        this.goldFish.sprite(t);
        this.goldFish.scale(0.5,0.5);
        this.goldFish.sensors(t, 0.1, 0.7, 2, "goldFish_L");

        this.woodSkill.sprite(t);
        this.woodSkill.scale(1,1);
        this.woodSkill.sensors(t, 1, 1, 1, "wood-rotate-static","wood-rotate");

        this.hitSkill.sprite(t);
        this.hitSkill.scale(1,1);
        this.hitSkill.sensors(t, 1, 1, 1, "hit-rotate-static","hit-rotate");

        this.hpSkill.sprite(t);
        this.hpSkill.scale(1,1);
        this.hpSkill.sensors(t, 1, 1, 1, "hp-rotate-static","hp-rotate");


        this.collectionSound = this.player.database;

        this.monsterAll = this.fugu.body.concat(this.crab.body, this.meduza.body, this.shark.body, this.goldFish.body, this.ejDirect.body)

     this.timer = t.time.addEvent({
            delay: 10000,                // ms
            callback: () => {
                this.timeSkill = false;
            },
            //args: [],
            callbackScope: t,
            repeat: -1,
            paused: true
        });




        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectB} = eventData;
                if(gameObjectB){
                    console.log(gameObjectB.index)
                }


            }
        });



        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            objectB: this.chest.body,
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectB} = eventData;

                if (bodyB.label === "ch") {

                    bodyB.count += 1;
                    if (bodyB.count < 2) {
                        gameObjectB.setTexture('ch-active');
                        bodyA.money = bodyA.money + 100;
                        this.collectionPlayer.chain().find({"$loki": 1}).update((doc)=>doc.money = bodyA.money);
                        this.database.saveDatabase();
                        t.sound.play("openCh", {
                            volume: this.player.effect,
                            loop: false,
                        })
                    }

                }

            }
        });

        t.matterCollision.addOnCollideStart({
            objectA: this.woodSkill.body,
            objectB:this.monsterAll,
            callback: (eventData) => {
                const {gameObjectA, bodyB,gameObjectB} = eventData;
                if(bodyB.label === "alive"){
                    t.matter.world.remove(gameObjectB);
                    gameObjectB.destroy();
                }

            }
        });

        t.matterCollision.addOnCollideStart({
            objectA: this.hitSkill.body,
            objectB:this.monsterAll.concat(this.ej.body),
            callback: (eventData) => {
                const {gameObjectB} = eventData;
                gameObjectB.attack.attack = 0
            }
        });

        t.matterCollision.addOnCollideActive({
            objectA: this.player.body,
            objectB:this.hpSkill.body,
            callback: (eventData) => {
                const {bodyA,gameObjectB} = eventData;
                if (bodyA.live < bodyA.liveStatic) {
                    if (bodyA.live > bodyA.liveStatic) {
                        if (bodyA.live) {
                            bodyA.live = bodyA.live + (bodyA.liveStatic - bodyA.live);
                        }
                    } else {
                        if (bodyA.live) {
                            bodyA.live = bodyA.live += 0.5;
                        }

                    }
                    if (bodyA.live) {
                        this.collectionPlayer.chain().find({"$loki": 1}).update((doc)=>doc.live = bodyA.live);
                        this.database.saveDatabase();
                    }
                }
            }
        });




        function levelStep(bodyA, body, db, t, el) {
            if (parseInt(body.label.split("_")[1]) === el) {
                db.getCollection("player").chain().find({"$loki": 1}).update((doc)=>doc.level = "Scene_" + el);
                db.saveDatabase();
                t.scene.start("Scene_" + el);
            }
        }

        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            objectB: this.point.body,
            callback: (eventData) => {
                const {gameObjectA, bodyB} = eventData;
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((el) => {
                    levelStep(gameObjectA, bodyB, this.database, t, el);

                })

            }
        });




        t.matterCollision.addOnCollideActive({
            objectA: this.player.body,
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectA, gameObjectB} = eventData;

                if (bodyB.label === "attack") {
                    if (bodyA.live) {
                        if (bodyB.attack) {
                            bodyA.live = bodyA.live - bodyB.attack;
                        }
                        if (gameObjectB && gameObjectB.attack) {
                            bodyA.live = bodyA.live - gameObjectB.attack.attack;
                        }

                        if (bodyA.live < 10) {
                            bodyA.live = 15
                            gameObjectA.setPosition(getObjects(t.map, "player")[0].x, getObjects(t.map, "player")[0].y)
                        }

                    }
                    this.collectionPlayer.chain().find({"$loki": 1}).update((doc)=>doc.live = bodyA.live);
                    this.database.saveDatabase();
                }

                if (bodyB.label === "skill") {
                    this.timer.paused = false
                    if(this.timeSkill){
                        gameObjectB.setPosition(bodyA.position.x, bodyA.position.y);
                        gameObjectB.play(gameObjectB.body.play,true)
                      //  this.woodSkill.scale(1,1);
                    }

                }

            }
        });


        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            callback: (eventData) => {
                const {bodyB, gameObjectB} = eventData;
                if (bodyB.label && bodyB.label.search(/sensor/)) {
                    bodyB.sensor = true;
                    if (bodyB.name === "grassAttack") {
                        gameObjectB.play("grassAttackActive", true);
                    }
                }

                if (gameObjectB && gameObjectB.attack && bodyB.label === "attack" && gameObjectB.attack.attack > 0) {
                    t.sound.play("attack", {
                        volume: this.player.effect,
                        loop: false,
                    })
                }

            }
        });
        t.matterCollision.addOnCollideEnd({
            objectA: this.player.body,
            callback: (eventData) => {
                const {bodyB, gameObjectB} = eventData;
                if (bodyB.label && bodyB.label.search(/sensor/)) {
                    bodyB.sensor = false;
                    if (bodyB.name === "grassAttack") {
                        gameObjectB.play("grassAttackPassive", true)

                    }
                }
                if (gameObjectB && gameObjectB.attack) {
                    gameObjectB.attack.attack = gameObjectB.attack.defaultAttack;
                }

                if (bodyB.label === "skill") {
                    this.timer.paused = true;
                    this.timeSkill = true;
                  //  this.woodSkill.scale(0.3,0.3);
                    gameObjectB.play(gameObjectB.body.playStatic,true);
                    gameObjectB.setPosition(gameObjectB.body.sX,gameObjectB.body.sY);

                }
            }
        });


        t.matterCollision.addOnCollideStart({
            objectA: this.monsterAll,
            callback: (eventData) => {
                const {bodyA, bodyB,gameObjectA} = eventData;
                function persecuteMove(name){

                        if(gameObjectA.body && bodyA.name === name){
                            if (bodyA.label === "alive" && gameObjectA.getVelocity().x > 0) {
                                bodyA.direction = 1;
                            }
                            if (bodyA.label === "alive" && gameObjectA.getVelocity().x < 0) {
                                bodyA.direction = 0;

                            }
                        }else {
                            if (bodyA.label === "alive" && bodyB.label === "right") {
                                bodyA.direction = 1;
                            }
                            if (bodyA.label === "alive" && bodyB.label === "left") {
                                bodyA.direction = 0;

                            }
                        }
                }

                persecuteMove("shark");
                persecuteMove("goldFish");

                if (bodyA.label === "alive" && bodyB.label === "up") {
                    bodyA.direction = 3;

                }
                if (bodyA.label === "alive" && bodyB.label === "down") {
                    bodyA.direction = 2;

                }
            }
        });


        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            objectB: this.goldFish.body,
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectB} = eventData;

                if(bodyB.label === "alive"){
                    bodyA.money = bodyA.money + 300;
                    this.collectionPlayer.chain().find({"$loki": 1}).update((doc)=>doc.money = bodyA.money);
                    this.database.saveDatabase();
                    t.matter.world.remove(gameObjectB);
                    gameObjectB.destroy();
                    t.sound.play("coin", {
                        volume: this.player.effect,
                        loop: false,
                    })
                }

            }
        });


        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            objectB: this.money,
            callback: (eventData) => {
                const {bodyA, gameObjectB} = eventData;
                bodyA.money = bodyA.money + 1;
                this.collectionPlayer.chain().find({"$loki": 1}).update((doc)=>doc.money = bodyA.money);
                this.database.saveDatabase();
                t.matter.world.remove(gameObjectB);
                gameObjectB.destroy();
                t.sound.play("coin", {
                    volume: this.player.effect,
                    loop: false,
                })
            }
        });


        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            objectB: this.skills,
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectB} = eventData;

                if (bodyA.live < bodyA.liveStatic) {
                    if ((bodyA.live + bodyB.live) > bodyA.liveStatic) {
                        if (bodyA.live) {
                            bodyA.live = bodyA.live + (bodyA.liveStatic - bodyA.live);
                        }
                    } else {
                        if (bodyA.live && bodyB.live) {
                            bodyA.live = bodyA.live + bodyB.live;
                        }

                    }
                    if (bodyA.live) {
                        this.collectionPlayer.chain().find({"$loki": 1}).update((doc)=>doc.live = bodyA.live);
                        this.database.saveDatabase();
                        t.matter.world.remove(gameObjectB);
                        gameObjectB.destroy();
                        t.sound.play("open-hp", {
                            volume: this.player.effect,
                            loop: false,
                        })
                    }
                }

            }
        });


    }

    draw(t) {



        this.player.draw(t);

        this.fugu.draw(t, 'horizontal', 'fugu_L', 'fugu_R', 'fugu_AL', 'fugu_AR');

        this.meduza.draw(t, 'vertical', 'meduza', 'meduza');

        this.crab.draw(t, 'horizontal', 'crab', 'crab', 'crab', 'crab');

        this.goldFish.draw(t, 're-persecute', 'goldFish_L', 'goldFish_R', 'goldFish_L', 'goldFish_R', this.player.body.body);

        this.ejDirect.gravity();
        this.ejDirect.draw(t, "persecute", 'none', 'none', 'none', 'none', this.player.body.body);

        this.ej.draw(t, "persecute", 'none', 'none', 'none', 'none', this.player.body.body);

        this.shark.draw(t, 'persecute', 'shark_L', 'shark_R', 'shark_L', 'shark_R', this.player.body.body, true);

        this.stone.gravity();




        this.grassAttack.body.filter((f)=>f.body).forEach((el, i) => {
            if (el.sensor.sensor) {
                el.attack.pule.forEach((b) => {
                    b.setPosition(el.body.position.x, el.body.position.y - 30);
                })

            } else {
                el.play("grassAttackPassive", true)
                el.attack.pule.forEach((b) => {
                    b.setPosition(el.body.position.x, el.body.position.y + 20);
                })
            }
        })


    }
}