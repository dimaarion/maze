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
  n = 0;
  scena;
  image = "";
  fric = 0.1;
  count = 0;
  rest = 0.2;
  levelCount = 0;
  sizeImage = { width: 0, height: 0 };
  frame = 0;
  speedAn = 0.4;
  imgArr = [];
  frameSpeed = 10;
  colide = false;
  img;
  animate = new Animate();
  constructor(name, img = "", imgArr = []) {
    this.img = img;
    this.name = name;
    this.imgArr = imgArr;
  }


  preloadImage(p5) {

    this.image = p5.loadImage(this.img);
    this.animate.animateLoad(p5, this.img, this.frame);
    if (this.imgArr.length > 0) {
      this.imgArr = this.imgArr.map((img) => p5.loadImage(img));
    }


  }


  translates(p5) {
    if (this.world !== undefined) {
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) =>
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




  collides(world, name, n = 0) {
    if (world !== undefined) {
      let c = false;
      let b = world.bodies.filter((el) => el.label === name || el.typeObject === name).map((b) => {
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

  createRect(world, scena) {
    this.world = world;
    this.scena = scena;
    this.animate.setupAnimate()
    if (scena.getObjects(this.name)) {
      this.getObj = scena.getObjects(this.name);
      this.body = this.getObj.map((b) =>
        Matter.Bodies.rectangle(
          scena.size(b.x + b.width / 2, scena.scale),
          scena.size(b.y + b.height / 2, scena.scale),
          scena.size(b.width, scena.scale),
          scena.size(b.height, scena.scale),
          {
            width: scena.size(b.width, scena.scale),
            height: scena.size(b.height, scena.scale),
            label: this.name,
            isStatic: this.static,
            isSensor: this.sensor,
            restitution: this.rest,
            friction: this.fric,
            typeObject: b.type,
            speedBodyDop: 0,
            level: scena.level,
            display: "start",
            activeB: 0,
            money: 0,
            rotation: b.rotation,
            sprite: this.image,
            remove: false
          }
        )
      );
    }

    Matter.World.add(this.world, this.body);
  }


  createEllipse(world, scena) {
    this.scena = scena;
    this.world = world;
    this.animate.setupAnimate()
    if (scena.getObjects(this.name)) {
      this.getObj = scena.getObjects(this.name);
      this.body = this.getObj.map((b) =>
        Matter.Bodies.circle(
          scena.size(b.x + b.width / 2, scena.scale),
          scena.size(b.y + b.height / 2, scena.scale),
          scena.size(b.width / 2, scena.scale),
          {
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
            rotation: b.rotation,
            sprite: this.image,
            remove: false

          }
        )
      );
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
    if (this.world !== undefined) {
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) => Matter.Body.setVelocity(b, { x: x, y: y }));
    }
  }
  setPosition(x, y) {
    if (this.world !== undefined) {
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) => Matter.Body.setPosition(b, { x: x, y: y }));
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
  sprite(p5) {
    if (this.world !== undefined) {
      p5.rectMode(p5.CENTER);
      this.body.filter((f) => f.remove === false).map((b) => p5.image(this.image, b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height));
    }
  }



}