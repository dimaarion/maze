import Matter from "matter-js";
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

  constructor(name, img = "") {
    this.img = img;
    this.name = name;
  }


  preloadImage(p5) {

    this.image = p5.loadImage(this.img);


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




  spriteAnimate(p5, img,w = 0,h = 0) {
    w = this.scena.size(w,this.scena.scale);
    h = this.scena.size(h,this.scena.scale);
    this.body.map((b, i) => img.spriteView(p5, b.position.x - b.width / 2, (b.position.y - b.width / 2) - h, b.width + w, b.width + h));
  }


  collides(world, name, n = 0) {
    if (world !== undefined) {
      let c = false;
      let b = world.bodies.filter((el) => el.label === name).map((b) => {
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
          level: 0,
          display: "start",
          activeB: 0,
          money: 0,
          rotation: b.rotation,
          sprite: this.image,
          remove: false
        }
      )
    );
    Matter.World.add(this.world, this.body);
  }


  createEllipse(world, scena) {
    this.scena = scena;
    this.world = world;
    this.getObj = scena.getObjects(this.name);
    this.body = this.getObj.map((b) =>
      Matter.Bodies.circle(
        scena.size(b.x + b.width / 2, scena.scale),
        scena.size(b.y + b.height / 2, scena.scale),
        scena.size(b.width / 2, scena.scale),
        {
          width: scena.size(b.width, scena.scale),
          label: this.name,
          isStatic: this.static,
          isSensor: this.sensor,
          restitution: this.rest,
          friction: this.fric,
          typeObject: b.type,
          speedBodyDop: 0,
          level: 0,
          display: "start",
          activeB: 0,
          money: 0,
          rotation: b.rotation,
          sprite: this.image,
          remove: false

        }
      )
    );
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
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) => p5.image(this.image, b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height));
    }
  }

}