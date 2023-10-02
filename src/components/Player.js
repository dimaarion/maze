import Matter from "matter-js";
import Body from "./Body";
import Animate from "./Animate";
export default class Player extends Body {
    body = {};
    scena = {};
    images = {};
    img = "";
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

    elapsedSeconds = 0;
    elapsedMinutes = 0;
    colideMoney = false;
    animateFice = new Animate();
    animateleft = new Animate();
    animateRight = new Animate()


    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.static = false;
        this.sizeImage = { width: 150, height: 150 };
        this.speedAn = 2;

    }



    loadImg(p5) {
        this.animateFice.animateLoad(p5, "./img/player/1.png");
        this.animateleft.animateLoad(p5, "./img/player/run.png", 62);
        this.animateRight.animateLoad(p5, "./img/player/runR.png", 62);
    }


    setup(world, scena) {
        this.fric = 1;
        this.createEllipse(world, scena);
        this.animateleft.setupAnimate();
        this.animateRight.setupAnimate();
        this.body.map((b) => {
            b.render.visible = true;
        })
        this.gravity = scena.size(this.gravity, scena.scale);
        this.velocity = scena.size(this.velocity, scena.scale);
        //this.spriteAnimate("playerLeft", 24);
        // this.spriteAnimate("player", 1, 1)
    }







    draw(p5, world, press) {
        if (Array.isArray(this.body)) {
            let x = 0;
            let y = 0;
            //  this.translate(world);
            this.setRotate(0);




            let animations = 0;

            //  this.spriteAnimate("player", 1, 1)
            this.colide = this.collides(world, "platform_b", 0);




            if (press.pressRight === "ArrowRight" && press.pressUp === 0 && this.colide === true) {
                this.setVelosity(this.gravity,0);
                
            }else if (press.pressLeft === "ArrowLeft" && press.pressUp === 0 && this.colide === true) {
                this.setVelosity(-this.gravity, 0);
              
            } else if (press.pressRight === "ArrowRight" && press.pressUp === "ArrowUp" && this.colide === true) {
                this.setVelosity(this.velocity, -this.gravity);
            } else if (press.pressLeft === "ArrowLeft" && press.pressUp === "ArrowUp" && this.colide === true) {
                this.setVelosity(-this.velocity, -this.gravity);
            }else{
               
            } 

            if(press.pressRight === "ArrowRight" && press.pressUp === 0){
                this.spriteAnimate(p5,this.animateRight)
            }else if(press.pressLeft === "ArrowLeft" && press.pressUp === 0){
                this.spriteAnimate(p5,this.animateleft)
            }else{
                this.spriteAnimate(p5,this.animateFice)
            }

            if (press.pressRight !== "ArrowRight" && press.pressLeft !== "ArrowLeft" && press.pressUp === "ArrowUp" && this.colide === true) {
                this.setVelosity(0, -this.gravity)
            }


            this.body.map((b, i) => {
                if (this.getVelocity()[i].x > 3 && this.getVelocity()[i].y == 0) {
                 //   this.animateRight.spriteView(p5, b.position.x - b.width / 2, b.position.y - b.width / 2, b.width, b.width);
                    //   this.spriteAnimate("playerRight", 24,3);
                }
                if (this.getVelocity()[i].x < -3 && this.getVelocity()[i].y == 0) {
                 ///   this.animateleft.spriteView(p5, b.position.x - b.width / 2, b.position.y - b.width / 2, b.width, b.width);
                    // this.spriteAnimate("playerLeft", 24);
                }
                if (this.getVelocity()[i].x < -3 && this.getVelocity()[i].y > 0) {

                    // this.spriteAnimate("playerLeft", 24);
                }
                if (this.getVelocity()[i].x < 2 && this.getVelocity()[i].x >= 0) {
                 //   p5.image(this.animateFice.sprite(p5), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
                }
                if (this.getVelocity()[i].x > -2 && this.getVelocity()[i].x <= 0) {
                  //  p5.image(this.animateFice.sprite(p5), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
                }

            }
            )
        }
        //this.sprite(p5)
    }



    translate(world) {
        if (world !== undefined) {
            world.bodies.map((el) => Matter.Body.translate(el, {
                x: -this.body[0].position.x + (window.innerWidth / 2 - this.body[0].width / 2),
                y: -this.body[0].position.y + window.innerHeight / 2
            }))
        }


    }
}
