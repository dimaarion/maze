import Matter from "matter-js";
import Body from "./Body";
import Animate from "./Animate";
import Joystick from "./Joystick";

export default class Player extends Body {
    body = {};
    body2 = {};
    scena = {};
    images = {};
    img = "";
    m = {};
    x = 100;
    y = 100;
    joystick;
    static = false;
    width = 0;
    height = 0;
    radius = 50;
    left = 0;
    right = 0;
    up = 0;
    down = 6;
    mass = 1;
    speed = 1;
    speedY = 0;
    friction = 1;
    getObj;
    frame = 1;
    baseY = 0;
    world;
    engine;
    p5;
    time = 0;
    speedBody = 0.08;
    speedBodyDop = 1;
    rotate = 0;
    header;
    header2;
    gravity = 0.3;
    velocity = 0.3;
    atanImg;
    atanIcon;
    money = 0;
    active = 0;
    key = 0;
    defaultKey = 0;
    collidePlatform = false;
    collideLadder = false;
    colldeLevel = false;
    collideKey = false;
    level = 1;
    xJ = 100;
    yJ = 100;
    elapsedSeconds = 0;
    elapsedMinutes = 0;
    colideMoney = false;
    animateFiceLeft = new Animate();
    animateleft = new Animate();
    animateRight = new Animate();
    animateFiceRight = new Animate();
    animateFice = new Animate();
    animateLadder = new Animate();
    animateLadderStatic = new Animate();
    joystick = new Joystick();

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.static = false;
        this.sizeImage = {width: 150, height: 150};
        this.speedAn = 2;

    }


    loadImg(p5) {


        this.animateleft.animateLoad(p5, "./img/player/leftSwim.png", 6);
        this.animateRight.animateLoad(p5, "./img/player/rightSwim.png", 6);
        this.animateFiceLeft.animateLoad(p5, "./img/player/leftRest.png", 6);
        this.animateFiceRight.animateLoad(p5, "./img/player/rightRest.png", 6);
        this.animateFice.animateLoad(p5, "./img/player/leftRest.png", 6);

    }


    setup(world, scena) {
        // this.fric = 1;
        this.createEllipse(world, scena);
       // this.body2 = Matter.Bodies.circle(0,0,200,{width:200,height:200,label:"sensor"});
       // this.compound = Matter.Body.create({
       //     parts:[this.body[0],this.body2]
      //  })
    //    this.body = this.compound.parts.filter((f)=>f.label=== "player");
      //  this.body2 = this.compound.parts.filter((f)=>f.label=== "sensor");
       // console.log(this.body2)
        this.animateleft.rate = 3;
        this.animateFiceLeft.rate = 3;
        this.animateFiceRight.rate = 3;
        this.animateRight.rate = 3;
        this.animateleft.setupAnimate();
        this.animateFiceLeft.setupAnimate();
        this.animateFiceRight.setupAnimate();
        this.animateRight.setupAnimate();
        this.animateFice.setupAnimate();
        this.body.map((b) => {
            return b.level = this.level;
        })
        this.gravity = this.percent(this.speed / 2);
        this.velocity = this.percent(this.speed / 2);
        // this.gravity = scena.size(this.gravity, scena.scale);
        // this.velocity = scena.size(this.velocity, scena.scale);
        //this.spriteAnimate("playerLeft", 24);
        // this.spriteAnimate("player", 1, 1)
        this.xJ = this.percentX(80);
        this.yJ = this.percentY(80);
        this.live = 500
    }


    draw(p5, world, press) {
        if (Array.isArray(this.body)) {

            //  this.translate(world);
            this.setRotate(0);


            if (this.collides(world, "platform_b", 0)) {
                this.collidePlatform = this.collides(world, "platform_b", 0);
            } else if (this.collides(world, "stone", 0)) {
                this.collidePlatform = this.collides(world, "stone", 0);
            } else {
                this.collidePlatform = false;
            }
            this.collideKey = this.collides(world, "key", 0);
            this.collideLadder = this.collides(world, "ladder", 0);
            this.colldeLevel = this.collides(world, "level_2", 0);

            this.joystick.createJoystick(p5,this.xJ,this.yJ);


            if(this.body[0].live > 10){
                if (press.pressRight === "ArrowRight") {
                    if (press.pressUp === "ArrowUp") {
                        this.setVelosity(this.velocity, -this.gravity);
                    } else if (press.pressDown === "ArrowDown") {
                        this.setVelosity(this.velocity, this.gravity);
                    } else {
                        this.setVelosity(this.velocity, 0);
                    }
                } else if (press.pressLeft === "ArrowLeft") {
                    if (press.pressUp === "ArrowUp") {
                        this.setVelosity(-this.velocity, -this.gravity);
                    } else if (press.pressDown === "ArrowDown") {
                        this.setVelosity(-this.velocity, this.gravity);
                    } else {
                        this.setVelosity(-this.velocity, 0);
                    }
                } else if (press.pressUp === "ArrowUp") {
                    this.setVelosity(0, -this.gravity);
                } else if (press.pressDown === "ArrowDown") {
                    this.setVelosity(0, this.gravity);
                } else {
                    this.setVelosity(0, 0);
                }

                if (p5.mouseIsPressed === true) {
                    if (Math.sign(this.joystick.xPos) === -1) {
                        this.direction = 1;
                    }else {
                        this.direction = 2;
                    }

                    this.joystick.yPosJ = p5.mouseY;
                    this.joystick.xPosJ = p5.mouseX;

                    this.setVelosity(p5.constrain(this.joystick.xPos, -this.percent(this.speed / 2),this.percent(this.speed / 2)) , p5.constrain(this.joystick.yPos, -this.percent(this.speed / 2),this.percent(this.speed / 2)))

                }
            }else {
                this.setVelosity(0,1);
            }





            if (press.pressRight === "ArrowRight") {
                this.direction = 2;
            }

            if (press.pressLeft === "ArrowLeft") {
                this.direction = 1;
            }


            if (this.direction === 0) {
                this.spriteAnimate(p5, this.animateFice, this.width, this.height);
            } else if (this.direction === 1 && this.getVelocity()[0].x === 0) {
                this.spriteAnimate(p5, this.animateFiceLeft, this.width, this.height);
            } else if (this.getVelocity()[0].x < 0) {
                this.spriteAnimate(p5, this.animateleft, this.width, this.height);
            } else if (this.direction === 2 && this.getVelocity()[0].x === 0) {
                this.spriteAnimate(p5, this.animateFiceRight, this.width, this.height);
            } else if (this.getVelocity()[0].x > 0) {
                this.spriteAnimate(p5, this.animateRight, this.width, this.height);
            }
           // this.body2.map((b, i) => {
                //    p5.rect(b.position.x,b.position.y,b.width,b.height)
             //   }
           // )

            this.body.map((b, i) => {
                    b.level = this.level;
                }
            )
        }


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
