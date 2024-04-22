import Phaser from "phaser"

import Event from "../action/Event";

import Game from "../action/Game";

export default class Scene_6 extends Phaser.Scene {
    map
    layer;
    cursor;
    cam
    speed = 8

    eventColl = new Event();
    g = new Game();

    constructor() {
        super("Scene_6");
    }

    create() {
        this.map = this.add.tilemap('map6');
        this.g.setup(this,'level6', 'tiles6');


    }



    update(time, delta) {
        this.g.draw(this)
    }

}