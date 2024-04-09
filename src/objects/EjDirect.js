import Body from "./Body";
export default class EjDirect extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }

    body = []
    attack = 1
    direction = 2;
    sensorBody = false
    sensor;
    setup(el,map){
        this.body = this.sprite(el,map);
        this.scale(0.2,0.2);
        this.sensors(el,1,11,10);
    }

    view(){
        this.body.forEach((b)=>{
            if(!b.sensor.sensor){
                b.setVelocityY(1)
            }

        })
    }
}