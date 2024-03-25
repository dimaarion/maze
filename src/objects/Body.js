import {getObjects} from "../action";

export default class Body{
    speed
    body
    name
    constructor(name, speed = 0) {
        this.name = name;
        this.speed = speed;
    }
    rectangle(t,map,options = {}){
        return getObjects(map, this.name).map((b) => {
           return  t.matter.add.rectangle(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, Object.assign({label: b.type}, options))
        })
    }
    sprite(t,map,options = {}){
        return getObjects(map, this.name).map((b) => {
            return  t.matter.add.sprite(b.x,b.y,this.name,Object.assign({label: b.type, width:b.width, height:b.height}, options))
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
