import {getObjects} from "./index";
import Database from "../components/Database";
import Phaser from "phaser";
import Game from "./Game";

export default class Event extends Game{

    create(t){
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
}


