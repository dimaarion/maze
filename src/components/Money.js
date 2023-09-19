import Body from "./Body";
import Animate from "./Animate";

export default class Money extends Body{

    animate = new Animate();

    constructor(props) {
        super(props);
        this.sensor = true;
    }


    loadImg(p5){
        this.animate.animateLoad(p5,"./img/money/money.png",63);
    }

    setup(world, scena) {
        this.animate.setupAnimate();
        this.createEllipse(world, scena);

    }


    draw(p5) {
        if(Array.isArray(this.body)){
            this.body.filter((f)=>f.remove === false).map((b)=>{
              this.animate.spriteView(p5, b.position.x - b.width / 2, b.position.y - b.width / 2, b.width, b.width)
            })
        }
       
    }
}