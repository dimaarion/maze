import {arrayCount, getObjects} from "../action";
import Body from "./Body";
export default class Money extends Body{
    constructor(props) {
        super(props);
    }
    body = []

    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: this.name,
            frames: "money",
            frameRate: 30,
            repeat: -1,
        });

        this.body.forEach((b)=>{
            b.play(this.name).setCircle(b.width / 2, {
                isSensor: true,
                label: "money",
                direction: 0,
            }).setFixedRotation();
        })
    }

    draw(el){

    }
}