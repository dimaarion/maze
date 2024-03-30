import {getObjects} from "./index";
import Database from "../components/Database";

export default class Event {
    db = new Database();

    direction(pair, name, left = false, right = false, up = false, down = false) {

        if (pair.bodyB.label === "alive" && pair.bodyA.label === "right") {
            pair.bodyB.direction = 1;
            if (right && pair.bodyB.gameObject.name === name) {
                pair.bodyB.gameObject.play(left);
            }
        }
        if (pair.bodyB.label === "alive" && pair.bodyA.label === "left") {
            pair.bodyB.direction = 0;
            if (left && pair.bodyB.gameObject.name === name) {
                pair.bodyB.gameObject.play(right);
            }
        }

        if (pair.bodyB.label === "alive" && pair.bodyA.label === "up") {
            pair.bodyB.direction = 3;
            if (up && pair.bodyB.gameObject.name === name) {
                pair.bodyB.gameObject.play(up);
            }
        }
        if (pair.bodyB.label === "alive" && pair.bodyA.label === "down") {
            pair.bodyB.direction = 2;
            if (down && pair.bodyB.gameObject.name === name) {
                pair.bodyB.gameObject.play(down);
            }
        }
    }

    sensorPlay(pair, nameSensor, playR = false, playL = false, sen = false) {
        if (pair.bodyB.label === nameSensor && pair.bodyA.label === "player") {
            pair.bodyB.sensor = sen;
            if (pair.bodyB.gameObject.getVelocity().x > 0) {
                if (playR) {
                    pair.bodyB.gameObject.play(playR);
                }
            } else {
                if (playL) {
                    pair.bodyB.gameObject.play(playL);
                }

            }
        }
    }

    levelStep(pair, t, level) {
        if (pair.bodyB.label === "player" && pair.bodyA.label === "level_" + level) {
            this.db.setLevel("Scene_" + level)
            t.scene.start("Scene_" + level)


        }
    }

    setMoney(pair) {
        if (pair.bodyB.label === "player" && pair.bodyA.label === "money") {
            pair.bodyB.money = pair.bodyB.money + 1;
            this.db.setMoney(pair.bodyB.money);
            pair.bodyA.gameObject.destroy();
        }

    }

    setHp(pair) {
        if (pair.bodyA.label === "player" && pair.bodyB.label === "hp") {
            if (pair.bodyA.live < pair.bodyA.liveStatic) {
                if (pair.bodyA.live + pair.bodyB.live > pair.bodyA.liveStatic) {
                    pair.bodyA.live = pair.bodyA.live + (pair.bodyA.liveStatic - pair.bodyA.live);
                } else {
                    pair.bodyA.live = pair.bodyA.live + pair.bodyB.live;
                }

                this.db.setLive(pair.bodyA.live);
                pair.bodyB.gameObject.destroy();
            }

        }
    }

    setAttack(pair,t){
        if (pair.bodyA.label === "player" && pair.bodyB.label === "attack") {
            pair.bodyA.live = pair.bodyA.live - pair.bodyB.attack;
            this.db.setLive(pair.bodyA.live);
            if (pair.bodyA.live < 10) {
                this.db.setLive(15);
                pair.bodyA.gameObject.setPosition(getObjects(t.map, "player")[0].x, getObjects(t.map, "player")[0].y)
            }
        }
    }

    setSensor(pair,s){
        if (pair.bodyA.label === "player" && pair.bodyB.label.search(/sensor/)) {
            pair.bodyB.sensor = s;
        }
    }

    jump(pair){

        if (pair.bodyA.label === "player" && pair.bodyB.label.search(/sensor/)) {
            if(pair.bodyB.jump){

                   pair.bodyB.upSpeed = -1;


            }

           //
        }
    }

    CollisionStart(t) {
        this.db.create(t.map);
        t.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];

                this.direction(pair, "fugu", "fugu_L", "fugu_R")
                this.direction(pair, "meduza", false, false, false, false)
                this.levelStep(pair, t, 2)
                this.setMoney(pair)
                this.setHp(pair)
this.jump(pair)

            }
        });

        t.matter.world.on('collisionactive', (event) => {

            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];
                this.sensorPlay(pair, "fugu_sensor", "fugu_AR", "fugu_AL");
                this.setAttack(pair,t)
                this.setSensor(pair,true)

            }


        })

        t.matter.world.on('collisionend', (event) => {
            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];
                this.sensorPlay(pair, "fugu_sensor", "fugu_R", "fugu_L");
                this.setSensor(pair,false)
            }
        });

    }
}