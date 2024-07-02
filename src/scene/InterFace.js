import Phaser from "phaser";
import Database from "../components/Database";
import {percent} from "../action";


export default class InterFace extends Phaser.Scene {
    constructor() {
        super("InterFace");
    }

    size = 400;
    x = 0;
    y = 35;
    live = 0;
    player;
    sizeMax = 400;
    money = 0;
    moneyText;
    db = new Database();
    touchX = 0;
    touchY = 0;
    mX = 0;
    mY = 0;

    preload() {

    }

    create(data) {
        const pointer = this.input.activePointer;
        // this.input.setDefaultCursor('pointer');
        this.add.image(25 + this.x, 50, "power-player").setScale(0.1, 0.1);
        this.add.image(50 + this.x, 17, "money-static").setScale(0.5, 0.5);
        this.debug = this.add.graphics();
        this.player = data.player
        this.size = this.player.body.body.live;
        this.sizeMax = this.player.liveStatic;
        this.money = this.player.body.body.money;
        this.moneyText = this.add.text(70, 3, this.money.toString(), {font: '30px bold', fill: '#fff'});
        let rJs = 50

        let d = 0;
        if (this.plugins.get('rexvirtualjoystickplugin')) {
            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: window.innerWidth < window.innerHeight ? percent(window.innerWidth, 70) : percent(window.innerWidth, 80),
                y: window.innerWidth > window.innerHeight ? percent(window.innerHeight, 70) : percent(window.innerHeight, 80),
                radius: rJs,
                base: this.add.image(0, 0, 'j1').setScale(0.2, 0.2),
                thumb: this.add.image(0, 0, 'j2').setScale(0.15, 0.15),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true

            }).on('update', () => {
                let cursorKeys = this.joyStick.createCursorKeys();

                if (!this.joyStick.touchCursor.noKeyDown) {
                    if (cursorKeys.left.isDown) {
                        d = 1;
                        this.player.body.play('left', true)
                    } else if (cursorKeys.right.isDown) {
                        d = 0;
                        this.player.body.play('right', true)
                    }
                    this.player.body.body.jX = this.joyStick.forceX;
                    this.player.body.body.jY = this.joyStick.forceY;
                } else {
                    if (d === 1) {
                        this.player.body.play('left_p', true)
                    }
                    if (d === 0) {
                        this.player.body.play('right_p', true)
                    }

                    this.player.body.body.jX = 0;
                    this.player.body.body.jY = 0;
                }


            }, this);
        }

        this.input.on('pointerdown', (pointer) => {
            if (pointer.y > window.innerHeight / 3) {
                let touchX = pointer.x;
                let touchY = pointer.y;
                this.joyStick.x = touchX
                this.joyStick.y = touchY
            }

        }, this)

        this.add.image(128, 93, 'achievement').setScale(0.2, 0.2)
        this.add.image(80, 94, 'hp').setScale(0.4, 0.4)
        this.add.text(135, 91, '100', {font: '20px bold', backgroundColor: '#fff', fill: '#333'});
        this.add.image(119, 100, "money-static").setScale(0.5, 0.5);
        let hpPlus = this.rexUI.add.buttons({
            buttons: [
                this.add.image(185, 100, 'money-plus').setScale(0.04, 0.04).setInteractive({
                    cursor: 'pointer'
                })
            ],
        });


        hpPlus.on("button.click", () => {
            if (this.player.body.body.money > 100) {
                if (this.player.body.body.live < this.sizeMax) {
                    if(this.player.body.body.live > this.sizeMax){
                        this.player.body.body.live = this.sizeMax
                    }else {
                        this.player.body.body.live += 100;
                        this.player.body.body.money -= 100;
                    }

                }
                if(this.player.body.body.live > this.sizeMax){
                    this.player.body.body.live = this.sizeMax
                }
                this.db.setLive(this.player.body.body.live);
                this.db.setMoney(this.player.body.body.money);
            }

        })


    }



    update(time, delta) {
        this.moneyText.setText(this.player.body.body.money.toString());
        this.scene.bringToTop();
        this.debug.clear();
        this.size = this.player.body.body.live;
        this.debug.fillStyle(0xE10000);
        this.debug.lineStyle(5, 0x87eef3);

        if (this.size < 9) {
            this.size = 15
            this.db.setLive(this.size)
        }
        this.debug.fillRect(53 + this.x, 4 + this.y, this.size - 6, 20);
        this.debug.strokeRoundedRect(50 + this.x, this.y, this.sizeMax, 25, 10);
        let pointer = this.input.activePointer;
        if (pointer.isDown) {
            this.touchX = pointer.x;
            this.touchY = pointer.y;
        }

    }
}