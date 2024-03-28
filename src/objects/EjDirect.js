import Body from "./Body";
export default class EjDirect extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }

    body = []
    attack = 30
    direction = 2;
    setup(el,map){
        this.body = this.sprite(el,map);
        this.scale(0.3,0.3)
        this.sensors(el,1,2,7)

    }
}