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
  sizeImage = { width: 0, height: 0 };
  frame = 0;
  speedAn = 0.4;
  imgArr = [];
  frameSpeed = 10;
  colide = false;
  live = 100;
  img;
  attack = 10;
  direction = 0;
  animate = new Animate();
  sensors;
  sensorSize = 3;
  compound;

  constructor(name, img = "", imgArr = [], frame = 0) {
    this.img = img;
    this.name = name;
    this.imgArr = imgArr;
    this.frame = frame;
  }


  preloadImage(p5) {

    this.image = p5.loadImage(this.img);
    this.animate.animateLoad(p5, this.img, this.frame);
    if (this.imgArr.length > 0) {
      this.animate.loadImg(p5,this.imgArr);
      //this.imgArr = this.imgArr.map((img) => p5.loadImage(img));
    }


  }

  percent(n){
    return (window.innerWidth / 2 + window.innerHeight / 2) * n / 100;
  }

  percentX(n){
    return window.innerWidth * n / 100;
  }
  percentY(n){
    return  window.innerHeight * n / 100;
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

  spriteAnimateArr(p5, w = 0, h = 0) {
    try {
      w = this.scena.size(w, this.scena.scale);
      h = this.scena.size(h, this.scena.scale);

      this.body.filter((f) => f.remove === false).map((b, i) => p5.image(this.animate.spriteArr(p5), (b.position.x - b.width / 2) - w / 2, (b.position.y - b.height / 2) - h / 2, b.width + w, b.height + h));

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

  paramsBody(scena,b){
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
      collision:false,
      live:this.live,
      speedLive:0.1,
      attack:this.attack,
      rotation: b.rotation,
      sprite: this.image,
      remove: false

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
            this.paramsBody(scena,b)
        )
      );
      //this.sensors = this.getObj.map((b) => this.createSensor(b,scena));
    }

    Matter.World.add(this.world, this.body);
  //  Matter.World.add(this.world, this.sensors);
  }

  createBody(b,scena){
   return  Matter.Bodies.circle(
        scena.size(b.x + b.width / 2, scena.scale),
        scena.size(b.y + b.height / 2, scena.scale),
        scena.size(b.width / 2, scena.scale),
       this.paramsBody(scena,b)
    )
  }

  createPlayer(world, scena,n = 0){
    this.scena = scena;
    this.world = world;
    this.animate.setupAnimate()
    if (scena.getObjects(this.name)) {
      this.getObj = scena.getObjects(this.name);
      this.body = this.getObj.filter((f,i)=>i === n).map((b) =>this.createBody(b,scena));
    }

    Matter.World.add(this.world, this.body);
  }

  createSensor(b,scena){
    return  Matter.Bodies.circle(
        0,
        0,
        scena.size(b.width / 2, scena.scale) * this.sensorSize,
        {
          width: scena.size(b.width, scena.scale) * this.sensorSize,
          height: scena.size(b.height, scena.scale) * this.sensorSize,
          isSensor:true,
          isStatic:true,
          label:this.name + "_sensor",
          typeObject:"sensor",
          collision:false
        }
    )
    //Matter.Bodies.rectangle(b.position.x,b.position.y,b.width * this.sensorSize,b.height * (this.sensorSize + 2),{width:b.width * this.sensorSize,height:b.height * this.sensorSize,isSensor:true, label:this.name + "_sensor", typeObject:"sensor",collision:false}));

  }

  createEllipse(world, scena) {
    this.scena = scena;
    this.world = world;
    this.animate.setupAnimate()
    if (scena.getObjects(this.name)) {
      this.getObj = scena.getObjects(this.name);
      this.body = this.getObj.map((b) =>this.createBody(b,scena));
      this.sensors = this.getObj.map((b) =>this.createSensor(b,scena));
    }


    Matter.World.add(this.world, this.body);
    Matter.World.add(this.world, this.sensors);

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
      this.body.map((b) => Matter.Body.setVelocity(b, { x: x, y: y }));
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

  movementUpDown(p5){
    this.body.map((b,i)=>{
      let count = 0;
      if(this.getSpeed()[i] < 1){
        count = p5.random(1,3);
        count = p5.floor(count)
      }
      if(b.live > 10){
        if(count === 1){
          Matter.Body.setVelocity(b,{x:0,y:-5})
        }else if(count === 2){
          Matter.Body.setVelocity(b,{x:0,y:5})
        }
      }else{
        Matter.Body.setVelocity(b,{x:0,y:1})
      }

    })
  }


  movementLeftRight(p5,nameActive,n1,n2){
    this.body.map((b,i)=>{
      let count = 0;
      if(this.getSpeed()[i] < 1){
        count = p5.random(1,3);
        count = p5.floor(count)
      }

      if(b.live > 10){
        if(count === 1){
          Matter.Body.setVelocity(b,{x:-5,y:0})
        }else if(count === 2){
          Matter.Body.setVelocity(b,{x:5,y:0})
        }
      }else{
        Matter.Body.setVelocity(b,{x:0,y:1})
      }
      if(Matter.Body.getVelocity(b).x >= 0){
        if (b.collision){
          p5.image(this.animate.spriteArr(p5, n1), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
        }else {
          p5.image(this.animate.spriteArr(p5,1),b.position.x - b.width / 2,b.position.y - b.height / 2,b.width,b.height)
        }

      }else{
        if (b.collision){
          p5.image(this.animate.spriteArr(p5, n2), b.position.x - b.width / 2, b.position.y - b.height / 2, b.width, b.height)
        }else {
          p5.image(this.animate.spriteArr(p5,0),b.position.x - b.width / 2,b.position.y - b.height / 2,b.width,b.height)
        }

      }
    })

  }

  activeImage(p5,n1,n2){
    if (this.collides(this.world,"alive")){
      this.body.map((b)=> {
        if (Matter.Body.getVelocity(b).x >= 0) {

        } else {

        }
      })
    }

  }

  viewXp(p5){
   // p5.rectMode(p5.CORNER)
 this.body.map((el,i)=> {

   if(this.sensors){
   //  Matter.Body.setPosition(this.sensors[i],{x:el.position.x + 10 ,y:el.position.y });
    // el.collision = this.sensors[i].collision;
     if(el.collision){
     //  p5.fill("red");
     }else {
     //  p5.fill("blue");
     }
    // p5.ellipse(this.sensors[i].position.x,this.sensors[i].position.y,this.sensors[i].width,this.sensors[i].height);
   }
   if(el.label !== "player"){
     p5.push();
     p5.fill("red")
     p5.rect(el.position.x,el.position.y - 50,el.live,5);
     p5.textSize(32);
     p5.text(el.collision,el.position.x,el.position.y);
     p5.pop();
   }
    if(el.live < this.live){
      el.live += el.speedLive;
    }



  });




  }

  sensorRect(world,scene){



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

    if( p5.dist(x,y,cx,cy) <= d/2 ){
      return true;
    }
    return false;
  };

}