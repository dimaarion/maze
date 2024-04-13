import Phaser from "phaser"

import Event from "../action/Event";

import Game from "../action/Game";

export default class Scene_5 extends Phaser.Scene {
    map
    layer;
    cursor;
    cam
    speed = 8

    eventColl = new Event();
    g = new Game();

    constructor() {
        super("Scene_5");
    }

    create() {
        this.map = this.add.tilemap('map5');
        this.g.setup(this,'level4', 'tiles4')


    }



    update(time, delta) {
        this.g.draw(this)
    }

}