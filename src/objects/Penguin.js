import Body from "./Body";

export default class Penguin extends Body {
    movie = true;

    constructor(group, name, label = "", speed = 2, attack = 1) {
        super(group, name, label, speed, attack);
    }

    setup(t, player) {

        t.anims.create({
            key: 'penguin-left',
            frames: t.anims.generateFrameNumbers('penguin', {start: 0, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        t.anims.create({
            key: 'penguin-right',
            frames: t.anims.generateFrameNumbers('penguin', {start: 10, end: 19}),
            frameRate: 10,
            repeat: -1
        });

        t.anims.create({
            key: 'penguin-bros',
            frames: t.anims.generateFrameNumbers('penguin', {start: 20, end: 29}),
            frameRate: 10,
            repeat: 0
        });


        this.puleCount = 0;
        this.puleSY = 0.5;
        this.puleSX = 0.5;
        this.puleScale = 0.2;
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

        t.matterCollision.addOnCollideEnd({
            objectA: player.body,
            objectB: this.body,
            callback: (eventData) => {
                const {bodyA, gameObjectB} = eventData;
                //   console.log(gameObjectB)
                //  gameObjectB.attack.pule.map((el)=>el.setPosition(el.stX,el.stY))
            }
        });

        t.matterCollision.addOnCollideEnd({
            objectA: this.body.map((el) => el.attack.pule)[0],
            objectB: this.body.map((el) => el.sensor)[0],
            callback: (eventData) => {
                const {bodyA, gameObjectA} = eventData;
                gameObjectA.setPosition(this.body[bodyA.num].x, this.body[bodyA.num].y);
                   console.log(gameObjectA)
                //  gameObjectB.attack.pule.map((el)=>el.setPosition(el.stX,el.stY))
            }
        });


        t.matterCollision.addOnCollideStart({
            objectA: this.body.map((el) => el.attack.pule)[0],
            callback: (eventData) => {
                const {bodyA, bodyB, gameObjectA} = eventData;
                if (bodyB.label === "Rectangle Body") {
                   //   gameObjectA.setPosition(this.body[bodyA.num].x, this.body[bodyA.num].y);
                    //  this.play = "penguin-bros";
                    // this.body[bodyA.num].chain("penguin-bros").chain("penguin-left")
                    //     this.puleCount = 5

                }
            }
        });
    }


    view(t, player) {
        this.body.forEach((el) => {
            if (el.sensor.sensor) {
                this.movie = false;
                el.attack.pule.forEach((b) => {
                    b.setVelocity(this.ax * this.puleSpeed, this.ay * this.puleSpeed);
                })
            } else {
                this.movie = true;
                el.attack.pule.forEach((b) => {
                    b.setPosition(el.x, el.y);
                })

            }


        });

        this.draw(t, 'horizontal', 'penguin-left', 'penguin-right', 'penguin-left', 'penguin-right');


    }


}