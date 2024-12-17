import Phaser from "phaser"

import Event from "../action/Event";

import Game from "../action/Game";

export default class Scene_9 extends Phaser.Scene {
    map
    layer;
    cursor;
    cam
    speed = 8

    eventColl = new Event();
    g = new Game();

    constructor() {
        super("Scene_9");
    }

    create() {
        this.map = this.add.tilemap('map9');
        this.g.setup(this,'level', 'tiles');


    }



    update(time, delta) {
        this.g.draw(this)
    }

}