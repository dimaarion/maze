import Matter from "matter-js";
import Body from "./Body";
import Animate from "./Animate";
import Joystick from "./Joystick";
import Database from "./Database";
import Button from "./Button";
export default class Player extends Body {
    body = {};
    body2 = {};
    scena = {};
    images = {};
    img = "";
    m = {};
    x = 100;
    y = 100;
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
    frame = 60;
    rate = 2
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
    db = new Database();
    joystick = new Joystick();
    joystickButton = new Button(50,50,50,50,true,false,false,true);
    attack = 10

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.static = false;
        this.sizeImage = {width: 150, height: 150};
        this.speedAn = 2;
        this.animate.frame = this.db.get().frame ? this.db.get().frame : this.frame;
        this.animate.rate = this.db.get().rate ? this.db.get().rate : this.rate;
        this.imgArr = this.db.get().img;
        this.animate.animated = true;
    }


    loadImg(p5) {


    }


    create(p5) {
        this.joystickButton.create(p5);
    }


    createJoystick(scena) {
        this.body.map((b) => {
            return b.level = this.level;
        })
        this.gravity = this.percent(this.speed / 2);
        this.velocity = this.percent(this.speed / 2);
        this.xJ = this.percentX(80);
        this.yJ = this.percentY(80);
        this.joystick.setup(this.xJ, this.yJ, scena.size(50, scena.scale));
    }

    draw(p5, world, press) {
        if (Array.isArray(this.body)) {
            this.setRotate(0);

            if(this.joystickButton.valueActive){
                this.joystick.createJoystick(p5, this.xJ, this.yJ);
            }

            if (press.pressRight === "ArrowRight") {
                this.direction = 2;
                if (press.pressUp === "ArrowUp") {
                    this.setVelosity(this.velocity, -this.gravity);
                } else if (press.pressDown === "ArrowDown") {
                    this.setVelosity(this.velocity, this.gravity);
                } else {
                    this.setVelosity(this.velocity, 0);
                }
            } else if (press.pressLeft === "ArrowLeft") {
                this.direction = 1;
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
                this.setVelosity(0, this.gravityStab);
            }

            if (p5.touches[0] && this.joystickButton.valueActive) {
                if (p5.touches[0].x > p5.width / 2) {
                    if (Math.sign(this.joystick.xPos) === -1) {
                        this.direction = 1;
                    } else {
                        this.direction = 2;
                    }

                    this.joystick.yPosJ = p5.touches[0].y;
                    this.joystick.xPosJ = p5.touches[0].x;

                    this.setVelosity(p5.constrain(this.joystick.xPos, -this.percent(this.speed / 2), this.percent(this.speed / 2)), p5.constrain(this.joystick.yPos, -this.percent(this.speed / 2), this.percent(this.speed / 2)));
                }

            }
            if (this.body[0].live < 10) {
                this.body.map((b) => this.setPosition(b.startX, b.startY));
            }
            this.body.forEach((b, i) => {
                    b.level = this.level;
                    if (this.direction === 1) {
                        b.countImg = 0;
                        if(Matter.Body.getSpeed(b) > this.velocity / 2){
                            b.countImg = 2;
                        }
                    }else if (this.direction === 2) {
                        b.countImg = 1;
                        if(Matter.Body.getSpeed(b) > this.velocity / 2){
                            b.countImg = 3;
                        }
                    }
                }
            )
        }


    }


}
