import Phaser from "phaser"

import Event from "../action/Event";

import Game from "../action/Game";

export default class Scene_4 extends Phaser.Scene {
    map
    layer;
    cursor;
    cam
    speed = 8

    eventColl = new Event();
    g = new Game();

    constructor() {
        super("Scene_4");
    }

    create() {
        this.map = this.add.tilemap('map4');
        let tiles = this.map.addTilesetImage('level4', 'tiles4');
        this.layer = this.map.createLayer('map', tiles);

        this.g.setup(this)


    }



    update(time, delta) {
        this.g.draw(this)
    }

}