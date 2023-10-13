import Body from "./Body";
import Animate from "./Animate";

export default class Ladder extends Body{

    animate = new Animate();

    constructor(props) {
        super(props);
        this.sensor = true;
    }


    loadImg(p5){
        this.animate.animateLoad(p5,"./img/ladder/ladder.png");
    }

    setup(world, scena) {
      //  this.animate.setupAnimate();
        this.createRect(world, scena);

    }


    draw(p5) {
        if(Array.isArray(this.body)){
            this.body.filter((f)=>f.remove === false).map((b)=>{
             return this.animate.spriteView(p5, b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
            })
        }
       
    }
}