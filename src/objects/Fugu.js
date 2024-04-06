import Body from "./Body";
import {arrayCount, getObjects} from "../action";
import * as Phaser from "phaser";
export default class Fugu extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }
    body = []
    attack = 1;
    sensorBody = true;
    direction = 0;
    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: "fugu_R",
            frames: el.anims.generateFrameNumbers(this.name, { start: 120, end: 179 }),
            frameRate: 30,
            repeat: -1,
        });
       el.anims.create({
            key: "fugu_L",
            frames: el.anims.generateFrameNumbers(this.name, { start: 0, end: 59 }),
            frameRate: 30,
            repeat: -1,
        });



        el.anims.create({
            key: "fugu_AR",
            frames: el.anims.generateFrameNumbers(this.name, { start: 180, end: 239}),
            frameRate: 30,
            repeat: -1,
        })
        el.anims.create({
            key: "fugu_AL",
            frames: el.anims.generateFrameNumbers(this.name, { start: 60, end: 119 }),
            frameRate: 30,
            repeat: -1,
        });


        this.scale(0.5, 0.5);
        this.sensors(el, 2, 6, 8);

        this.body.forEach((b,i)=>{

            b.play("fugu_R")
            el.tweens.add({
                targets: b,
                props: {
                    x: { start: b.x - getObjects(el.map,this.name)[i].width / 2, to:b.x + getObjects(el.map,this.name)[i].width / 2, duration: Phaser.Math.Between(3000, 6000), flipX: true },
                },
                ease: 'Linear',
                yoyo: true,
                repeat: -1
            });

        })



    }

    view(){

    }

}