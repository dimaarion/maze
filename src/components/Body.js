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

    constructor(name) {
        this.name = name;
    }



    spriteAnimate(dir, count) {
        this.frame += this.speedAn;
        for (let i = 1; i < count + 1; i++) {
            this.imgArr[i] = dir + i + ".png";
        }

        if (Array.isArray(this.imgArr)) {
            this.body.map((b) => b.render.sprite.texture = this.imgArr[Math.floor(this.frame) % count + 1]);
        }
    }


    collides(world,name,n = 0) {
        let c = false;
        let b = world.bodies.filter((el) => el.label === name).map((b) => {
            let colige = Matter.Collision.collides(this.body[n], b);
            if (colige !== null) {
                if (colige.collided) {
                  c = true;
                }

            }else{
                
            }

           
        });
        return c;
    }

    createRect(world, scena) {
        this.world = world;
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
                    render: {
                        visible:false,
                        sprite: {
                            texture: this.image,
                            xScale: scena.size(b.width, scena.scale) / this.sizeImage.width,
                            yScale: scena.size(b.height, scena.scale) / this.sizeImage.height
                        }
                    }

                }
            )
        );
        Matter.World.add(this.world, this.body);
    }


    createEllipse(world, scena) {

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
                    render: {
                        sprite: {
                            texture: this.image,
                            xScale: scena.size(b.width, scena.scale) / this.sizeImage.width,
                            yScale: scena.size(b.height, scena.scale) / this.sizeImage.height
                        }
                    }
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
}