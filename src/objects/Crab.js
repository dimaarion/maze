import Body from "./Body";
import Phaser from "phaser";
import {getObjects} from "../action";
export default class Crab extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }

    body = []
    attack = 1
    direction = 0;
    sensorBody = false;
    optionsSensor = {jump:true,upSpeed:0}
    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: "crab",
            frames: "crab",
            frameRate: 20,
            repeat: -1,
        });


        this.scale(0.5,0.6)
        this.sensors(el,2,8,7)
        this.body.forEach((b)=>{
            b.play("crab").setVelocityY(10);

            this.body.forEach((b,i)=>{
                b.play("crab")
                el.tweens.add({
                    targets: b,
                    props: {
                        x: { start: b.x - getObjects(el.map,this.name)[i].width / 2, to:b.x + getObjects(el.map,this.name)[i].width / 2, duration: Phaser.Math.Between(4000, 8000), flipX: true },
                    },
                    ease: 'Linear',
                    yoyo: true,
                    repeat: -1
                });

            })
        })


    }

    view(){
        console.log(this.direction)
    }
}