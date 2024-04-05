import Phaser from "phaser";
import Database from "../components/Database";
import {percent} from "../action";


export default class InterFace extends Phaser.Scene{
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
    preload(){

    }

    create(data){
        const pointer = this.input.activePointer;
        this.add.image(50 + this.x,50,"power-player").setScale(0.2,0.2);
        this.add.image(110 + this.x,17,"money-static").setScale(0.6,0.6);
        this.debug = this.add.graphics();
        this.player = data.player
        this.size = this.player.body.body.live;
        this.sizeMax = this.player.liveStatic;
        this.money = this.player.body.body.money;
        this.moneyText = this.add.text(130,3, this.money.toString(),{ font: '30px bold', fill: '#fff' });
        let rJs = 50

        let d = 0;
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: window.innerWidth < window.innerHeight?percent(window.innerWidth, 70):percent(window.innerWidth, 80),
            y: window.innerWidth > window.innerHeight?percent(window.innerHeight,70):percent(window.innerHeight,80),
            radius: rJs,
            base: this.add.circle(0, 0, rJs, 0x888888),
            thumb: this.add.circle(0, 0, rJs / 2, 0xcccccc),
            // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true

        }).on('update', ()=>{
            let cursorKeys = this.joyStick.createCursorKeys();
            console.log(cursorKeys.left.isDown)
            if(!this.joyStick.touchCursor.noKeyDown){
               if(cursorKeys.left.isDown){

                   d = 1;
                   this.player.body.play('left')
               }else if(cursorKeys.right.isDown){
                   d = 0;
                   this.player.body.play('right')
               }
                this.player.body.body.jX = this.joyStick.forceX;
                this.player.body.body.jY = this.joyStick.forceY;
            }else {
                if(d === 1){
                    this.player.body.play('left_p')
                }
                if(d === 0){
                    this.player.body.play('right_p')
                }

                this.player.body.body.jX = 0;
                this.player.body.body.jY = 0;
            }


        }, this);
this.input.on('pointerdown',(pointer)=>{
    let touchX = pointer.x;
    let touchY = pointer.y;
    this.joyStick.x = touchX
    this.joyStick.y = touchY
},this)


    }

    dumpJoyStickState() {
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += `${name} `;
            }
        }

        s += `
Force: ${Math.floor(this.joyStick.force * 100) / 100}
Angle: ${Math.floor(this.joyStick.angle * 100) / 100}
`;

        s += '\nTimestamp:\n';
        for (var name in cursorKeys) {
            var key = cursorKeys[name];
            s += `${name}: duration=${key.duration / 1000}\n`;
        }
        this.text.setText(s);
    }
    update(time, delta) {
        this.moneyText.setText(this.player.body.body.money.toString());
        this.scene.bringToTop();
        this.debug.clear();
        this.size = this.player.body.body.live;
        this.debug.fillStyle(0xE10000);
        this.debug.lineStyle(5,0x87eef3);

        if(this.size < 9){
            this.size = 15
            this.db.setLive(this.size)
        }
        this.debug.fillRect(103 + this.x, 4 + this.y, this.size - 6, 25);
        this.debug.strokeRoundedRect(100 + this.x,this.y,this.sizeMax,30,10);
        let pointer = this.input.activePointer;
        if (pointer.isDown) {
            this.touchX = pointer.x;
            this.touchY = pointer.y;
        }

    }
}