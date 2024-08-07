import Body from "./Body";
export default class Crab extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }

    body = []
    attack = 1
    direction = 0;
    sensorBody = false;
    optionsSensor = {jump:true,upSpeed:0}
    setup(el,map){
        this.body = this.sprite(el,map)
        el.anims.create({
            key: "crab",
            frames: "crab",
            frameRate: 20,
            repeat: -1,
        });


        this.scale(0.5,0.6)
        this.sensors(el,2,8,7)
        this.body.forEach((b)=>{
            b.play("crab").setVelocityY(10);
        })


    }

    view(){
        this.body.forEach((b)=>{
            b.setVelocityY(1);
        })
    }
}