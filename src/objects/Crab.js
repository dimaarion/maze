import Body from "./Body";
export default class Crab extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }

    body = []
    attack = 30
    direction = 0;
    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: "crab",
            frames: "crab",
            frameRate: 20,
            repeat: -1,
        });



        this.body.forEach((b)=>{
            b.play("crab");
        })

        this.scale(0.5,0.6)
        this.sensors(el,2,4,7)
    }
}