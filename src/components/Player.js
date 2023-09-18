import Matter from "matter-js";
import Body from "./Body";
import Animate from "./Animate";
export default class Player extends Body {
    body = {};
    scena = {};
    m = {};
    x = 100;
    y = 100;
    joystick;
    static = false;
    width = 50;
    height = 50;
    radius = 50;
    left = 0;
    right = 0;
    up = 0;
    down = 6;
    mass = 1;
    speed = 0;
    friction = 1;
    getObj;
    frame = 1;
    baseY = 0;
    img;
    world;
    engine;
    p5;
    time = 0;
    direction = 0;
    speedBody = 0.08;
    speedBodyDop = 1;
    gravity = 5;
    rotate = 0;
    header;
    header2;
    velocity = 5;
    atanImg;
    atanIcon;
    money = 0;
    active = 0;
    //timer = new Panel();
    elapsedSeconds = 0;
    elapsedMinutes = 0;
    colideMoney = false;
    animateFice


    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.static = false;
        this.sizeImage = { width: 150, height: 150 };
        this.speedAn = 0.5;
        //  this.imgArr = ["./img/money/1.png","./img/money/50.png"];
         this.image = "./img/player/playerFace.png";
    }

    setup(world, scena) {
        this.fric = 1;

        this.createRect(world, scena);
        this.body.map((b) => {
            b.render.visible = true;
        })
        this.gravity = scena.size(this.gravity, scena.scale);
        this.velocity = scena.size(this.velocity, scena.scale);
        this.spriteAnimate("playerLeft", 24);
        this.spriteAnimate("player", 1, 1)
    }







    draw(world, press) {
        let x = 0;
        let y = 0;
        this.translate(world);
        this.setRotate(0);
        let animations = 0;
        this.spriteAnimate("player", 1, 1)
        this.colide = this.collides(world, "platform_b", 0);
 
        if (press.pressUp === "ArrowUp" && this.colide === true) {
            this.body.map((b) => {
                Matter.Body.setVelocity(b, { x: 0, y: -this.gravity });
            })
        }
        if (press.pressRight === "ArrowRight" && this.colide === true) {
            animations = 1
            
            this.body.map((b) => Matter.Body.setVelocity(b, { x: this.velocity, y: 0 }))
        }
        if (press.pressLeft === "ArrowLeft" && this.colide === true) {
            animations = 2
           
            this.body.map((b) => Matter.Body.setVelocity(b, { x: -this.velocity, y: 0 }))
        } 
        if (press.pressLeft === "ArrowLeft" && press.pressUp === "ArrowUp" && this.colide === true) {
            
            this.body.map((b) => Matter.Body.setVelocity(b, { x: -this.velocity, y: -this.gravity }))
        }
        if (press.pressRight === "ArrowRight" && press.pressUp === "ArrowUp" && this.colide === true) {
           
            this.body.map((b) => Matter.Body.setVelocity(b, { x: this.velocity, y: -this.gravity }))
        }
this.body.map((b,i)=>{
    if(this.getVelocity()[i].x > 3 && this.getVelocity()[i].y == 0){
        this.spriteAnimate("playerRight", 24,3);
    }
    if(this.getVelocity()[i].x < -3 && this.getVelocity()[i].y == 0){
        this.spriteAnimate("playerLeft", 24);
    }
    if(this.getVelocity()[i].x < -3 && this.getVelocity()[i].y > 0){
        this.spriteAnimate("playerLeft", 24);
    }


})
        

    }



    translate(world) {
        let bodies = world.bodies;
        bodies.map((el) => Matter.Body.translate(el, {
            x: -this.body[0].position.x + (window.innerWidth / 2 - this.body[0].width / 2),
            y: -this.body[0].position.y + window.innerHeight / 2
        }))

    }
}
