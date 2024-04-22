import * as Phaser from "phaser";
import {getObjects} from "../action";

export default class Platform {
    body;

    setup(t, map) {
        this.body = getObjects(map, "platform").map((b) => t.matter.add.rectangle(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, {
            label: b.type,
            name: "platform",
            isStatic: true,
            width:b.width,
            height:b.height,
            angle:Phaser.Math.DegToRad(b.rotation)
        }))
        return this.body;
    }

}