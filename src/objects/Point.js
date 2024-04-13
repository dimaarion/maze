import Body from "./Body";
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

    draw(){

    }
}