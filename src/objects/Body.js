import Phaser from "phaser"
import {getObjects} from "../action";

export default class Body{
    label = "";
    speed = 0;
    upSpeed = 0.5
    body = [];
    name = "";
    sensor
    attack = 10;
    direction = 0;
    optionsSensor = {};
    optionsBody = {};
    sensorBody = true;
    staticBody = true
    speedPersecute = 1
    ax = 0;
    ay = 0;
    constructor(name,label = "", speed = 0) {
        this.name = name;
        this.speed = speed;
        this.label = label;
    }
    rectangle(t,map,options = {}){
        return getObjects(map, this.name).map((b) => {
           return  t.matter.add.rectangle(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, {label: b.type,isSensor:this.sensorBody, isStatic:this.staticBody})
        })
    }
    sprite(t,map,options = {}){
        return getObjects(map, this.name).map((b) => {
            return  t.matter.add.sprite(b.x + b.width / 2,b.y + b.height / 2,this.name)
        })
    }

    scale(s1 = 1,s2 = 1){
        this.body.forEach((el) => {
           el.setScale(s1,s2);
        })
    }

    sensors(t,sen = 5,lab = 8,att = 10){
        this.body = this.body.map((b,i)=>{
            let sx = b.width / 2;
            let sy = b.height / 2;
            b.attack = t.matter.bodies.circle(sx,sy,b.width / att ,{label: 'attack',name:this.name, direction:this.direction, isSensor:true, attack:this.attack})
            b.playerBody = t.matter.bodies.circle(sx,sy,b.width / lab ,Object.assign({label: this.label,name:this.name, direction:this.direction, isSensor:this.sensorBody},this.optionsBody))
            b.sensor = t.matter.bodies.circle(sx,sy,b.width / sen,Object.assign({label:this.name + "_sensor",name:this.name, direction:this.direction, isSensor:true,sensor:false},this.optionsSensor))
            const compoundBody = t.matter.body.create({
                parts: [
                    b.playerBody, b.sensor, b.attack
                ],
                friction: 0.01,
                restitution: 0.05,
                label:this.label,
                name:this.name
            });
          return   b.setExistingBody(compoundBody).setPosition(getObjects(t.map,this.name)[i].x + getObjects(t.map,this.name)[i].width / 2, getObjects(t.map,this.name)[i].y + getObjects(t.map,this.name)[i].height / 2).setSize(getObjects(t.map,this.name)[i].width,getObjects(t.map,this.name)[i].height).setName(this.name).setFixedRotation();
        })
    }

    constrainVelocity (sprite, maxVelocity)
    { let x = 0;
        let y = 0
        if (!sprite || !sprite.body)
        { return; }

        let angle, currVelocitySqr, vx, vy;
        vx = sprite.body.velocity.x;
        vy = sprite.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > maxVelocity * maxVelocity)
        {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            sprite.body.velocity.x = vx;
            sprite.body.velocity.y = vy;
        }
    }

    gravity(n = 0.1){
        this.body.forEach((b)=>{
            if(!b.sensor.sensor){
                b.setVelocityY(this.upSpeed);
            }
        })
    }

    persecute(t,player,gravity = true){
        this.constrainVelocity(player)
        this.body.forEach((b)=>{
            let rotation = Phaser.Math.Angle.Between(b.x, b.y, player.position.x, player.position.y)
            this.ax = Math.cos(rotation);
            this.ay =  Math.sin(rotation);
            if(b.sensor.sensor){
                if(this.ax > 0){
                b.body.direction = 0
                }else {
                    b.body.direction = 1
                }

                b.setVelocity(this.ax * this.speedPersecute, this.ay * this.speedPersecute)
            }else {
                if(gravity){
                    b.setVelocityY(this.upSpeed)
                }

            }
        })
    }


    moveHorizontal(){
        this.body.forEach((el) => {
            if (el.playerBody && el.playerBody.direction === 0) {
                el.setVelocityX(this.speed)
            } else if(el.playerBody && el.playerBody.direction === 1){
                el.setVelocityX(-this.speed)
            }else {
                el.setVelocityX(-this.speed)
            }
        })
    }

    moveVertical(){
        this.body.forEach((el) => {
           if(el.playerBody && el.playerBody.direction === 2){
                el.setVelocityY(-this.speed)
            }else if(el.playerBody && el.playerBody.direction === 3){
                el.setVelocityY(this.speed)
            }else {
                el.setVelocityY(-this.speed)
            }
        })
    }

    draw(){
        this.body.forEach((el) => {
            if (el.playerBody && el.playerBody.direction === 0) {
                el.setVelocity(this.speed, 0)
            } else if(el.playerBody && el.playerBody.direction === 1){
                el.setVelocity(-this.speed, 0)
            } else if(el.playerBody && el.playerBody.direction === 2){
                el.setVelocity(0, -this.speed)
            }else if(el.playerBody && el.playerBody.direction === 3){
                el.setVelocity(0, this.speed)
            }else {
                el.setVelocity(-this.speed, 0)
            }
        })
    }
}
