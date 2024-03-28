import {getObjects} from "../action";

export default class Body{
    label = "";
    speed = 0;
    body = [];
    name = "";
    sensor
    attack = 10;
    direction = 0;
    optionsSensor = {};
    optionsBody = {};
    sensorBody = true;
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
            return  t.matter.add.sprite(b.x + b.width / 2,b.y + b.height / 2,this.name)
        })
    }

    scale(s1 = 1,s2 = 1){
        this.body.forEach((el) => {
           el.setScale(s1,s2);
        })
    }

    sensors(t,sen = 5,lab = 8,att = 10){
        this.body = this.body.map((b,i)=>{
            let sx = b.width / 2;
            let sy = b.height / 2;
            b.attack = t.matter.bodies.circle(sx,sy,b.width / att ,{label: 'attack', direction:this.direction, isSensor:true, attack:this.attack})
            b.playerBody = t.matter.bodies.circle(sx,sy,b.width / lab ,Object.assign({label: this.label, direction:this.direction, isSensor:this.sensorBody},this.optionsBody))
            b.sensor = t.matter.bodies.circle(sx,sy,b.width / sen,Object.assign({label:this.name + "_sensor", direction:this.direction, isSensor:true},this.optionsSensor))
            const compoundBody = t.matter.body.create({
                parts: [
                    b.playerBody, b.sensor, b.attack
                ],
                friction: 0.01,
                restitution: 0.05,
                label:this.label
            });
          return   b.setExistingBody(compoundBody).setPosition(getObjects(t.map,this.name)[i].x + getObjects(t.map,this.name)[i].width / 2, getObjects(t.map,this.name)[i].y + getObjects(t.map,this.name)[i].height / 2).setSize(getObjects(t.map,this.name)[i].width,getObjects(t.map,this.name)[i].height).setName(this.name).setFixedRotation();
        })

    }

    draw(){
        this.body.forEach((el) => {
            if (el.playerBody && el.playerBody.direction === 0) {
                el.setVelocity(this.speed, 0)
            } else if(el.playerBody && el.playerBody.direction === 1){
                el.setVelocity(-this.speed, 0)
            } else if(el.playerBody && el.playerBody.direction === 2){
                el.setVelocity(0, -this.speed)
            }else if(el.playerBody && el.playerBody.direction === 3){
                el.setVelocity(0, this.speed)
            }else {
                el.setVelocity(-this.speed, 0)
            }
        })
    }
}
