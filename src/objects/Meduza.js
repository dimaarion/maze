import Body from "./Body";
import {getObjects} from "../action";
import Phaser from "phaser";
export default class Meduza extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }

    body = []
    attack = 1
    direction = 2;

    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: "meduza",
            frames: "meduza",
            frameRate: 20,
            repeat: -1,
        });


        this.sensors(el,1,2,3)
        this.body.forEach((b)=>{
            b.play("meduza");
            this.body.forEach((b,i)=>{
                b.play("meduza")
                el.tweens.add({
                    targets: b,
                    props: {
                        y: { start: b.y, to:b.y + getObjects(el.map,this.name)[i].height / 2 , duration: Phaser.Math.Between(3000, 6000)},
                    },
                    ease: 'Linear',
                    yoyo: true,
                    repeat: -1
                });

            })
        })



    }
}