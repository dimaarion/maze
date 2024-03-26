import {getObjects} from "../action";

export default class Body{
    label
    speed
    body
    name
    constructor(name,label = "", speed = 0) {
        this.name = name;
        this.speed = speed;
        this.label = label;
    }
    rectangle(t,map,options = {}){
        return getObjects(map, this.name).map((b) => {
           return  t.matter.add.rectangle(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, Object.assign({label: b.type}, options))
        })
    }
    sprite(t,map,options = {}){
        return getObjects(map, this.name).map((b) => {
            return  t.matter.add.sprite(b.x + b.width / 2,b.y + b.height / 2,this.name,Object.assign({label: b.type, width:b.width, height:b.height}, options))
        })
    }

    scale(s1 = 1,s2 = 1){
        this.body.forEach((el) => {
           el.setScale(s1,s2);
        })
    }

    sensors(t,options){
       this.body = this.body.map((b)=>{
            let sx = b.width / 2;
            let sy = b.height / 2;
            const playerBody = t.matter.bodies.circle(sx,sy,b.width/2)
            let sensors = t.matter.bodies.circle(sx,sy,b.width,Object.assign({label:this.label},options))
            const compoundBody = t.matter.body.create({
                parts: [
                    playerBody, sensors
                ],
            });
          return   b.setExistingBody(compoundBody).setName(this.name).setFixedRotation().setPosition(b.x, b.y);

        })

    }

    draw(){
        this.body.forEach((el) => {
            if (el.body.direction === 0) {
                el.setVelocity(this.speed, 0)
            } else if(el.body.direction === 1){
                el.setVelocity(-this.speed, 0)
            } else if(el.body.direction === 2){
                el.setVelocity(0, -this.speed)
            }else if(el.body.direction === 3){
                el.setVelocity(0, this.speed)
            }
        })
    }
}
