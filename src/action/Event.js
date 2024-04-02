import {getObjects} from "./index";
import Database from "../components/Database";

export default class Event {
    db = new Database();

    direction(pair, name, left = false, right = false, up = false, down = false) {

        if (pair.bodyB.label === "alive" && pair.bodyA.label === "right") {
            pair.bodyB.direction = 1;

        }
        if (pair.bodyB.label === "alive" && pair.bodyA.label === "left") {
            pair.bodyB.direction = 0;

        }

        if (pair.bodyB.label === "alive" && pair.bodyA.label === "up") {
            pair.bodyB.direction = 3;

        }
        if (pair.bodyB.label === "alive" && pair.bodyA.label === "down") {
            pair.bodyB.direction = 2;

        }
    }

    sensorPlay(pair, nameSensor, playR = false, playL = false, sen = false) {
        if (pair.bodyB.label === nameSensor && pair.bodyA.label === "player") {
            pair.bodyB.sensor = sen;
            if (pair.bodyB.gameObject.getVelocity().x > 0) {

            } else {

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

    setSensor(pair,name,s){
        if (pair.bodyA.label === "player" && pair.bodyB.label.search(/sensor/)) {
            if(pair.bodyB.name === name){
                pair.bodyB.sensor = s;
            }

        }
    }

    jump(pair){
        if (pair.bodyA.label === "player" && pair.bodyB.label.search(/sensor/)) {
            if(pair.bodyB.jump){
                if(pair.bodyB.gameObject.body.velocity.y === 1){
                 //   pair.bodyB.gameObject.setVelocityY(-1);
                }else {
                  //  pair.bodyB.gameObject.setVelocityY(1);
                }
            }

           //
        }
    }

    animate(pair,name, left, right){
       if(pair.bodyB.name === name && pair.bodyB.label === 'alive' && pair.bodyA.label === "right" ){
           pair.bodyB.gameObject.play(left);
       }
        if(pair.bodyB.name === name && pair.bodyB.label === 'alive' && pair.bodyA.label === "left"){
            pair.bodyB.gameObject.play(right);
        }
    }

    sensorAnimate(pair, level, right){
        if (pair.bodyA.label === "player" && pair.bodyB.label.search(/sensor/)) {
            if(pair.bodyB.name === 'fugu'){
                if(pair.bodyB.gameObject.body.velocity.x > 0){
                    pair.bodyB.gameObject.play(right);
                }else {
                    pair.bodyB.gameObject.play(level);
                }

            }
        }
    }


    CollisionStart(t) {
        this.db.create(t.map);
        t.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];

                this.levelStep(pair, t, 2);
                this.levelStep(pair, t, 3);
                this.levelStep(pair, t, 4);
                this.animate(pair,'fugu','fugu_L','fugu_R');
                this.sensorAnimate(pair,'fugu_AL','fugu_AR');

              //  this.jump(pair)

            }
        });

        t.matter.world.on('collisionactive', (event) => {

            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];
                this.direction(pair, "fugu", "fugu_L", "fugu_R");
                this.direction(pair, "meduza", false, false, false, false);
                this.setAttack(pair,t)
                this.setMoney(pair)
                this.setHp(pair)
                this.setSensor(pair,'ej-direct',true)
            }


        })

        t.matter.world.on('collisionend', (event) => {
            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];
                this.setSensor(pair,'ej-direct',false)

            }
        });

    }
}