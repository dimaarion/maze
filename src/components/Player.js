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
    height = 0;
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
    
    rotate = 0;
    header;
    header2;
    gravity = 0.8;
    velocity = 0.5;
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

    elapsedSeconds = 0;
    elapsedMinutes = 0;
    colideMoney = false;
    animateFiceLeft = new Animate();
    animateleft = new Animate();
    animateRight = new Animate();
    animateJampLeft = new Animate(["./img/player/jampL.png"],21);
    animateJampRight = new Animate(["./img/player/jampR.png","./img/player/jampR.png"],21);
    animateJampLeftK = new Animate(["./img/player/jampLk.png"],11);
    animateFiceRight = new Animate();
    animateFice = new Animate();
    animateLadder = new Animate();
    animateLadderStatic = new Animate();

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.static = false;
        this.sizeImage = { width: 150, height: 150 };
        this.speedAn = 2;

    }



    loadImg(p5) {
        this.animateJampLeft.loadImg(p5);
        this.animateJampRight.loadImg(p5);
        this.animateJampLeftK.loadImg(p5);
        this.animateLadderStatic.animateLoad(p5, "./img/player/ladderStatic2.png");
        this.animateleft.animateLoad(p5, "./img/player/runL.png", 24);
        this.animateRight.animateLoad(p5, "./img/player/run.png", 24);
        this.animateFiceLeft.animateLoad(p5, "./img/player/stopLeft.png",26);
        this.animateFiceRight.animateLoad(p5, "./img/player/ficeRight.png",25);
        this.animateFice.animateLoad(p5, "./img/player/fice.png");
        this.animateLadder.animateLoad(p5, "./img/player/ladder.png", 54);
    }


    setup(world, scena) {
       // this.fric = 1;
        this.createEllipse(world, scena);
        this.animateJampLeft.format = "one";
        this.animateJampRight.format = "one";
        this.animateJampLeftK.format = "one"
        this.animateJampRight.rate = 2;
        this.animateJampLeft.rate = 2;
        this.animateJampLeft.setupAnimate();
        this.animateJampLeftK.setupAnimate();
        this.animateJampRight.setupAnimate();
        this.animateleft.setupAnimate();
        this.animateFiceLeft.setupAnimate();
        this.animateFiceRight.setupAnimate();
        this.animateRight.setupAnimate();
        this.animateLadder.setupAnimate();
        this.body.map((b) => {
            return b.level = this.level;
        })
        this.gravity = scena.procentXY(this.gravity);
        this.velocity = scena.procentXY(this.velocity);
        // this.gravity = scena.size(this.gravity, scena.scale);
        // this.velocity = scena.size(this.velocity, scena.scale);
        //this.spriteAnimate("playerLeft", 24);
        // this.spriteAnimate("player", 1, 1)
        
    }







    draw(p5, world, press) {
        if (Array.isArray(this.body)) {

            //  this.translate(world);
            this.setRotate(0);

            //this.viewRect(p5)



            //  this.spriteAnimate("player", 1, 1)

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


            
              // console.log(this.getTypeAll(world,"level_" + this.level)) 
             //  console.log(this.getTypeAll(world,"key"))
            




            if (press.pressRight === "ArrowRight" && this.collidePlatform === true) {
             
                if(press.pressUp === "ArrowUp"){
                    this.setVelosity(this.velocity, -this.gravity);
                    if(this.collidePlatform === true){
                        this.animateJampLeft.count = 0;
                        this.animateJampRight.count = 0;
                     }
                }else{
                    this.setVelosity(this.velocity, 0);
                }
                
                // this.direction = 2;
            }else if (press.pressLeft === "ArrowLeft" && this.collidePlatform === true) {
                if(press.pressUp === "ArrowUp"){
                    this.setVelosity(-this.velocity, -this.gravity);
                    if(this.collidePlatform === true){
                        this.animateJampLeft.count = 0;
                        this.animateJampRight.count = 0;
                     }
                }else{
                    this.setVelosity(-this.velocity, 0);
                }
               
                // this.direction = 1;
            }else if (press.pressUp === "ArrowUp" && this.collidePlatform === true) { 
                 this.setVelosity(0, -this.gravity);
               
                 if(this.collidePlatform === true){
                    this.animateJampLeft.count = 0;
                    this.animateJampRight.count = 0;
                 }
                   //  this.direction = 3;
            }else if(press.pressUp === "ArrowUp" && this.collidePlatform !== true){
                
            }else if(press.pressLeft === "ArrowLeft" && this.collidePlatform !== true){
                
            }else if(press.pressRight === "ArrowRight" && this.collidePlatform !== true){
                
            }else if(press.pressUp === 0 && press.pressRight === 0 && press.pressLeft === 0 && this.collidePlatform !== true){
                
            }else{
                this.setVelosity(0, 0);
            }
            
           

            if (press.pressRight === "ArrowRight") {
                this.direction = 2;
            }

            if (press.pressLeft === "ArrowLeft") {
                this.direction = 1;
            }






            if (this.direction === 0) {
                this.spriteAnimate(p5, this.animateFice, this.width, this.height);
            }else if (this.direction === 1 && press.pressLeft === 0 && press.pressUp === 0 && this.collidePlatform === true ) {
                this.spriteAnimate(p5, this.animateFiceLeft, this.width, this.height);
            }else if (this.direction === 1 && press.pressLeft === 0 && press.pressUp === "ArrowUp" && this.collidePlatform !== true ) {
                this.spriteAnimate(p5, this.animateJampLeft, this.width, this.height);
            }else if (press.pressLeft === "ArrowLeft" && press.pressUp === 0 && this.collidePlatform === true) {
                this.spriteAnimate(p5, this.animateleft, this.width, this.height);
            }else if(this.direction === 1  && this.collidePlatform !== true){
                this.spriteAnimate(p5, this.animateJampLeft, this.width, this.height);
            }else if (this.direction === 2 && press.pressRight === 0 && press.pressUp === 0 && this.collidePlatform === true ) {
                this.spriteAnimate(p5, this.animateFiceRight, this.width, this.height);
            }else if (this.direction === 2 && press.pressRight === 0 && press.pressUp === "ArrowUp" && this.collidePlatform !== true ) {
                this.spriteAnimate(p5, this.animateJampRight, this.width, this.height);
            }else if (press.pressRight === "ArrowRight" && press.pressUp === 0 && this.collidePlatform === true) {
                this.spriteAnimate(p5, this.animateRight, this.width, this.height);
            }else if(this.direction === 2  && this.collidePlatform !== true){
                this.spriteAnimate(p5, this.animateJampRight, this.width, this.height);
            } 
       
        
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
