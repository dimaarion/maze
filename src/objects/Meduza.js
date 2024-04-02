import Body from "./Body";
export default class Meduza extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }

    body = []
    attack = 1
    direction = 2;

    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: "meduza",
            frames: "meduza",
            frameRate: 20,
            repeat: -1,
        });



        this.body.forEach((b)=>{
            b.play("meduza");
        })
        this.sensors(el,1,2,3)

    }
}