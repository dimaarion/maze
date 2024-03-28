import {arrayCount, getObjects} from "../action";
import {money} from "../redux/store";

export default class Player {
    body;
    speed = 1;
    playerController;
    level = 1
    liveStatic = 300
    live = this.liveStatic;
    money = 0;
    x = 0;
    y = 0;
    constructor(speed = 1) {
        this.speed = speed
    }


    setup(el, map) {
        if(this.x === 0){
            this.x = getObjects(map, "player")[0].x;
        }

        if(this.y === 0){
            this.y = getObjects(map, "player")[0].y;
        }

        el.anims.create({
            key: 'left_p',
            frames: el.anims.generateFrameNumbers('player', {start: 6, end: 11}),
            frameRate: 6,
            repeat: -1
        });
        el.anims.create({
            key: 'right_p',
            frames: el.anims.generateFrameNumbers('player', {start: 0, end: 5}),
            frameRate: 6,
            repeat: -1
        });
        el.anims.create({
            key: 'right',
            frames: el.anims.generateFrameNumbers('player', {start: 12, end: 17}),
            frameRate: 6,
            repeat: -1
        });
        el.anims.create({
            key: 'left',
            frames: el.anims.generateFrameNumbers('player', {start: 18, end: 23}),
            frameRate: 6,
            repeat: -1
        });
        this.playerController = {
            matterSprite: el.matter.add.sprite(this.x, this.y, 'player'),
            options: {
                label: 'player',
                friction: 0,
                restitution: 0.05,
                frictionStatic: 0,
                live: this.live,
                liveStatic:this.liveStatic,
                money:this.money
            },
            sensors: null,
            label: "player"
        };

        let sx = this.playerController.matterSprite.width / 2;
        let sy = this.playerController.matterSprite.height / 2;
        const playerBody = el.matter.bodies.circle(sx, sy, this.playerController.matterSprite.width / 5, {
            isSensor: false,
            label: 'player'
        })
        this.playerController.sensors = el.matter.bodies.circle(sx, sy, this.playerController.matterSprite.width, {
            isSensor: true,
            label: 'player'
        })
        const compoundBody = el.matter.body.create({
            parts: [
                playerBody, this.playerController.sensors
            ],
            friction: 0.01,
            restitution: 0.05
        });
        this.body = this.playerController.matterSprite.setCircle(this.playerController.matterSprite.width / 2, this.playerController.options).setName("player").setFixedRotation();

        this.body.play("right_p");
        let p = this.body
        el.input.keyboard.on('keydown', function (event) {
            if (event.key === "ArrowRight") {
                p.play("right")
            }
            if (event.key === "ArrowLeft") {
                p.play("left")
            }
        });
        el.input.keyboard.on('keyup', function (event) {

            if (event.key === "ArrowRight") {
                p.play("right_p")
            }
            if (event.key === "ArrowLeft") {
                p.play("left_p")
            }
        });
    }

    draw(el) {
        if (el.cursor.left.isDown) {
            if (el.cursor.left.isDown && el.cursor.down.isDown) {
                this.body.setVelocity(-this.speed, this.speed)
            } else if (el.cursor.left.isDown && el.cursor.up.isDown) {
                this.body.setVelocity(-this.speed, -this.speed)
            } else {
                this.body.setVelocity(-this.speed, 0)

            }

        }


        if (el.cursor.right.isDown) {
            if (el.cursor.right.isDown && el.cursor.down.isDown) {
                this.body.setVelocity(this.speed, this.speed)
            } else if (el.cursor.right.isDown && el.cursor.up.isDown) {
                this.body.setVelocity(this.speed, -this.speed)
            } else {
                this.body.setVelocity(this.speed, 0)

            }

        }
        if (el.cursor.up.isDown) {
            if (el.cursor.up.isDown && el.cursor.right.isDown) {
                this.body.setVelocity(this.speed, -this.speed)
            } else if (el.cursor.up.isDown && el.cursor.left.isDown) {
                this.body.setVelocity(-this.speed, -this.speed)
            } else {
                this.body.setVelocity(0, -this.speed)
            }
        }
        if (el.cursor.down.isDown) {
            if (el.cursor.down.isDown && el.cursor.right.isDown) {
                this.body.setVelocity(this.speed, this.speed)
            } else if (el.cursor.down.isDown && el.cursor.left.isDown) {
                this.body.setVelocity(-this.speed, this.speed)
            } else {
                this.body.setVelocity(0, this.speed)
            }
        }
    }


}