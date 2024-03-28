import Phaser from "phaser";
import Database from "../components/Database";
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

    preload(){

    }

    create(data){
        this.add.image(50 + this.x,50,"power-player").setScale(0.2,0.2);
        this.add.image(110 + this.x,17,"money-static").setScale(0.6,0.6);;
        this.debug = this.add.graphics();
        this.player = data.player
        this.size = this.player.body.body.live;
        this.sizeMax = this.player.liveStatic;
        this.money = this.player.body.body.money;
        this.moneyText = this.add.text(130,3, this.money.toString(),{ font: '30px bold', fill: '#fff' })
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
        this.debug.strokeRoundedRect(100 + this.x,this.y,this.sizeMax,30,10)

    }
}