import Matter from "matter-js";
import Animate from "./Animate";
import Bubble from "./Bubble";
import Timer from "./Timer";
import Action from "./Action";

export default class Body {
    p5;
    name;
    world;
    getObj;
    body;
    static = false;
    sensor = false;
    slope = 0.9;
    hit = false;
    n = 0;
    scena;
    image = "";
    fric = 0.1;
    frictionAir = 0.1;
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
    rate = 2;
    sensors;
    attackBody;
    sensorSize = 3;
    press = 0;
    compound;
    speedMonster = 0.2;
    speedLive = 0;
    bodies = [];
    countAttack = -1;
    bubble = new Bubble();
    action = new Action();
    rotating = false;
    gravityStab = 0;
    simpleTimer;
    elapsedSeconds = 0;
    timerActive = 20;
    food;

    constructor(name, imgArr = [], frame = 0, rate = 2) {
        this.name = name;
        this.imgArr = imgArr;
        this.frame = frame;
        this.animate.frame = frame;
        this.rate = rate;
        this.animate.rate = rate;

    }


    preloadImage(p5) {

        if (Array.isArray(this.imgArr)) {
            if (this.frame > 0) {
                this.animate.animated = true;
            }
            this.animate.loadImg(p5, this.imgArr);
        }
        this.speedMonster = this.percent(this.speedMonster / 2);
        this.gravityStab = this.percent(this.gravityStab / 2);
        this.attack = this.percent(this.attack / 2);
    }

    setupSprite(p5) {
        this.p5 = p5;
        this.createTimer(p5, 1000);
        this.animate.setupAnimate();
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

    percentSceneX(n) {
        return this.scena.scenaWidth * n / 100;
    }

    percentSceneY(n) {
        return this.scena.scenaHeigiht * n / 100;
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
            this.body.filter((f) => f.remove === false && f.label === this.name).forEach((b, i) => {
                p5.push();
                p5.translate(b.position.x, b.position.y);
                if (this.rotating && b.collision) {
                    b.rotation = -p5.atan2(b.vX, b.vY);
                }

                b.angle = b.rotation;
                p5.rotate(b.rotation);
                p5.image(this.animate.spriteArr(p5, b.countImg), (-b.width / 2) - w / 2, (-b.height / 2) - h / 2, b.width + w, b.height + h);
                p5.pop();
            });
            this.updateTimer();
        } catch (error) {

        }
    }

    spriteAnimateArrIn(p5, b, n = 0, w = 0, h = 0) {
        try {
            w = this.scena.size(w, this.scena.scale);
            h = this.scena.size(h, this.scena.scale);

            p5.image(this.animate.spriteArr(p5, n), (b.position.x - b.width / 2) - w / 2, (b.position.y - b.height / 2) - h / 2, b.width + w, b.height + h);

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
            frictionAir: this.frictionAir,
            typeObject: b.type,
            speedBodyDop: 0,
            level: scena.level,
            display: "start",
            activeB: 0,
            money: 0,
            countImg: 0,
            direction: 0,
            vX: 0,
            vY: 0,
            defaultPosition: {x: scena.size(b.x, scena.scale), y: scena.size(b.y, scena.scale)},
            collision: false,
            live: this.live,
            speedLive: this.speedLive,
            speedBody: this.speedMonster,
            attack: this.attack,
            attackActive: false,
            rotation: b.rotation,
            sprite: this.image,
            remove: false,
            startX: scena.size(b.x, scena.scale),
            startY: scena.size(b.y, scena.scale)

        }
    }

    createTimer(p5, duration, start = false) {
        this.simpleTimer = new Timer(p5, duration, start);
        this.simpleTimer.start();
    }

    restartTimer(n = 59) {
        if (this.elapsedSeconds > n) {
            this.elapsedSeconds = 1
        }
    }


    updateTimer() {
        if (this.simpleTimer.expired()) {
            this.elapsedSeconds++;
            this.simpleTimer.start();
        }
    }


    createRect(world, scena) {
        this.world = world;
        this.scena = scena;
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


    createFood(type = "", world, scena, obj, n = 5, r = 5) {
        let a = this.action.arrayCount(n);

        this.food = a.map((b) => Matter.Bodies.circle(
            this.p5.random(obj.body[this.p5.floor(this.p5.random(0, obj.body.length - 1))].position.x, obj.body[obj.body.length - 1].position.x),
            this.p5.random(obj.body[this.p5.floor(this.p5.random(0, obj.body.length - 1))].position.y, obj.body[obj.body.length - 1].position.y),
            scena.size(r, scena.scale),
            {
                width: scena.size(r, scena.scale),
                label: this.name,
                level: scena.level,
                typeObject: type,
                collision: false,
                remove: false
            }
        ))
        Matter.World.add(world, this.food);
    }


    foodView() {
        if(Array.isArray(this.food)){
            this.food.filter((f) => f.remove === false).forEach((b) => {
                this.p5.image(this.animate.sprite(this.p5), b.position.x - b.width / 2, b.position.y - b.width / 2, b.width * 2, b.width * 2)
            })
        }

    }

    createBubble(p5, n) {
        this.body.forEach((b, i) => {
            this.bubble.parametr = 1;
            this.bubble.x[i] = b.position.x;
            this.bubble.y[i] = b.position.y;
            this.bubble.xs[i] = b.position.x;
            this.bubble.ys[i] = b.position.y;
            this.bubble.bubbleNum = n;
            this.bubble.setup(p5, this.scena, i);
        })
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
                        level: this.scena.level,
                        typeObject: "sensor",
                        collision: false,
                        startX: b.startX,
                        startY: b.startY,
                        remove: b.remove
                    }
                )

                return body2;
            }
        )

        Matter.World.add(this.world, this.sensors);
    }

    createAttack(n, x = 0, w = 2) {

        let a = [];
        for (let i = 0; i < n; i++) {
            a[i] = i;
        }
        this.countAttack++
        this.attackBody = this.body.map((b) => {
                let bd = a.map((el) => Matter.Bodies.rectangle(
                    b.position.x,
                    b.position.y,
                    b.width * w,
                    b.height * w,
                    {
                        width: b.width * w,
                        height: b.height * w,
                        isSensor: true,
                        isStatic: false,
                        label: this.name + "_attack",
                        typeObject: "attack",
                        collision: false,
                        level: this.scena.level,
                        startX: b.startX,
                        startY: b.startY,
                        remove: false,
                        attack: b.attack
                    }
                ))
                this.bodies.push(bd);
                return bd;
            }
        )
        if (this.attackBody[0]) {
            Matter.World.add(this.world, this.attackBody[0]);
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


            this.body.forEach((b) => {
                p5.rectMode(p5.CENTER);
                p5.rect(b.position.x, b.position.y, b.width, b.height)
            });

        }
    }

    sprite(p5, n = 0, r = false) {
        if (this.world !== undefined) {
            p5.rectMode(p5.CENTER);

            if (this.image) {
                this.body.filter((f) => f.remove === false).forEach((b) => p5.image(this.image, b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height));
            } else if (Array.isArray(this.animate.img) && this.frame === 0) {
                p5.push();
                p5.angleMode(p5.DEGREES);
                this.body.filter((f) => f.remove === false).forEach((b) => {
                    p5.translate(b.position.x - b.width / 2, b.position.y - b.height / 2);
                    r ? p5.rotate(b.angle) : p5.rotate(b.rotation);
                    p5.image(this.animate.spriteArr(p5, b.countImg), 0, 0, b.width, b.height)
                });
                p5.pop();
            }

        }
    }

    movementUpDown(p5) {
        if (Array.isArray(this.body)) {
            this.body.filter((f) => f.remove === false && f.label === this.name).forEach((b, i) => {
                if (b.direction === 2) {
                    Matter.Body.setVelocity(b, {x: 0, y: this.gravityStab});
                } else if (b.direction === 3) {
                    Matter.Body.setVelocity(b, {x: 0, y: -this.gravityStab});
                } else {
                    Matter.Body.setVelocity(b, {x: 0, y: -this.gravityStab});
                }

            })
        }

    }

    moveView(n1 = 0, n2 = 1, n3 = 2, n4 = 3, n5 = 4) {
        if (Array.isArray(this.body)) {
            this.body.filter((f) => f.remove === false).forEach((b, i) => {
                if (b.direction === 1) {
                    b.countImg = n1;
                } else if (b.direction === 2) {
                    b.countImg = n2;
                } else if (b.direction === 3) {
                    b.countImg = n3;
                } else if (b.direction === 4) {
                    b.countImg = n4;
                }
            })
        }
    }


    movementLeftRight(name, num = 2) {
        function movie(b, s, g) {
            if (b.direction === 0) {
                Matter.Body.setVelocity(b, {x: -s, y: g})
            } else if (b.direction === 1) {
                Matter.Body.setVelocity(b, {x: s, y: g})
            } else {
                Matter.Body.setVelocity(b, {x: -s, y: g})
            }
            if (Matter.Body.getVelocity(b).x > 0) {
                b.countImg = 1;
            } else {
                b.countImg = 0;
            }
        }

        if (Number.isInteger(this.timerActive)) {
            this.restartTimer(this.timerActive)
        }


        if (Array.isArray(this.body)) {
            this.body.filter((f) => f.remove === false).forEach((b, i) => {
                if (b.label !== name) {
                    if (Number.isInteger(this.timerActive) && name === "timer") {
                        if (this.elapsedSeconds < this.timerActive / 2) {
                            movie(b, this.speedMonster, this.gravityStab)
                        } else {
                            b.countImg = num;
                        }
                    } else {
                        movie(b, this.speedMonster, this.gravityStab)
                    }

                }
                if (b.label === name && b.collision === false) {
                    movie(b, this.speedMonster, this.gravityStab)
                }


            })
        }

    }

    gravity() {
        if (Array.isArray(this.body)) {
            this.body.forEach((b, i) => {
                if (b.collision === false) {
                    Matter.Body.setVelocity(b, {x: Matter.Body.getVelocity(b).x, y: this.gravityStab});
                }


            })
        }
    }

    moveUp(name) {
        if (Array.isArray(this.body)) {
            this.body.forEach((b, i) => {
                if (name === "move") {
                    Matter.Body.setVelocity(b, {x: Matter.Body.getVelocity(b).x, y: -this.gravityStab});
                }
                if (name === "bubble") {
                    if (this.collides(this.world, "platform", i)) {
                        Matter.Body.setPosition(b, {x: b.startX + b.width / 2, y: b.startY + b.width / 2})
                    } else {
                        Matter.Body.setVelocity(b, {x: Matter.Body.getVelocity(b).x, y: -this.gravityStab});
                    }

                }
            })
        }

    }


    jamp(p5) {
        this.body.forEach((b) => {
            let count = p5.frameCount % 100
            if (count > 50) {
                Matter.Body.setVelocity(b, {x: 0, y: -this.speedMonster});
            } else {
                Matter.Body.setVelocity(b, {x: 0, y: this.speedMonster * 2});
            }
            //
        })
    }


    movement() {
        if (Array.isArray(this.body)) {
            this.body.filter((f) => f.remove === false).forEach((b, i) => {
                if (!b.collision) {
                    if (b.direction === 0) {
                        Matter.Body.setVelocity(b, {x: -this.speedMonster, y: this.gravityStab})
                    } else if (b.direction === 1) {
                        Matter.Body.setVelocity(b, {x: this.speedMonster, y: this.gravityStab})
                    } else if (b.direction === 2) {
                        Matter.Body.setVelocity(b, {x: 0, y: this.speedMonster})
                    } else if (b.direction === 3) {
                        Matter.Body.setVelocity(b, {x: 0, y: -this.speedMonster})
                    } else {
                        Matter.Body.setVelocity(b, {x: -this.speedMonster, y: this.gravityStab})
                    }
                    if (Matter.Body.getVelocity(b).x > 0 || Matter.Body.getVelocity(b).y > 0) {
                        b.countImg = 1;
                    } else {
                        b.countImg = 0;
                    }
                }


            })
        }

    }

    viewAttacks(n1, n2, n3, n4, n5) {
        if (Array.isArray(this.body)) {
            this.body.filter((f) => f.remove === false).forEach((b, i) => {
                if (Matter.Body.getSpeed(b) > 0.1) {
                    if (Matter.Body.getVelocity(b).x > 0) {
                        if (b.collision) {
                            b.countImg = n1;
                        }
                        if (b.attackActive) {
                            b.countImg = n3;
                        }
                    } else {
                        if (b.collision) {
                            b.countImg = n2;
                        }
                        if (b.attackActive) {
                            b.countImg = n4;
                        }
                    }
                } else {
                    b.countImg = n5;
                }


            })
        }
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

    viewBubble() {
        if (Array.isArray(this.body)) {
            this.body.filter((b) => b.remove === false).forEach((el, i) => {
                this.bubble.view(i);
            })
        }


    }


    viewXp(p5) {
        // p5.rectMode(p5.CORNER)
        if (Array.isArray(this.body)) {
            this.body.filter((f) => f.remove === false).forEach((el, i) => {
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
                    p5.rect(el.position.x, el.position.y - this.scena.size(10, this.scena.scale), this.scena.size(el.live / 5, this.scena.scale), this.scena.size(2, this.scena.scale));
                    //   p5.textSize(32);
                    //  p5.text(el.collision, el.position.x, el.position.y);
                    p5.pop();
                }
                if (el.label === "player") {
                    if (el.live < this.live) {
                        el.live += this.scena.size(el.speedLive, this.scena.scale)
                    }
                }

            });
            if (this.sensors) {
                this.sensors.filter((f) => f.remove === false).forEach((b, i) => {
                    Matter.Body.setPosition(b, {x: this.body[i].position.x, y: this.body[i].position.y});
                });
                this.sensors.forEach((b, i) => {
                        //   p5.ellipse(b.position.x , b.position.y, b.width, b.height);
                    }
                )
            }


        }


    }

    attackBodyView(p5, t = "sensor", x = 0, y = 0, countImg = 0) {
        x = this.percentSceneX(x);
        y = this.percentSceneY(y)

        function movie(b, bd, x, y, img) {
            Matter.Body.setPosition(b, {
                x: bd.position.x + x,
                y: bd.position.y + y
            })
            p5.push()
            p5.fill("Coral");
            p5.noStroke();
            // p5.rect(b.position.x, b.position.y, b.width, b.height);
            p5.image(img.spriteArr(p5, countImg), (bd.position.x + x) - b.width / 2, (bd.position.y + y) - b.height / 2, b.width, b.height)
            p5.pop()
        }

        this.attackBody.forEach((el, i) => {
                el.forEach((b) => {
                    this.body.forEach((bd) => {
                        if (t === "sensor") {
                            if (bd.collision === false) {
                                Matter.Body.setPosition(b, {x: bd.position.x, y: bd.position.y})
                            } else {
                                movie(b, bd, x, y, this.animate);

                            }
                        } else if (t === "timer") {
                            if (this.elapsedSeconds < this.timerActive / 2) {
                                movie(b, bd, x, y, this.animate);
                            }

                        }
                    })
                })

            }
        )

    }

    recoveryLive() {
        if (Array.isArray(this.body)) {
            this.body.filter((f) => f.remove === false && f.label === this.name).forEach((el, i) => {
                if (el.live < this.live) {
                    el.live += this.scena.size(el.speedLive, this.scena.scale);
                }
            })
        }
        if (this.sensors) {
            this.sensors.filter((f) => f.remove === false).forEach((b, i) => {
                Matter.Body.setPosition(b, {x: this.body[i].position.x, y: this.body[i].position.y});
            });
            this.sensors.forEach((b, i) => {
                       this.p5.ellipse(b.position.x , b.position.y, b.width, b.height);
                }
            )
        }
    }

    view() {
        if (Array.isArray(this.body)) {
            this.body.filter((b) => b.remove === false).forEach((el) => {
                if (Matter.Body.getSpeed(el) > 0.1) {
                    el.countImg = 1;
                } else {
                    el.countImg = 0;
                }
            })
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

    setImage(count, n) {
        this.body[n].countImg = count;
    }

}