import Body from "./Body";

export default class Money extends Body{
    constructor(props) {
        super(props);
        this.sensor = true;
        this.sizeImage = { width: 200, height: 200 };
       
        //  this.imgArr = ["./img/money/1.png","./img/money/50.png"];
        //this.image = "./img/player/ball.png";
    }

    setup(world, scena) {
      //  this.speedAn = 20
        this.createEllipse(world, scena);
    }


    draw(world) {
        this.spriteAnimate("./img/money/", 63);
    }
}