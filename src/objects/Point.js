import {getObjects} from "../action";
export default class Point {
    body
    name
   constructor(name) {
        this.name = name
   }

    setup(t){
        this.body = getObjects(t.map, this.name).map((b) => {
            return t.matter.add.rectangle(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, {
                label: b.type,
                isSensor: true,
                isStatic: false
            })
        })
        return this.body;
    }


    sprite(t,label,play){
        t.anims.create({
            key: 'bubble-potok',
            frames: 'bubble-potok',
            frameRate: 10,
            repeat: -1
        });

        this.body = t.map.createFromObjects("point", {name: label});
        this.body.map((b) => t.matter.add.gameObject(b, {isSensor: true, label: label,sensorBody:false}).play(play).setPosition(b.x,b.y));

    }

    draw(){

    }
}