import {constrain} from "../action";
import Phaser from "phaser"

export default class Player {
    body;
    body2;
    speed = 1;
    playerController;
    level = 1
    liveStatic = 300
    live = this.liveStatic;
    money = 0;
    x = 0;
    y = 0;
    direct = 0
    mouseMove = 0;
    sceneKey = 'Scene_1'
    noDown = false;
    stone = false;
    database = {};
    effect = 1;
    skillImg =  "round";
    obj = {};
    keyA;
    keyW;
    keyD;
    keyS;
    sizeSkill = 300;

    constructor(speed = 1) {
        this.speed = speed
    }


    setup(el) {
        this.body = el.map.createFromObjects('player', { name:"player",type:"player" })[0];
        el.anims.play('right_p', this.body);

        this.playerController = {
            matterSprite: el.matter.add.gameObject(this.body,{label:"player"}),
            options: {
                label: 'player',
                friction: 0,
                restitution: 0,
                frictionStatic: 0,
                live: this.live,
                liveStatic: this.liveStatic,
                money: this.money,
                database:this.database,
                jX: 0,
                jY: 0,
            },
            label: "player"
        };



        this.body = this.playerController.matterSprite.setCircle(this.playerController.matterSprite.width / 2, this.playerController.options).setName("player").setFixedRotation();

        let p = this.body
        let sensors = this.playerController.sensors;
        el.input.keyboard.on('keydown', function (event) {


        });
        el.input.keyboard.on('keyup', function (event) {

            if (event.key === "ArrowRight" || event.key === "d") {
                p.play("right_p");
            }
            if (event.key === "ArrowLeft" || event.key === "a") {
               p.play("left_p");
            }

        });

        this.keyA = el.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = el.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = el.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = el.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.body.setScale(0.5, 0.5)


    }

    draw(el) {

        this.body.setVelocityX(constrain(this.body.body.jX / 50, -this.speed, this.speed))

        if(!this.noDown){
            this.body.setVelocityY(constrain(this.body.body.jY / 50, -this.speed, this.speed))
        }

        if(el.cursor.space.isDown){
            if (this.obj.name) {
                this.obj.setPosition(this.body.x, this.body.y);
            }
        }


        if (el.cursor.left.isDown || this.keyA.isDown) {
            this.body.setVelocityX(-this.speed)
            this.direct = 1;
            this.body.play("left", true);

        }else if (el.cursor.right.isDown || this.keyD.isDown) {
            this.body.setVelocityX(this.speed)
            this.body.play("right", true);
            this.direct = 0;

        }






        if (el.cursor.up.isDown || this.keyW.isDown) {
            this.body.setVelocityY(-this.speed);
        }
        if ((el.cursor.down.isDown || this.keyS.isDown) && !this.noDown) {
            this.body.setVelocityY(this.speed);
        }

        if (this.body.body.velocity.x > 0) {
            this.body.play("right", true);
        }

       if(this.noDown){
           this.body.setVelocityY(-this.speed)
       }


    }


}