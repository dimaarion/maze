import {arrayCount, getObjects} from "../action";

export default class Player {
    body;
    speed = 8;

    setup(el, map) {
        el.anims.create({
            key: 'left_p',
            frames: el.anims.generateFrameNumbers('player', {frames: arrayCount(6,11)}),
            frameRate: 6,
            repeat: -1
        });
        el.anims.create({
            key: 'right_p',
            frames: el.anims.generateFrameNumbers('player', {frames: arrayCount(0,5)}),
            frameRate: 6,
            repeat: -1
        });
        el.anims.create({
            key: 'right',
            frames: el.anims.generateFrameNumbers('player', {frames: arrayCount(12,17)}),
            frameRate: 6,
            repeat: -1
        });
        el.anims.create({
            key: 'left',
            frames: el.anims.generateFrameNumbers('player', {frames: arrayCount(18,23)}),
            frameRate: 6,
            repeat: -1
        });
        this.body = el.matter.add.sprite(getObjects(map,"player")[0].x, getObjects(map,"player")[0].y, 'player')
            .setCircle(30, {label: "player"})
            .setFixedRotation()
            .setFrictionAir(0.05)
            .setMass(30)
        this.body.play("right_p")
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