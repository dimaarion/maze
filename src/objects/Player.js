import {constrain} from "../action";

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
                restitution: 0.05,
                frictionStatic: 0,
                live: this.live,
                liveStatic: this.liveStatic,
                money: this.money,
                database:this.database,
                jX: 0,
                jY: 0,
            },
          //  sensors:el.matter.add.circle(this.body.body.position.x,this.body.body.position.y,this.body.width,{isSensor:true,attack:false,label:"attack_player"}),
            label: "player"
        };


       // el.anims.play('wood-rotate', this.playerController.sensors);
        this.body = this.playerController.matterSprite.setCircle(this.playerController.matterSprite.width / 2, this.playerController.options).setName("player").setFixedRotation();
       /* let constraint = el.matter.add.constraint(this.body, this.playerController.sensors, 0, 1, {
            pointA: { x: 0, y: 0 },  // точка крепления на первом объекте
            pointB: { x: 0, y: 0 },  // точка крепления на втором объекте
            friction: 0,
            restitution: 0.05,
            frictionStatic: 0,
        });*/

        let p = this.body
        let sensors = this.playerController.sensors;
        el.input.keyboard.on('keydown', function (event) {

            if (event.code === "Space") {

            }
            if (event.key === "ArrowLeft") {
                //  p.play("left").setVelocityX(-1)
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


        this.body.setScale(0.5, 0.5)


    }

    draw(el) {

     //   el.matter.body.setPosition(this.playerController.sensors,this.body.body.position,true)

        this.body.setVelocityX(constrain(this.body.body.jX / 50, -this.speed, this.speed))

        if(!this.noDown){
            this.body.setVelocityY(constrain(this.body.body.jY / 50, -this.speed, this.speed))
        }

        if (el.cursor.left.isDown) {
            this.body.setVelocityX(-this.speed)
            this.direct = 1;
            this.body.play("left", true);

        }else if (el.cursor.right.isDown) {
            this.body.setVelocityX(this.speed)
            this.body.play("right", true);
            this.direct = 0;

        }else if(el.cursor.right.isUp){
            this.direct = 2;
         //   this.body.play("right_p", true);
        }else if(el.cursor.left.isUp){
           // this.body.play("left_p", true);
        }
        if (el.cursor.up.isDown) {
            this.body.setVelocityY(-this.speed)
        }
        if (el.cursor.down.isDown && !this.noDown) {
            this.body.setVelocityY(this.speed)
        }


        if (this.body.body.velocity.x > 0) {
          //  console.log(this.body.body.velocity.x)
            this.body.play("right", true);

        } else {
        //    this.body.play("left", true);

        }

       if(this.noDown){
           this.body.setVelocityY(-this.speed)
       }


    }


}