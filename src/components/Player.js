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
    //timer = new Panel();
    elapsedSeconds = 0;
    elapsedMinutes = 0;
    colideMoney = false;
    animateFice = new Animate();


    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.static = false;
        this.sizeImage = { width: 150, height: 150 };
        this.speedAn = 0.5;
        //  this.imgArr = ["./img/money/1.png","./img/money/50.png"];
        //   this.image = "./img/player/playerFace.png";
    }



    loadImg(p5) {
        this.animateFice.animateLoad(p5, "./img/player/1.png");
    }


    setup(world, scena) {
        this.fric = 1;
        this.createRect(world, scena);
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
            this.translate(world);
            this.setRotate(0);

            this.body.map((b) => {
               return p5.image(this.animateFice.sprite(p5), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
            })




            let animations = 0;

            //  this.spriteAnimate("player", 1, 1)
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
            this.body.map((b, i) => {
                if (this.getVelocity()[i].x > 3 && this.getVelocity()[i].y == 0) {
                    //   this.spriteAnimate("playerRight", 24,3);
                }
                if (this.getVelocity()[i].x < -3 && this.getVelocity()[i].y == 0) {
                    // this.spriteAnimate("playerLeft", 24);
                }
                if (this.getVelocity()[i].x < -3 && this.getVelocity()[i].y > 0) {
                    // this.spriteAnimate("playerLeft", 24);
                }//

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
