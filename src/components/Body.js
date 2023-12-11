import Matter from "matter-js";
import Animate from "./Animate";

export default class Body {

    name;
    world;
    getObj;
    body;
    static = true;
    sensor = false;
    slope = 0.9;
    hit = false;
    n = 0;
    scena;
    image = "";
    fric = 0.1;
    count = 0;
    rest = 0.2;
    levelCount = 0;
    sizeImage = {width: 0, height: 0};
    frame = 0;
    speedAn = 0.4;
    imgArr = [];
    frameSpeed = 10;
    colide = false;
    live = 100;
    img = "";
    attack = 0.1;
    direction = 0;
    animate = new Animate();
    sensors;
    attackBody;
    sensorSize = 3;
    press = 0;
    compound;
    speedMonster = 0.1;
    speedLive = 0;
    bodies = [];
    countAttack = -1;

    constructor(name, imgArr = [], frame = 0) {
        this.name = name;
        this.imgArr = imgArr;
        this.frame = frame;
        this.animate.frame = frame

    }


    preloadImage(p5) {

        if (this.imgArr.length > 0) {
            if (this.frame > 0) {
                this.animate.animated = true;
            }
            this.animate.loadImg(p5, this.imgArr);
        }
        this.speedMonster = this.percent(this.speedMonster / 2);
        this.speedMonster = this.percent(this.speedMonster / 2);
        this.attack = this.percent(this.attack / 2);
    }

    percent(n) {
        return (window.innerWidth / 2 + window.innerHeight / 2) * n / 100;
    }

    percentX(n) {
        return window.innerWidth * n / 100;
    }

    percentY(n) {
        return window.innerHeight * n / 100;
    }

    translates(p5) {
        if (this.world !== undefined) {
            this.body.map((b) =>
                p5.translate(
                    -b.position.x + (p5.windowWidth / 2 - b.width / 2),
                    -b.position.y + p5.windowHeight / 2
                )
            );
        }
    }


    spriteAnimate(p5, img, w = 0, h = 0) {
        try {
            w = this.scena.size(w, this.scena.scale);
            h = this.scena.size(h, this.scena.scale);
            this.body.filter((f) => f.remove === false).map((b, i) => img.spriteView(p5, (b.position.x - b.width / 2) - w / 2, (b.position.y - b.height / 2) - h / 2, b.width + w, b.height + h));

        } catch (error) {

        }
    }

    spriteAnimateArr(p5, w = 0, h = 0) {
        try {
            w = this.scena.size(w, this.scena.scale);
            h = this.scena.size(h, this.scena.scale);

            this.body.filter((f) => f.remove === false).forEach((b, i) => p5.image(this.animate.spriteArr(p5), (b.position.x - b.width / 2) - w / 2, (b.position.y - b.height / 2) - h / 2, b.width + w, b.height + h));

        } catch (error) {

        }
    }


    collides(world, name, n = 0) {
        if (world !== undefined) {
            let c = false;
           world.bodies.filter((el) => el.label === name || el.typeObject === name).forEach((b) => {
                let colige = Matter.Collision.collides(this.body[n], b);
                if (colige !== null) {
                    if (colige.collided) {
                        c = true;
                    }

                } else {

                }


            });
            return c;
        }

    }

    paramsBody(scena, b) {
        return {
            width: scena.size(b.width, scena.scale),
            height: scena.size(b.height, scena.scale),
            label: this.name,
            isStatic: this.static,
            isSensor: this.sensor,
            restitution: this.rest,
            friction: this.fric,
            typeObject: b.type,
            speedBodyDop: 0,
            level: 1,
            display: "start",
            activeB: 0,
            money: 0,
            countImg:0,
            collision: false,
            live: this.live,
            speedLive:this.speedLive,
            attack: this.attack,
            rotation: b.rotation,
            sprite: this.image,
            remove: false,
            startX: scena.size(b.x, scena.scale),
            startY: scena.size(b.y, scena.scale)

        }
    }


    createRect(world, scena) {
        this.world = world;
        this.scena = scena;
        this.animate.setupAnimate();
        if (scena.getObjects(this.name)) {
            this.getObj = scena.getObjects(this.name);
            this.body = this.getObj.map((b) =>
                Matter.Bodies.rectangle(
                    scena.size(b.x + b.width / 2, scena.scale),
                    scena.size(b.y + b.height / 2, scena.scale),
                    scena.size(b.width, scena.scale),
                    scena.size(b.height, scena.scale),
                    this.paramsBody(scena, b)
                )
            );
            //this.sensors = this.getObj.map((b) => this.createSensor(b,scena));
        }

        Matter.World.add(this.world, this.body);
        //  Matter.World.add(this.world, this.sensors);
    }

    createBody(b, scena) {
        return Matter.Bodies.circle(
            scena.size(b.x + b.width / 2, scena.scale),
            scena.size(b.y + b.height / 2, scena.scale),
            scena.size(b.width / 2, scena.scale),
            this.paramsBody(scena, b)
        )
    }

    createPlayer(world, scena, n = 0) {
        this.scena = scena;
        this.world = world;
        this.animate.setupAnimate()
        if (scena.getObjects(this.name)) {
            this.getObj = scena.getObjects(this.name);
            this.body = this.getObj.filter((f, i) => i === n).map((b) => this.createBody(b, scena));
        }

        Matter.World.add(this.world, this.body);
    }

    createSensor() {
        this.sensors = this.body.map((b) => {
                let body2 = Matter.Bodies.circle(
                    b.position.x,
                    b.position.y,
                    b.width * this.sensorSize,
                    {
                        width: b.width * this.sensorSize,
                        height: b.height * this.sensorSize,
                        isSensor: true,
                        label: this.name + "_sensor",
                        typeObject: "sensor",
                        collision: false,
                        startX: b.startX,
                        startY: b.startY,
                        remove:b.remove
                    }
                )

                return body2;
            }
        )

        Matter.World.add(this.world, this.sensors);
    }

    createAttack() {
        let bodies = [];
        this.countAttack++
        this.attackBody = this.body.map((b) => {
              let bd = Matter.Bodies.circle(
                    b.position.x,
                    b.position.y,
                    b.width / 5,
                    {
                        width: b.width / 5,
                        height: b.height / 5,
                        isSensor: true,
                        label: this.name + "_attack",
                        typeObject: "attack",
                        collision: false,
                        startX: b.startX,
                        startY: b.startY,
                        remove:false,
                        attack:b.attack
                    }
                )
this.bodies.push(bd);
return bd;
            }
        )

        Matter.World.add(this.world, this.attackBody);


            if(this.direction === 0 || this.direction === 1){
                Matter.Body.setVelocity(this.attackBody[0],{x:-10,y:0})
            }else {
                Matter.Body.setVelocity(this.attackBody[0],{x:10,y:0})
            }
        if(this.countAttack > 1){
         //   Matter.Composite.remove(this.world,this.attackBody[this.countAttack - 1])
          //  this.attackBody[this.countAttack - 1].remove = true
        }

    }

    createEllipse(world, scena) {
        this.scena = scena;
        this.world = world;
        if (scena.getObjects(this.name)) {
            this.getObj = scena.getObjects(this.name);
            this.body = this.getObj.map((b) => this.createBody(b, scena));
        }

        Matter.World.add(this.world, this.body);


    }

    setRotate(n) {
        if (this.world !== undefined) {
            this.world.bodies
                .filter((f) => f.label === this.name)
                .map((b) => Matter.Body.setAngularVelocity(b, n));
        }
    }

    setMass(n) {
        if (this.world !== undefined) {
            this.world.bodies
                .filter((f) => f.label === this.name)
                .map((b) => Matter.Body.setMass(b, n));
        }
    }

    setVelosity(x, y) {
        this.body.map((b) => Matter.Body.setVelocity(b, {x: x, y: y}));
    }

    setPosition(x, y) {
        if (this.world !== undefined) {
            this.world.bodies
                .filter((f) => f.label === this.name)
                .map((b) => Matter.Body.setPosition(b, {x: x, y: y}));
        }
    }

    getAngularSpeed() {
        if (this.world !== undefined) {
            return this.world.bodies
                .filter((f) => f.label === this.name)
                .map((b) => Matter.Body.getAngularSpeed(b));
        }
    }

    getSpeed() {
        if (this.world !== undefined) {
            return this.world.bodies
                .filter((f) => f.label === this.name)
                .map((b) => Matter.Body.getSpeed(b));
        }
    }


    getVelocity() {
        if (this.world !== undefined) {
            return this.world.bodies
                .filter((f) => f.label === this.name)
                .map((b) => Matter.Body.getVelocity(b));
        }
    }

    getAngularVelocity() {
        if (this.world !== undefined) {
            return this.world.bodies
                .filter((f) => f.label === this.name)
                .map((b) => Matter.Body.getAngularVelocity(b));
        }
    }

    getTypeObject(name, n = 0) {
        return this.body.filter((f) => f.typeObject === name)[n];
    }

    getTypeObjectAll(name) {
        return this.body.filter((f) => f.typeObject === name);
    }

    getType(world, name, n = 0) {
        return world.bodies.filter((f) => f.typeObject === name)[n];
    }

    getTypeAll(world, name) {
        return world.bodies.filter((f) => f.typeObject === name);
    }

    getName(world, name) {
        return world.bodies.filter((f) => f.label === name);
    }

    getNameType(world, name, type) {
        return world.bodies
            .filter((f) => f.label === name)
            .filter((f) => f.typeObject === type)[0];
    }

    viewRect(p5) {
        if (this.world !== undefined) {
            p5.rectMode(p5.CENTER);
            this.world.bodies
                .filter((f) => f.label === this.name)
                .map((b) => p5.rect(b.position.x, b.position.y, b.width, b.height));
        }
    }

    sprite(p5,n = 0) {
        if (this.world !== undefined) {
            p5.rectMode(p5.CENTER);
            if(this.image){
                this.body.filter((f) => f.remove === false).map((b) => p5.image(this.image, b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height));
            }else if(Array.isArray(this.animate.img) && this.frame === 0){
                this.body.filter((f) => f.remove === false).map((b) => p5.image(this.animate.spriteArr(p5,b.countImg), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height));
            }

        }
    }

    movementUpDown(p5) {
        this.body.filter((f)=>f.remove === false).forEach((b, i) => {
            let count = 0;
            if (this.scena.size(this.getSpeed()[i],this.scena.scale) < 0.5) {
                count = p5.random(1, 3);
                count = p5.floor(count)
            }
            if (b.live > 10) {
                if (count === 1) {
                    Matter.Body.setVelocity(b, {x: 0, y: -this.speedMonster})
                } else if (count === 2) {
                    Matter.Body.setVelocity(b, {x: 0, y: this.speedMonster})
                }
            }

        })
    }


    movementLeftRight(p5) {

        this.body.filter((f)=>f.remove === false).forEach((b, i) => {
            let count = 0;
            if (this.scena.size(this.getSpeed()[i],this.scena.scale) < 0.5) {
                count = p5.random(1, 3);
                count = p5.floor(count)
            }
                if (count === 1) {
                    Matter.Body.setVelocity(b, {x: -this.speedMonster, y: 0})
                } else if (count === 2) {
                    Matter.Body.setVelocity(b, {x: this.speedMonster, y: 0})
                }




        })

    }

    viewAttacks(p5, n1, n2){
        this.body.filter((f)=>f.remove === false).forEach((b, i) => {
        if (Matter.Body.getVelocity(b).x > 0) {
            if (b.collision) {
                p5.image(this.animate.spriteArr(p5, n1), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
            } else {
                p5.image(this.animate.spriteArr(p5, 1), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
            }

        } else {
            if (b.collision) {
                p5.image(this.animate.spriteArr(p5, n2), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
            } else {
                p5.image(this.animate.spriteArr(p5, 0), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
            }

        }
        })
    }

    activeImage(p5, n1, n2) {
        if (this.collides(this.world, "alive")) {
            this.body.forEach((b) => {
                if (Matter.Body.getVelocity(b).x >= 0) {

                } else {

                }
            })
        }

    }

    viewXp(p5) {
        // p5.rectMode(p5.CORNER)
        if (this.body) {
            this.body.filter((f)=>f.remove === false).forEach((el, i) => {
                if (this.sensors) {
                    //  Matter.Body.setPosition(this.sensors[i],{x:el.position.x + 10 ,y:el.position.y });
                    // el.collision = this.sensors[i].collision;
                    if (el.collision) {
                        //  p5.fill("red");
                    } else {
                        //  p5.fill("blue");
                    }
                    // p5.ellipse(this.sensors[i].position.x,this.sensors[i].position.y,this.sensors[i].width,this.sensors[i].height);
                }
                if (el.label !== "player") {
                    p5.push();
                    p5.fill("red")
                    p5.rect(el.position.x, el.position.y - this.scena.size(10,this.scena.scale),this.scena.size(el.live / 5,this.scena.scale), this.scena.size(2,this.scena.scale));
                 //   p5.textSize(32);
                  //  p5.text(el.collision, el.position.x, el.position.y);
                    p5.pop();
                }
                if (el.label === "player") {
                if (el.live < this.live) {
                    el.live += this.scena.size(el.speedLive,this.scena.scale)
                }
                }

            });
            if (this.sensors) {
                this.sensors.filter((f)=>f.remove === false).forEach((b,i) => {
                    Matter.Body.setPosition(b, {x: this.body[i].position.x, y: this.body[i].position.y});
                });
                this.sensors.forEach((b, i) => {
                     //   p5.ellipse(b.position.x , b.position.y, b.width, b.height);
                    }
                )
            }
            if (this.attackBody) {
                this.attackBody.filter((f)=>f.remove === false).forEach((b,i) => {
                    if(this.press.attack === 0){
                        if(this.direction === 0 || this.direction === 1){
                            Matter.Body.setPosition(b, {x: this.body[i].position.x - this.scena.size(7,this.scena.scale), y: this.body[i].position.y + this.scena.size(2,this.scena.scale)});
                        }else{
                            Matter.Body.setPosition(b, {x: this.body[i].position.x + this.scena.size(7,this.scena.scale), y: this.body[i].position.y + this.scena.size(2,this.scena.scale)});
                        }
                        }else {
                      //  Matter.Body.setVelocity(b,{x:-10,y:0})
                    }

                });
                this.attackBody.filter((f)=>f.remove === false).forEach((b, i) => {
                    p5.push()
                    p5.fill("green");
                    p5.noStroke();
                    if(this.direction === 0 || this.direction === 1){
                          p5.ellipse(b.position.x - this.scena.size(7,this.scena.scale), b.position.y + this.scena.size(2,this.scena.scale), b.width, b.height);
                    }else{
                          p5.ellipse(b.position.x + this.scena.size(7,this.scena.scale), b.position.y + this.scena.size(2,this.scena.scale), b.width, b.height);
                    }

                    p5.pop()
                    }
                )
            }

        }


    }

    collidePointRect(pointX, pointY, x, y, xW, yW) {
        x = x - xW / 2;
        y = y - yW / 2;
        if (
            pointX >= x && // right of the left edge AND
            pointX <= x + xW && // left of the right edge AND
            pointY >= y && // below the top AND
            pointY <= y + yW
        ) {
            // above the bottom

            return true;
        }
        return false;

    };


    collidePointCircle = function (p5, x, y, cx, cy, d) {
//2d

        if (p5.dist(x, y, cx, cy) <= d / 2) {
            return true;
        }
        return false;
    };

}