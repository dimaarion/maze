import Database from "../components/Database";
import Player from "../objects/Player";
import Point from "../objects/Point";
import Platform from "../objects/Platform";
import Body from "../objects/Body";
import MobileDetect from "mobile-detect";

import {getObjects, findObjectByName} from "./index";
import Phaser from "phaser"


export default class Game {
    map;
    layer;
    db = new Database();
    platform = new Platform("platform")
    player = new Player(5);
    money; //= new Money("money");
    point = new Point("point");

    fugu = new Body("monster", "fugu", "alive", 2, 3);

    meduza = new Body("monster", "meduza", "alive", 1, 3);

    skills;
    crab = new Body("monster", "crab", 'alive', 1, 3);

    shark = new Body("monster", "shark", 'alive', 1, 5);

    ej = new Body("monster", "ej", 'alive', 1.5, 5);

    meduzaFind = new Body("monster", "meduzaFind", 'alive', 1.5, 5);

    ejDirect = new Body("monster", "ej-direct", 'alive', 1.5);

    bubble = new Body("monster", "bubble", "alive", 2, 3)

    chest = new Body("money", 'ch', 'ch', 0, 0);

    grassAttack = new Body("monster", "grassAttack", "alive", 0, 5);

    angleFish = new Body("monster", "angle", "alive", 1, 5);

    zumGame = 2;

    setup(t, image, name) {

        let md = new MobileDetect(window.navigator.userAgent);
        if(md.mobile()){
            this.zumGame = 1
        }




        let tiles = t.map.addTilesetImage(image, name);
        this.layer = t.map.createLayer(0, tiles, 0, 0);
        let walls = t.map.createLayer('walls', tiles);

        this.layer.setCollisionByProperty({collides: true});
        t.map.setCollisionByExclusion([-1, 0]);
        t.matter.world.convertTilemapLayer(walls);
        let obj = t.map.createLayer('objects', tiles);
        walls.setCollisionByProperty({collides: true});

        this.player.money = this.db.getMoney();
        this.player.liveStatic = this.db.get().liveMax;
        this.player.live = this.db.getLive();
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


       // t.sound.play("fon-music")


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


        //this.ej.sensorBody = false
        this.ej.sprite(t).map((b) => b.play("ej"));
        this.ej.scale(0.5, 0.5)
        this.ej.sensors(t, 1.5, 4, 4.5);
        this.ej.finding(t)

        this.meduzaFind.sprite(t).map((b) => b.play("meduzaFind"));
        this.meduzaFind.scale(0.5, 0.5)
        this.meduzaFind.sensors(t, 1.5, 4, 4.5);
        this.meduzaFind.finding(t)

        this.crab.sprite(t, "rectangle")
        this.crab.scale(0.6,0.6)
        this.crab.sensors(t, 0.8, 1, 2);


        this.ejDirect.speedPersecute = 2;
        this.ejDirect.sensorBody = false;
        this.ejDirect.sprite(t).map((b) => b.setTexture("ej-direct").setScale(0.4, 0.4));
        this.ejDirect.sensors(t, 1, 8, 5);

        this.bubble.sprite(t).map((b) => b.play("bubble").setScale(0.3, 0.3))
        this.bubble.sensors(t, 8, 10, 10);

        this.chest.sprite(t).map((b) => b.setTexture("ch").setScale(0.7, 0.7))
        this.chest.sensors(t, 3, 3, 3);

        this.shark.sensorBody = false;
        this.shark.speedPersecute = 2
        this.shark.sprite(t)
        this.shark.sensors(t, 0.2, 1.2, 0.6);

        //this.grassAttack.attY = 50;
        this.grassAttack.puleCount = 1
        this.grassAttack.puleScale = 0.5
        this.grassAttack.puleSensor = true;
        this.grassAttack.puleKey = "noimage"
        this.grassAttack.sprite(t);
        this.grassAttack.sensors(t, 2, 1.5, 3, "grassAttackPassive");


        this.angleFish.pX = 32;
        this.angleFish.pY = 0;
        this.angleFish.puleCount = 10;
        this.angleFish.puleRad = 15
        this.angleFish.puleScale = 0.3
        this.angleFish.puleSensor = true;
        this.angleFish.puleKey = 'angle-pule';
        this.angleFish.sprite(t);
        this.angleFish.scale(0.8, 0.8)
        this.angleFish.sensors(t, 0.1, 0.9, 1.8, "angle_R")


        this.platform.body.forEach((b) => {
            // t.matter.body.setPosition(b,{x:b.position.x + b.width,y:b.position.y + b.height },true)
            //  t.matter.body.translate(b,{x:-b.width / 2,y:-b.height / 2})
            // console.log(b.angle)
        })

        let count = 0
        let timer = t.time.addEvent({
            delay: 500,                // ms
            callback: () => {


                this.angleFish.body.forEach((b) => {
                    b.pule = []
                    if (b.sensor.sensor) {
                        if (b.attack.pule) {
                            //   b.attack.pule.push(t.matter.add.circle(b.body.position.x,b.body.position.y,20,{isSensor:true,label:"alive"}))
                        }

                    }

                })

            },
            //args: [],
            callbackScope: t,
            repeat: -1,
            paused: true
        });


        let db = this.db;


        t.matterCollision.addOnCollideStart({
            objectB: this.platform.body,
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectB} = eventData;


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
                        db.setMoney(bodyA.money);
                    }

                }

            }
        });

        function levelStep(bodyA, body, db, t, el) {
            if (parseInt(body.label.split("_")[1]) === el) {
                if(window.ysdk){
                    window.ysdk.adv.showFullscreenAdv({
                        callbacks: {
                            onClose: function(wasShown) {
                                // Действие после закрытия рекламы.
                                db.setLevel("Scene_" + el);
                                t.scene.start("Scene_" + el);
                            },
                            onError: function(error) {
                                db.setLevel("Scene_" + el);
                                t.scene.start("Scene_" + el);
                            }
                        }
                    })
                }



            }
        }

        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            objectB: this.point.body,
            callback: (eventData) => {
                const {gameObjectA, bodyB} = eventData;
                [1, 2, 3, 4, 5, 6, 7, 8,9,10].forEach((el) => {
                    levelStep(gameObjectA, bodyB, this.db, t, el);

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
                        if (gameObjectB.attack) {
                            bodyA.live = bodyA.live - gameObjectB.attack.attack;
                        }

                        if (bodyA.live < 10) {
                            bodyA.live = 15
                            gameObjectA.setPosition(getObjects(t.map, "player")[0].x, getObjects(t.map, "player")[0].y)
                        }
                    }
                    db.setLive(bodyA.live);
                }


            }
        });


        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            callback: (eventData) => {
                const {bodyB,gameObjectB} = eventData;
                if (bodyB.label && bodyB.label.search(/sensor/)) {
                    bodyB.sensor = true;
                    if(bodyB.name === "grassAttack"){
                        gameObjectB.play("grassAttackActive", true)

                    }
                }

            }
        });
        t.matterCollision.addOnCollideEnd({
            objectA: this.player.body,
            callback: (eventData) => {
                const {bodyB,gameObjectB} = eventData;
                if (bodyB.label && bodyB.label.search(/sensor/)) {
                    bodyB.sensor = false;
                    if(bodyB.name === "grassAttack"){
                        gameObjectB.play("grassAttackPassive", true)

                      //  gameObjectB.setPosition(getObjects(t.map,"grassAttack")[bodyB.num].x,getObjects(t.map,"grassAttack")[bodyB.num].y)
                    }
                }

            }
        });

        t.matterCollision.addOnCollideStart({
            objectA: this.fugu.body.concat(this.crab.body, this.meduza.body, this.shark.body, this.angleFish.body),
            objectB: this.point.body,
            callback: (eventData) => {
                const {bodyA, bodyB} = eventData;
                if (bodyA.label === "alive" && bodyB.label === "right") {
                    bodyA.direction = 1;
                }
                if (bodyA.label === "alive" && bodyB.label === "left") {
                    bodyA.direction = 0;

                }

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
            objectB: this.money,
            callback: (eventData) => {
                const {bodyA, gameObjectB} = eventData;
                bodyA.money = bodyA.money + 1;
                db.setMoney(bodyA.money);
                gameObjectB.destroy();
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
                        db.setLive(bodyA.live);
                        gameObjectB.destroy();
                    }
                }

            }
        });

        t.matterCollision.addOnCollideStart({
            objectA: this.bubble.body,
            objectB: this.point.body,
            callback: (eventData) => {
                const {bodyB, gameObjectA} = eventData;
                if (bodyB) {
                    gameObjectA.setPosition(gameObjectA.sensor.sX, gameObjectA.sensor.sY);
                }

            }
        });

    }

    draw(t) {
        this.player.draw(t);
        this.fugu.draw(t, 'horizontal', 'fugu_L', 'fugu_R', 'fugu_AL', 'fugu_AR');
        this.meduza.draw(t, 'vertical', 'meduza', 'meduza');
        this.crab.draw(t, 'horizontal', 'crab', 'crab', 'crab', 'crab');

        this.ejDirect.gravity();
        this.ejDirect.draw(t, "persecute", 'none', 'none', 'none', 'none', this.player.body.body);

        this.bubble.body.forEach((b) => b.setVelocityY(-this.bubble.speed));
        this.shark.draw(t, 'persecute', 'shark_L', 'shark_R', 'shark_L', 'shark_R', this.player.body.body, true);
        this.angleFish.draw(t, "horizontal", "angle_L", "angle_R", "angle_L", "angle_R");

        this.grassAttack.body.forEach((el,i)=>{
            if(el.sensor.sensor){
                el.attack.pule.forEach((b)=>{
                    b.setPosition(el.body.position.x ,el.body.position.y - 30);
                })

            }else {
                el.play("grassAttackPassive", true)
                el.attack.pule.forEach((b)=>{
                    b.setPosition(el.body.position.x ,el.body.position.y + 20);
                })
            }
        })



    }
}