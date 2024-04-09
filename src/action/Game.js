import Database from "../components/Database";
import Player from "../objects/Player";
import Money from "../objects/Money";
import Point from "../objects/Point";
import Platform from "../objects/Platform";
import Body from "../objects/Body";
import Hp from "../objects/Hp";

import {getObjects} from "./index";

export default class Game {
    db = new Database();
    platform = new Platform("platform")
    player = new Player(3);
    money = new Money("money");
    point = new Point("point");
    fugu = new Body("fugu", "alive", 1);
    meduza = new Body("meduza", "alive", 1);
    hp = new Hp("hp", "hp");
    crab = new Body("crab", 'alive', 1);
    shark = new Body("shark", 'alive', 1.5);
    ej = new Body("ej", 'alive', 1.5);
    ejDirect = new Body("ej-direct", 'alive', 1.5);

    setup(t) {
        this.player.money = this.db.getMoney();
        this.player.liveStatic = this.db.get().liveMax;
        this.player.live = this.db.getLive();
        this.player.setup(t, t.map);
        t.matter.world.createDebugGraphic();
        t.matter.world.drawDebug = false;
        t.cursor = t.input.keyboard.createCursorKeys();


        t.scene.launch('InterFace', {player: this.player});
        t.cam = t.cameras.main;
        t.cam.startFollow(this.player.body, true);
        t.cameras.main.zoom = 1.5;
        t.cameras.main.setBounds(0, 0, t.map.widthInPixels, t.map.heightInPixels);
        t.matter.world.setBounds(0, 0, t.map.widthInPixels, t.map.heightInPixels);


        // t.map.setCollisionByExclusion([-1, 0]);
        // t.map.setCollisionByProperty({collides: true});
        this.player.sceneKey = t.scene.key;
        this.platform.body = this.platform.setup(t, t.map);
        this.money.setup(t, t.map);
        this.hp.setup(t, t.map);
        this.point.setup(t, t.map);




        switch (t.scene.key) {
            case 'Scene_1':
                this.fugu.sprite(t, t.map, 0.7, 0.7);
                this.fugu.sensors(t, 1, 3, 4);

                this.meduza.sprite(t, t.map, 1.3, 1.3);
                this.meduza.sensors(t, 1, 2, 1.5);

                this.crab.sprite(t, t.map, 0.9, 0.9)
                this.crab.sensorBody = false
                this.crab.sensors(t, 2, 6, 5);

                this.ej.sprite(t, t.map, 0.5, 0.5).map((b) => b.play("ej"))
                this.ej.sensors(t, 1.5, 2, 4);
                break;
            case 'Scene_2':
                this.fugu.sprite(t, t.map, 0.7, 0.7);
                this.fugu.sensors(t, 1, 3, 4);

                this.meduza.sprite(t, t.map, 1.3, 1.3);
                this.meduza.sensors(t, 1, 2, 1.5);

                this.crab.sprite(t, t.map, 0.9, 0.9)
                this.crab.sensorBody = false
                this.crab.sensors(t, 2, 6, 5);

                this.ej.sprite(t, t.map, 0.5, 0.5).map((b) => b.play("ej"))
                this.ej.sensors(t, 1.5, 2, 4);

                this.ejDirect.sensorBody = false
                this.ejDirect.sprite(t, t.map, 0.2, 0.2)
                this.ejDirect.sensors(t, 1.5, 11, 9);
                break;
            case 'Scene_3':
                this.fugu.sprite(t, t.map, 0.7, 0.7);
                this.fugu.sensors(t, 1, 3, 4);

                this.meduza.sprite(t, t.map, 1.3, 1.3);
                this.meduza.sensors(t, 1, 2, 1.5);

                this.crab.sprite(t, t.map, 0.9, 0.9)
                this.crab.sensorBody = false
                this.crab.sensors(t, 2, 6, 5);

                this.ej.sprite(t, t.map, 0.5, 0.5).map((b) => b.play("ej"))
                this.ej.sensors(t, 1.5, 2, 4);

                this.ejDirect.sensorBody = false
                this.ejDirect.sprite(t, t.map, 0.2, 0.2)
                this.ejDirect.sensors(t, 1.5, 11, 9);
                break;
            case 'Scene_4':
                this.fugu.sprite(t, t.map, 0.7, 0.7);
                this.fugu.sensors(t, 1, 3, 4);

                this.meduza.sprite(t, t.map, 1.3, 1.3);
                this.meduza.sensors(t, 1, 2, 1.5);

                this.crab.sprite(t, t.map, 0.9, 0.9)
                this.crab.sensorBody = false
                this.crab.sensors(t, 2, 6, 5);

                this.ej.sprite(t, t.map, 0.5, 0.5).map((b) => b.play("ej"))
                this.ej.sensors(t, 1.5, 2, 4);

                this.ejDirect.sensorBody = false
                this.ejDirect.sprite(t, t.map, 0.2, 0.2)
                this.ejDirect.sensors(t, 1.5, 11, 9);


                this.shark.sensorBody = false
                this.shark.sprite(t, t.map, 0.5, 0.5)
                this.shark.sensors(t, 1.5, 18, 10);

                break;
            default:

        }





        let db = this.db;

        function levelStep(body, db, t, level) {

            if (body.label === "level_" + level) {
                db.setLevel("Scene_" + level)
                t.scene.start("Scene_" + level)


            }
        }


        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            objectB: this.point.body,
            callback: (eventData) => {
                const {bodyB} = eventData;
                [1, 2, 3, 4].forEach((el) => {
                    levelStep(bodyB, this.db, t, el)
                })

            }
        });


        t.matterCollision.addOnCollideActive({
            objectA: this.player.body,
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectB} = eventData;

                if (bodyB.label === "attack") {

                    if (bodyA.live) {
                        if (gameObjectB) {
                            bodyA.live = bodyA.live - gameObjectB.attack.attack;
                        }
                        db.setLive(bodyA.live);
                        if (bodyA.live < 10) {
                            db.setLive(15);
                            bodyA.gameObject.setPosition(getObjects(t.map, "player")[0].x, getObjects(t.map, "player")[0].y)
                        }
                    }

                }


            }
        });


        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            callback: (eventData) => {
                const {bodyB} = eventData;
                if (bodyB.label.search(/sensor/)) {
                    bodyB.sensor = true;
                }

            }
        });
        t.matterCollision.addOnCollideEnd({
            objectA: this.player.body,
            callback: (eventData) => {
                const {bodyB} = eventData;
                if (bodyB.label.search(/sensor/)) {
                    bodyB.sensor = false;
                }

            }
        });

        t.matterCollision.addOnCollideStart({
            objectA: this.fugu.body.concat(this.crab.body, this.meduza.body, this.shark.body),
            objectB: this.platform.body.concat(this.point.body),
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
            objectB: this.money.body,
            callback: (eventData) => {
                const {bodyA,gameObjectB} = eventData;
                bodyA.money = bodyA.money + 1;
                db.setMoney(bodyA.money);
                gameObjectB.setPosition(-9000000, 0);
            }
        });

        t.matterCollision.addOnCollideStart({
            objectA: this.player.body,
            objectB: this.hp.body,
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
                        gameObjectB.setPosition(-9000000, 0);
                    }
                }

            }
        });

    }

    draw(t) {
        this.player.draw(t);
        switch (t.scene.key) {
            case 'Scene_1':
                this.fugu.moveHorizontal('fugu_L', 'fugu_R', 'fugu_AL', 'fugu_AR');
                this.meduza.moveVertical('meduza', 'meduza');
                this.crab.moveHorizontal('crab', 'crab', 'crab', 'crab');
                this.crab.gravity();
                break;
            case 'Scene_2':
                this.fugu.moveHorizontal('fugu_L', 'fugu_R', 'fugu_AL', 'fugu_AR');
                this.meduza.moveVertical('meduza', 'meduza');
                this.crab.moveHorizontal('crab', 'crab', 'crab', 'crab');
                this.crab.gravity();
                this.ejDirect.gravity();
                this.ejDirect.persecute(t, this.player.body.body);
                break;
            case 'Scene_3':
                this.fugu.moveHorizontal('fugu_L', 'fugu_R', 'fugu_AL', 'fugu_AR');
                this.meduza.moveVertical('meduza', 'meduza');
                this.crab.moveHorizontal('crab', 'crab', 'crab', 'crab');
                this.crab.gravity();
                this.ejDirect.gravity();
                this.ejDirect.persecute(t, this.player.body.body);
                break;
            case 'Scene_4':
                this.fugu.moveHorizontal('fugu_L', 'fugu_R', 'fugu_AL', 'fugu_AR');
                this.meduza.moveVertical('meduza', 'meduza');
                this.crab.moveHorizontal('crab', 'crab', 'crab', 'crab');
                this.crab.gravity();
                this.ejDirect.gravity();
                this.ejDirect.persecute(t, this.player.body.body);
                this.shark.persecute(t, this.player.body.body, 'horizontal', 'shark_L', 'shark_R', 'shark_AR', 'shark_AL');
                break;
            default:

        }

    }
}