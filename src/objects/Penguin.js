import Body from "./Body";

export default class Penguin extends Body {
    movie = true;
    timer;

    character;
    currentAnimation = 0;
    animations = ['penguin-left', 'penguin-bros']; // Массив анимаций

    constructor(group, name, label = "", speed = 2, attack = 1) {
        super(group, name, label, speed, attack);
    }

    setup(t, player) {

        t.anims.create({
            key: 'penguin-left',
            frames: t.anims.generateFrameNumbers('penguin', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}),
            frameRate: 10,
            repeat: -1
        });

        t.anims.create({
            key: 'penguin-right',
            frames: t.anims.generateFrameNumbers('penguin', {frames: [10, 11, 12, 13, 14, 15, 16,17, 18, 19]}),
            frameRate: 10,
            repeat: -1
        });

        t.anims.create({
            key: 'penguin-bros-left',
            frames: t.anims.generateFrameNumbers('penguin', {frames: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]}),
            frameRate: 10,
            repeat: 0
        });

        t.anims.create({
            key: 'penguin-bros-right',
            frames: t.anims.generateFrameNumbers('penguin', {frames: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39]}),
            frameRate: 10,
            repeat: 0
        });

        this.timeAnim = 400
        this.stepAnim = 50
        this.puleCount = 0;
        this.puleSY = 0.5;
        this.puleSX = 0.5;
        this.puleScale = 0.5;
        this.puleRad = 12
        this.sprite(t);
        this.scale(0.7, 0.7);
        this.sensors(t, 0.1, 1, 1.5, 'penguin-right');

        t.matterCollision.addOnCollideStart({
            objectA: player.body,
            objectB: this.body,
            callback: (eventData) => {
                const {bodyA, gameObjectA, gameObjectB} = eventData;
                this.body.forEach((el) => {
                    el.attack.pule.forEach((b) => {
                        this.playerPosition(b, player.body.body);
                        // gameObjectB.setPosition(gameObjectB.body.stX,gameObjectB.body.stY)
                        // b.setPosition(b.stX, b.stY);
                    })
                })
            }
        });

        t.matterCollision.addOnCollideStart({
            objectA: this.body.map((el) => el.playerBody),
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectA} = eventData;
                //   console.log(gameObjectB)
                //  gameObjectB.attack.pule.map((el)=>el.setPosition(el.stX,el.stY))

                if (bodyB.label === "right" || bodyB.label === "left") {
                    //  gameObjectA.setPosition(this.body[bodyA.num].x, this.body[bodyA.num].y);
                    gameObjectA.attack.pule.map((el) => el.setPosition(-10000, 0))
                }
            }
        });

        t.matterCollision.addOnCollideEnd({
            objectA: this.body.map((el) => el.attack.pule),
            objectB: this.body.map((el) => el.sensor),
            callback: (eventData) => {
                const {bodyA, gameObjectA, gameObjectB} = eventData;
                gameObjectA.setPosition(-10000, 0);

                //  gameObjectB.attack.pule.map((el)=>el.setPosition(el.stX,el.stY))
            }
        });


        t.matterCollision.addOnCollideStart({
            objectA: this.body.map((el) => el.attack.pule)[0],
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectA} = eventData;
                if (bodyB.label === "right" || bodyB.label === "left") {
                    // gameObjectA.setPosition(-10000, 0);
                    //  this.play = "penguin-bros";
                    // this.body[bodyA.num].chain("penguin-bros").chain("penguin-left")
                    //     this.puleCount = 5

                }
            }
        });

        this.timer = t.time.addEvent({
            delay: 1000,                // ms
            callback: () => {
                switchAnimation(this)
                this.movie = !this.movie;
            },
            //args: [],
            callbackScope: t,
            loop: true
        });

        function switchAnimation(t) {

        }

    }


    view(t) {
        if(this.body !== undefined){
            this.body.filter((f)=>f.body).forEach((el) => {
                if (el.sensor.sensor) {
                    el.attack.pule.filter((f)=>f.body).forEach((b) => {
                        if(b.body){
                            if (this.countAnim > (this.timeAnim - this.stepAnim)) {
                                b.setPosition(el.x, el.y)
                                b.setTexture("noimage")
                            }
                            b.setTexture("snegok")
                            if (el.playerBody && el.playerBody.direction === 0) {
                                b.setVelocity(this.puleSpeed, 0);


                            } else {
                                b.setVelocity(-this.puleSpeed, 0);
                            }
                        }



                    })
                } else {
                    el.attack.pule.filter((f)=>f.body).forEach((b) => {
                        b.setPosition(el.x, el.y);
                        b.setTexture("noimage")
                    })

                }


            });
        }


        this.draw(t, 'horizontal', 'penguin-left', 'penguin-right', ['penguin-left', 'penguin-bros-left'], ['penguin-right', 'penguin-bros-right']);


    }


}