import Phaser from "phaser"

import Event from "../action/Event";

import Game from "../action/Game";

export default class Scene_3 extends Phaser.Scene {
    map
    layer;
    cursor;
    cam
    speed = 8

    eventColl = new Event();
    g = new Game();

    constructor() {
        super("Scene_3");
    }

    create() {
        this.map = this.add.tilemap('map3');
        this.g.setup(this,'level3', 'tiles3')


    }



    update(time, delta) {
        this.g.draw(this)
    }

}