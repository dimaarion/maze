import {arrayCount, getObjects} from "../action";
import Body from "./Body";
export default class Money {
    name = "money"
    constructor(name) {
        this.name = name
    }
    body = []

    setup(t,map){
        this.body = this.body = getObjects(map, this.name).map((b) => {
            return  t.matter.add.sprite(b.x + b.width / 2,b.y + b.height / 2,this.name).setScale(0.5,0.5)
        })

        this.body.forEach((b)=>{
            b.play('money').setCircle(b.width / 2, {
                isSensor: true,
                label: this.name,
                name:this.name,
                remove:false
            }).setFixedRotation();
        })


    }

    draw(el){

    }
}