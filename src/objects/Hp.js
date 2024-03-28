import Body from "./Body";
export default class Hp extends Body{
    constructor(name,label,speed) {
        super(name,label,speed);
    }

    body = [];
    attack = 0;
    direction = 0;
    live = 500;

    setup(el,map){
        this.optionsBody = {live:100}
        this.body = this.sprite(el,map,{live:100});


        this.scale(0.3,0.3)
        this.sensors(el,7,7,7)


    }
}