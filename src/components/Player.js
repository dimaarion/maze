import Matter from "matter-js";
import Body from "./Body";
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
    gravity = 0.06;
    rotate = 0;
    header;
    header2;
    velocity = 10;
    atanImg;
    atanIcon;
    money;
    active = 0;
    //timer = new Panel();
    elapsedSeconds = 0;
    elapsedMinutes = 0;


    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.static = false;
        this.sizeImage = { width: 500, height: 500 };
        //  this.imgArr = ["./img/money/1.png","./img/money/50.png"];
        this.image = "./img/player/ball.png";
    }

    setup(world, scena) {
        this.createEllipse(world, scena);
    }


    draw(world) {
        this.translate(world);
      //  this.spriteAnimate("./img/money/", 63);
    }
    translate(world) {
        let bodies = world.bodies;
        bodies.map((el) => Matter.Body.translate(el, {
            x: -this.body[0].position.x + (window.innerWidth / 2 - this.body[0].width / 2),
            y: -this.body[0].position.y + window.innerHeight / 2
        }))

    }
}
