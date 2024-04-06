import Body from "./Body";
import {getObjects} from "../action";
import Phaser from "phaser";
export default class Shark extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }
    body = []
    attack = 2;
    direction = 0;
    sensorBody = false;
    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: "shark_R",
            frames: el.anims.generateFrameNumbers(this.name, { start: 0, end: 59 }),
            frameRate: 30,
            repeat: -1,
        });
        el.anims.create({
            key: "shark_AL",
            frames: el.anims.generateFrameNumbers(this.name, { start: 120, end: 179 }),
            frameRate: 30,
            repeat: -1,
        });
        el.anims.create({
            key: "shark_L",
            frames: el.anims.generateFrameNumbers(this.name, { start: 60, end: 119 }),
            frameRate: 30,
            repeat: -1,
        });
        el.anims.create({
            key: "shark_AR",
            frames: el.anims.generateFrameNumbers(this.name, { start: 180, end: 239}),
            frameRate: 30,
            repeat: -1,
        })

        this.scale(0.5, 0.5);
        this.sensors(el, 2, 13, 10);

        this.body.forEach((b)=>{
            b.play("shark_R")
        })

    }

    view(t){
        this.body.forEach((b,i)=>{
            if(b.sensor.sensor){

            }else {

            }

        })
    }
}