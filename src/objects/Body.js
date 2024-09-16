import Phaser from "phaser"
import {arrayCount, getObjects} from "../action";

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
    senX = 0;
    senY = 0;
    attX = 0;
    attY = 0;
    pule = [];
    puleCount = 0;
    puleRad = 50;
    puleSpeed = 2;
    pulePosition = [0, 0];
    pX = 0;
    pY = 0;
    playerPositions = {x: 0, y: 0}

    attR = 0
    countBody = 0;
    countFrame = 0;

    puleSensor = false;
    puleKey = "";

    puleScale = 1;

    puleTime = 3000;
    moveTo;

    constructor(group, name, label = "", speed = 0, attack = 1) {
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

    sprite(t, figure = "circle") {
        this.figure = figure
        this.body = t.map.createFromObjects(this.group, {name: this.name});
        return this.body = this.body.map((b) => t.matter.add.gameObject(b, {label: this.label}));
    }

    scale(s1 = 1, s2 = 1) {
        this.body.forEach((el) => {
            el.setScale(s1, s2);
        })
    }

    sensors(t, sen = 5, lab = 8, att = 10, play = "") {
        this.attR = att;
        this.body = this.body.map((b, i) => {
            let sx = b.width / 2;
            let sy = b.height / 2;

            b.attack = t.matter.bodies.circle(sx + this.attX, sy + this.attY, b.width / this.attR, {
                label: this.labelAttack,
                name: this.name,
                direction: this.direction,
                isSensor: true,
                attack: this.attack,
                pule: arrayCount(1, this.puleCount)
                    .map((n) => t.matter.add.image(b.x, b.y, this.puleKey)
                        .setCircle(this.puleRad, {
                            isSensor: this.puleSensor,
                            vX: Phaser.Math.Between(-this.puleSpeed, this.puleSpeed),
                            vY: Phaser.Math.Between(-this.puleSpeed, this.puleSpeed),
                            label: this.labelAttack,
                            attack: this.attack
                        })
                        .setScale(this.puleScale, this.puleScale)
                        .setName("attack")
                        .setBounce(1).setPosition(b.x, b.y)),

            })
            b.playerBody = t.matter.bodies.circle(sx, sy, b.width / lab, Object.assign({
                label: this.label,
                name: this.name,
                direction: this.direction,
                isSensor: this.sensorBody,
                count: 0,
                num: i

            }, this.optionsBody))
            if (this.figure === "circle") {
                b.sensor = t.matter.bodies.circle(sx + this.senX, sy + this.senY, b.width / sen, Object.assign({
                    label: this.name + "_sensor",
                    name: this.name,
                    direction: this.direction,
                    isSensor: true,
                    sensor: false,
                    noDown: true,
                    num: i,
                    sX: b.x,
                    sY: b.y
                }, this.optionsSensor))
            } else {
                b.sensor = t.matter.bodies.rectangle(sx + this.senX, sy + this.senY, b.width / sen, b.height / sen, Object.assign({
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
                name: this.name,


            });
            if (getObjects(t.map, this.name)[i] === undefined) {
              //  console.log(this.name)
            }

            return getObjects(t.map, this.name)[i] ? b.setExistingBody(compoundBody)
                .setPosition(getObjects(t.map, this.name)[i].x + getObjects(t.map, this.name)[i].width / 2, getObjects(t.map, this.name)[i].y + getObjects(t.map, this.name)[i].height / 2).setName(this.name)
                .setFixedRotation()
                .play(play) : [{}]
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

    gravity() {
        this.body.forEach((b) => {
            if (!b.sensor.sensor) {
                if(b.body){
                    b.setVelocityY(this.upSpeed);
                }

            }
        })
    }

    playerPosition(b, player) {

        if(b.body){
            let rotation = Phaser.Math.Angle.Between(b.x, b.y, player.position.x, player.position.y)
            this.ax = Math.cos(rotation);
            this.ay = Math.sin(rotation);
            this.playerPositions = {x: player.position.x, y: player.position.y}
        }

    }

    persecute(t, player, options = {left: "", right: "", leftA: "", rightA: ""}, move = false) {
        this.constrainVelocity(player)
        this.body.forEach((b) => {
            this.playerPosition(b, player)
            if (b.body && b.sensor.sensor) {
                b.setVelocity(this.ax * this.speedPersecute, this.ay * this.speedPersecute);
                if (options.left !== "" && options.left !== "") {
                    if (b.body.velocity.x > 0) {
                        b.play(options.right, true)
                    } else {
                        b.play(options.left, true)
                    }
                }
            } else {
                if (move) {
                    this.moveHorizontal(options.left, options.right, options.leftA, options.rightA)
                }
            }
        })
    }

    rePersecute(t, player, options = {left: "", right: "", leftA: "", rightA: ""}, move = false) {
        this.constrainVelocity(player)
        this.body.forEach((b) => {
            this.playerPosition(b, player)
            if (b.body && b.sensor.sensor) {
                b.setVelocity(-this.ax * this.speedPersecute, -this.ay * this.speedPersecute);
                if (options.left !== "" && options.left !== "") {
                    if (b.body.velocity.x > 0) {
                        b.play(options.right, true)
                    } else {
                        b.play(options.left, true)
                    }
                }
            } else {
                if (move) {
                    this.moveHorizontal(options.left, options.right, options.leftA, options.rightA)
                }
            }
        })
    }


    moveHorizontal(left, right, activeLeft, activeRight) {
        if (this.body) {
            this.body.filter((f) => f.body).forEach((el) => {
                if (el.playerBody && el.playerBody.direction === 0) {
                    this.pulePosition = [this.pX, -this.pY]
                    el.setVelocityX(this.speed)
                } else if (el.playerBody && el.playerBody.direction === 1) {
                    this.pulePosition = [-this.pX, -this.pY]
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

    }

    moveVertical(up, down) {
        if (this.body) {
            this.body.filter((f) => f.body).forEach((el) => {
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

    }

    draw(t, position = "horizontal", left, right, leftA, rightA, player, move = false) {
        if (position === "horizontal") {
            this.moveHorizontal(left, right, leftA, rightA)
        } else if (position === "vertical") {
            this.moveVertical(left, right);
        } else if (position === "persecute") {
            this.persecute(t, player, {left: left, right: right, leftA: leftA, rightA: rightA}, move);
        }else if (position === "re-persecute") {
            this.rePersecute(t, player, {left: left, right: right, leftA: leftA, rightA: rightA}, move);
        }
        this.body.forEach((b) => {
            b.attack.pule.filter((f) => f).forEach((p) => {
                if (b.sensor.sensor) {
                    this.countFrame += 1;
                    let count = this.puleTime
                    if (this.countFrame > count / 2) {
                        p.setVelocity(p.body.vX, p.body.vY)
                    } else {
                        p.setPosition(b.body.position.x + this.pulePosition[0], b.body.position.y + this.pulePosition[1])
                    }

                    if (this.countFrame > count) {
                        this.countFrame = 0
                    }

                }
            })

        })
    }

    setBoards(t, board, x, y, b) {
        let tileXY = t.map.getTileAtWorldXY(x, y, true);
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }

        let chess = t.rexBoard.add.shape(board, tileXY.x, tileXY.y, 1,).setOrigin(0);

        let moveTo = board.scene.rexBoard.add.moveTo(chess, {
            speed: 100,
            occupiedTest: true,
            moveableTest: function (fromTileXYZ, toTileXYZ, direction, board) {
                return true;
            }

        })
        let tileXYZ = board.chessToTileXYZ(chess)
        let tile = board.tileXYZToChess(tileXYZ.x, tileXYZ.y, 'walls');

        tile.layer.data.forEach((el, i) => {
            el.forEach((el2, j) => {
                if (el[j].index !== -1) {
                    let blocker = t.rexBoard.add.shape(board, el[j].x, el[j].y, 1).setOrigin(0);
                    board.scene.add.existing(blocker);
                }

            })


        })

        let pathFinder = board.scene.rexBoard.add.pathFinder(chess, {
            occupiedTest: true
        })

        let tileXYArray2 = pathFinder.findArea();
        let tileXYArray = pathFinder.getPath(tileXYArray2[Phaser.Math.Between(1, tileXYArray2.length - 1)]);
        moveTo.moveTo(tileXYArray.shift())
        let tileXYZ2 = board.chessToTileXYZ(chess)
        if (tileXYZ2 === null) {
            tileXYZ2 = board.getRandomEmptyTileXY(0);
        }
        let tile2 = board.tileXYZToChess(tileXYZ2.x, tileXYZ2.y, 1);

        function moveDraw() {
            moveTo.on('complete', function () {
                if (tileXYArray.length === 0) {
                    tileXYArray2 = pathFinder.findArea();
                    tileXYArray = pathFinder.getPath(tileXYArray2[Phaser.Math.Between(1, tileXYArray2.length - 1)]);

                }

                followPath(t, b, tile2)
                moveTo.moveTo(tileXYArray.shift())
            })
        }

        moveDraw()

        function followPath(t, player, tile) {
            const tween = t.tweens.add({
                targets: player,
                x: {value: tile.x, duration: 400},
                y: {value: tile.y, duration: 400},

            });

        }

        return moveTo
    }

    finding(t) {
        let board = t.rexBoard.createBoardFromTilemap(t.map, "walls");
        this.body.forEach((b, i) => {
            this.moveTo = this.setBoards(t, board, b.x, b.y, b);
        })
    }
}
