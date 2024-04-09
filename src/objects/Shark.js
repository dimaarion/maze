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
        this.persecutes = true


        el.matter.world.on('collisionactive', (event, bodyA, bodyB) => {

            for (let i = 0; i < event.pairs.length; i++) {
                let pair = event.pairs[i];
                console.log(pair.bodyB.name)
            }


        })

        this.body.forEach((b,i)=>{

        })
        this.scale(0.5, 0.5);

    }

    view(){


    }
}