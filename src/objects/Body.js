import Phaser from "phaser"
import {getObjects} from "../action";

export default class Body {
    label = "";
    speed = 0;
    upSpeed = 0.5
    body = [];
    name = "";
    sensor
    attack = 1;
    direction = 0;
    optionsSensor = {};
    optionsBody = {};
    sensorBody = true;
    staticBody = true
    speedPersecute = 1
    persecutes = false;
    labelAttack = 'attack';
    figure = "circle"
    obj;
    group = "";
    ax = 0;
    ay = 0;

    constructor(group,name, label = "", speed = 0, attack = 1) {
        this.name = name;
        this.speed = speed;
        this.label = label;
        this.attack = attack;
        this.group = group;
    }

    rectangle(t, map, options = {}) {
        this.body = getObjects(map, this.name).map((b) => {
            return t.matter.add.rectangle(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, {
                label: b.type,
                isSensor: this.sensorBody,
                isStatic: this.staticBody
            })
        })
        return this.body;
    }

    sprite(t,figure = "circle") {
        this.figure = figure
        this.body = t.map.createFromObjects(this.group, {name:this.name});
        return this.body = this.body.map((b)=>t.matter.add.gameObject(b,{label:this.label}));
    }

    scale(s1 = 1, s2 = 1) {
        this.body.forEach((el) => {
            el.setScale(s1, s2);
        })
    }

    sensors(t, sen = 5, lab = 8, att = 10) {

        this.body = this.body.map((b, i) => {
            let sx = b.width / 2;
            let sy = b.height / 2;
            b.attack = t.matter.bodies.circle(sx, sy, b.width / att, {
                label: this.labelAttack,
                name: this.name,
                direction: this.direction,
                isSensor: true,
                attack: this.attack
            })
            b.playerBody = t.matter.bodies.circle(sx, sy, b.width / lab, Object.assign({
                label: this.label,
                name: this.name,
                direction: this.direction,
                isSensor: this.sensorBody,
                count: 0
            }, this.optionsBody))
            if(this.figure === "circle"){
                b.sensor = t.matter.bodies.circle(sx, sy, b.width / sen, Object.assign({
                    label: this.name + "_sensor",
                    name: this.name,
                    direction: this.direction,
                    isSensor: true,
                    sensor: false,
                    num: i,
                    sX: b.x,
                    sY: b.y
                }, this.optionsSensor))
            }else {
                b.sensor = t.matter.bodies.rectangle(sx, sy, b.width / sen,b.height / sen, Object.assign({
                    label: this.name + "_sensor",
                    name: this.name,
                    direction: this.direction,
                    isSensor: true,
                    sensor: false,
                    num: i,
                    sX: b.x,
                    sY: b.y
                }, this.optionsSensor))
            }


            const compoundBody = t.matter.body.create({
                parts: [
                    b.playerBody, b.sensor, b.attack
                ],
                friction: 0.01,
                restitution: 0.05,
                label: this.label,
                name: this.name
            });
            return b.setExistingBody(compoundBody).setPosition(getObjects(t.map,this.name)[i].x + getObjects(t.map,this.name)[i].width / 2,getObjects(t.map,this.name)[i].y + + getObjects(t.map,this.name)[i].height / 2).setName(this.name).setFixedRotation();
        })
    }

    constrainVelocity(sprite, maxVelocity) {
        let x = 0;
        let y = 0
        if (!sprite || !sprite.body) {
            return;
        }

        let angle, currVelocitySqr, vx, vy;
        vx = sprite.body.velocity.x;
        vy = sprite.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            sprite.body.velocity.x = vx;
            sprite.body.velocity.y = vy;
        }
    }

    gravity(n = 0.1) {
        this.body.forEach((b) => {
            if (!b.sensor.sensor) {
                b.setVelocityY(this.upSpeed);
            }
        })
    }

    persecute(t, player, options = "", left, right, activeLeft, activeRight) {
        this.constrainVelocity(player)
        this.body.forEach((b) => {
            let rotation = Phaser.Math.Angle.Between(b.x, b.y, player.position.x, player.position.y)
            this.ax = Math.cos(rotation);
            this.ay = Math.sin(rotation);
            if (b.sensor.sensor) {
                b.setVelocity(this.ax * this.speedPersecute, this.ay * this.speedPersecute);
                if (activeRight && activeLeft) {
                    if (b.body.velocity.x > 0) {
                      //  b.play(activeRight, true);
                    } else {
                      //  b.play(activeLeft, true);
                    }
                }
            }
        })
    }


    moveHorizontal(left, right, activeLeft, activeRight) {
        this.body.forEach((el) => {

            if (el.playerBody && el.playerBody.direction === 0) {
                el.setVelocityX(this.speed)
            } else if (el.playerBody && el.playerBody.direction === 1) {
                el.setVelocityX(-this.speed)
            } else {
                el.setVelocityX(-this.speed)
            }
            if (el.body.velocity.x > 0) {
                if (!el.sensor.sensor) {
                    el.play(right, true);
                } else {
                    el.play(activeRight, true);
                }
            } else {
                if (!el.sensor.sensor) {
                    el.play(left, true);
                } else {
                    el.play(activeLeft, true);
                }

            }
        })
    }

    moveVertical(up, down) {
        this.body.forEach((el) => {
            if (el.playerBody && el.playerBody.direction === 2) {
                el.play(up, true);
                el.setVelocityY(-this.speed)
            } else if (el.playerBody && el.playerBody.direction === 3) {
                el.play(down, true);
                el.setVelocityY(this.speed)
            } else {
                el.play(up, true);
                el.setVelocityY(-this.speed)
            }
        })
    }

    draw() {
        this.body.forEach((el) => {
            if (el.playerBody && el.playerBody.direction === 0) {
                el.setVelocityX(this.speed)
            } else if (el.playerBody && el.playerBody.direction === 1) {
                el.setVelocityX(-this.speed)
            } else if (el.playerBody && el.playerBody.direction === 2) {
                el.setVelocityY(-this.speed)
            } else if (el.playerBody && el.playerBody.direction === 3) {
                el.setVelocityY(this.speed)
            } else {
                el.setVelocityX(this.speed)
            }


        })
    }
}
