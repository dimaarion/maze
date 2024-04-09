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
        this.persecutes = false
        this.body = getObjects(map, "shark").map((b) => {
            return  el.matter.add.sprite(b.x + b.width / 2,b.y + b.height / 2,this.name)
        })
        this.body = this.sprite(el,map)


        this.scale(0.5, 0.5);
        this.sensors(el, 2, 5, 5.5);


        this.body.forEach((b,i)=>{
            b.play("fugu_R")
        })



    }

    view(){
        this.body.forEach((b,i)=>{
        if(b.body.velocity.x > 0){
            if(b.sensor.sensor){
                b.play("fugu_AR",true)
            }else {
               b.play("fugu_R",true)
            }
        }else {
            if(b.sensor.sensor){
                b.play("fugu_AL",true)
            }else {
                b.play("fugu_L",true)
            }
        }
        })
    }

}