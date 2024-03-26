import Body from "./Body";
import {arrayCount} from "../action";
export default class Fugu extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }
    body = []


    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: "fugu_L",
            frames: el.anims.generateFrameNumbers(this.name, {frames: arrayCount(0,59)}),
            frameRate: 30,
            repeat: -1,
        });
        el.anims.create({
            key: "fugu_R",
            frames: el.anims.generateFrameNumbers(this.name, {frames: arrayCount(59,118)}),
            frameRate: 30,
            repeat: -1,
        });

        this.body.forEach((b)=>{
            b.play("fugu_R").setCircle(b.width / 3, {
                isSensor: true,
                label: "alive",
                direction: 0,
            }).setFixedRotation();
        })


    }


}