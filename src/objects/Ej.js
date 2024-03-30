import Body from "./Body";
export default class Ej extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }

    body = []
    attack = 1
    direction = 0;
    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: "ej",
            frames: "ej",
            frameRate: 20,
            repeat: -1,
        });



        this.body.forEach((b)=>{
            b.play("ej");
        })
        this.scale(0.5,0.5)
        this.sensors(el,3,4,3.5)


    }
}