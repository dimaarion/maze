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
    width = 0;
    height = 40;
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
    animateFiceLeft = new Animate();
    animateleft = new Animate();
    animateRight = new Animate();
    animateJampLeftN = new Animate();
    animateJampLeftK = new Animate();
    animateFiceRight = new Animate()

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.static = false;
        this.sizeImage = { width: 150, height: 150 };
        this.speedAn = 2;

    }



    loadImg(p5) {
        this.animateJampLeftN.animateLoad(p5, "./img/player/jampLn.png");
        this.animateJampLeftK.animateLoad(p5, "./img/player/jampLk.png");
        this.animateleft.animateLoad(p5, "./img/player/runL.png", 54);
        this.animateRight.animateLoad(p5, "./img/player/run.png", 54);
        this.animateFiceLeft.animateLoad(p5, "./img/player/stopLeft.png",54);
        this.animateFiceRight.animateLoad(p5, "./img/player/ficeRight.png");
    }


    setup(world, scena) {
        this.fric = 1;
        this.createEllipse(world, scena);
        this.animateJampLeftN.setupAnimate();
        this.animateJampLeftK.setupAnimate();
        this.animateleft.setupAnimate();
        this.animateFiceLeft.setupAnimate();
        this.animateRight.setupAnimate();
        this.body.map((b) => {
            return b.render.visible = true;
        })
        this.gravity = scena.size(this.gravity, scena.scale);
        this.velocity = scena.size(this.velocity, scena.scale);
        //this.spriteAnimate("playerLeft", 24);
        // this.spriteAnimate("player", 1, 1)
    }







    draw(p5, world, press) {
        if (Array.isArray(this.body)) {

            //  this.translate(world);
            this.setRotate(0);






            //  this.spriteAnimate("player", 1, 1)

            if (this.collides(world, "platform_b", 0)) {
                this.colide = this.collides(world, "platform_b", 0);
            } else if (this.collides(world, "ladder", 0)) {
                this.colide = this.collides(world, "ladder", 0);
            }else{
                this.colide = false
            }






            if (press.pressRight === "ArrowRight" && press.pressUp === 0 && this.colide === true) {
                this.setVelosity(this.gravity, 0);
                
                this.direction = 2;

            }

            if (press.pressLeft === "ArrowLeft" && press.pressUp === 0 && this.colide === true) {
             //   this.spriteAnimate(p5, this.animateleft, this.width, this.height)
                this.setVelosity(-this.gravity, 0);
                this.direction = 1;

            }

            if (press.pressLeft !== "ArrowLeft" && this.direction === 1 && press.pressUp === 0 && this.colide === true) {
              //  this.spriteAnimate(p5, this.animateFiceLeft, this.width, this.height);
            }

            if (press.pressRight !== "ArrowRight" && this.direction === 2 && press.pressUp === 0 && this.colide === true) {
               // this.spriteAnimate(p5, this.animateFiceRight, this.width, this.height);
            }

            if (press.pressRight === "ArrowRight" && press.pressUp === "ArrowUp" && this.colide === true) {
              //  this.spriteAnimate(p5, this.animateFiceLeft, this.width, this.height);
                this.setVelosity(this.velocity, -this.gravity);
            }
            if (press.pressLeft === "ArrowLeft" && press.pressUp === "ArrowUp" && this.colide === true) {
                this.setVelosity(-this.velocity, -this.gravity);
            }
            if (press.pressLeft === "ArrowLeft" && press.pressUp === "ArrowUp" && this.getVelocity()[0].y > 0) {
             //   this.spriteAnimate(p5, this.animateJampLeftN, this.width, this.height);
            }
            if (press.pressLeft === "ArrowLeft" && press.pressUp === "ArrowUp" && this.getVelocity()[0].y < 0) {
             //   this.spriteAnimate(p5, this.animateJampLeftK, this.width, this.height);
            }
            if (this.direction === 1 && this.colide !== true && press.pressLeft === 0 && press.pressUp === 0) {
              //  this.spriteAnimate(p5, this.animateFiceLeft, this.width, this.height);

            } else if (this.direction === 2) {

            } else {
                //  this.spriteAnimate(p5,this.animateFice)
            }

            if (press.pressRight !== "ArrowRight" && press.pressLeft !== "ArrowLeft" && press.pressUp === "ArrowUp" && this.colide === true) {
                this.setVelosity(0, -this.gravity)
            }


            this.body.map((b, i) => {
                if (this.getVelocity()[i].x > 0 && this.colide === true && press.pressRight !== 0) {
                    this.spriteAnimate(p5, this.animateRight, this.width, this.height);
                    //   this.animateRight.spriteView(p5, b.position.x - b.width / 2, b.position.y - b.width / 2, b.width, b.width);
                    //   this.spriteAnimate("playerRight", 24,3);
                }
                if (this.getVelocity()[i].x < 0 && this.colide === true && press.pressLeft !== 0) {
                    this.spriteAnimate(p5, this.animateleft, this.width, this.height)
                    ///   this.animateleft.spriteView(p5, b.position.x - b.width / 2, b.position.y - b.width / 2, b.width, b.width);
                    // this.spriteAnimate("playerLeft", 24);
                }
                if (press.pressLeft === 0 && this.direction === 1) {
                    this.spriteAnimate(p5, this.animateFiceLeft, this.width, this.height);
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
