import {getObjects} from "./index";
import Database from "../components/Database";
import Phaser from "phaser";

export default class Event {
    db = new Database();

    direction(pair,a,b) {
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
    directionRandom(pair) {

        if (pair.bodyB.label === "alive" && pair.bodyA.name === "platform") {

            pair.bodyB.direction = Phaser.Math.Between(0, 1);
        }

    }

    sensorPlay(pair, nameSensor, sen = false) {
        if (pair.bodyB.label === nameSensor && pair.bodyA.label === "player") {
            pair.bodyB.sensor = sen;
        }
    }

    levelStep(pair, t, level) {
        if (pair.bodyA.label === "player" && pair.bodyB.label === "level_" + level) {
            this.db.setLevel("Scene_" + level)
            t.scene.start("Scene_" + level)


        }
    }

    setMoney(pair) {
        if (pair.bodyA.label === "player" && pair.bodyB.name === "money") {
            if(pair.bodyB.name === "money"){
                pair.bodyA.money = pair.bodyA.money + 1;
                this.db.setMoney(pair.bodyA.money);
                pair.bodyB.remove = true;
                if(pair.bodyB.gameObject){
                 pair.bodyB.gameObject.setPosition(-9000000,0);
                }

            }

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
                if(pair.bodyB.gameObject.body.velocity.y === 1){
                 //   pair.bodyB.gameObject.setVelocityY(-1);
                }else {
                  //  pair.bodyB.gameObject.setVelocityY(1);
                }
            }

           //
        }
    }

    animateHorizontal(pair,name, left, right){
       if(pair.bodyB.name === name && pair.bodyB.label === 'alive' && pair.bodyA.label === "right" ){
           if(pair.bodyB.gameObject.body.velocity.x > 0){
               pair.bodyB.gameObject.play(left);
           }

       }
        if(pair.bodyB.name === name && pair.bodyB.label === 'alive' && pair.bodyA.label === "left"){
            if(pair.bodyB.gameObject.body.velocity.x < 0){
                pair.bodyB.gameObject.play(right);
            }

        }
    }

    animateSensorHorizontal(pair,name,left,right,s = true){
        if (pair.bodyA.label === "player" && pair.bodyB.label.search(/sensor/)) {
            if(pair.bodyB.name === name){
                if(pair.bodyB.gameObject.body.velocity.x < 0){
                    pair.bodyB.gameObject.play(left);
                }else{
                    pair.bodyB.gameObject.play(right);
                }

            }
        }
    }

    sensorAnimate(pair,name, anim,s = false){
        if (pair.bodyA.label === "player" && pair.bodyB.label.search(/sensor/)) {
            if(pair.bodyB.name === name){
                pair.bodyB.gameObject.play(anim);
                if(pair.bodyB.gameObject.tween){
                    if(s){
                        pair.bodyB.gameObject.tween.pause()
                    }else {
                        pair.bodyB.gameObject.tween.resume()
                    }

                }
            }
        }
    }


    CollisionGames(t) {

        t.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];
                [1,2,3,4].forEach((n)=>{this.levelStep(pair, t, n);});
                this.setMoney(pair);
                this.setHp(pair);

             //   this.sensorAnimate(pair,'fugu','fugu_AR');
            //    this.animateHorizontal(pair,'shark','shark_L','shark_R')
              //  this.sensorAnimate(pair,'shark','shark_AL',true);

              //  this.jump(pair)
              //  this.animateSensorHorizontal(pair,'shark','shark_AL','shark_AR',true)
            }
        });

        t.matter.world.on('collisionactive', (event, bodyA, bodyB) => {

            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];
                this.direction(pair, bodyA, bodyB);
                this.setSensor(pair,true);
                this.setAttack(pair,t);
              // this.setSensor(pair,'shark',true,'shark_R','shark_L');
            }


        })

        t.matter.world.on('collisionend', (event) => {
            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];
                this.setSensor(pair,false);
              //  this.sensorAnimate(pair,'fugu','fugu_R');

             //   this.setSensor(pair,'shark',false,t);
             //   this.sensorAnimate(pair,'shark','shark_R');
              //  this.animateSensorHorizontal(pair,'shark','shark_L','shark_R',false)

            }
        });

    }
}