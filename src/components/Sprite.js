import Action from "./Action";
export default class Sprite{
    name = "";
    img;
    x = 0;
    y = 0;
    w = 100;
    h = 100;
    action = new Action();
    constructor(name,x,y,w,h) {
        this.name = name;
        this.x = this.action.percent(window.innerWidth,x);
        this.y = this.action.percent(window.innerHeight,y);
        this.w = this.action.percent(window.innerWidth,w);
        this.h = this.action.percent(window.innerHeight,h);
    }

    load(p5){
        this.img = p5.loadImage(this.name)
    }

    view(p5){
        try {
            p5.image(this.img,this.x,this.y,this.w,this.h);
        }catch (e) {

        }
    }
}