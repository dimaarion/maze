import Phaser from "phaser"

import Event from "../action/Event";

import Game from "../action/Game";

export default class Scene_1 extends Phaser.Scene {
    map
    layer;
    cursor;
    cam

   g = new Game();
   eventColl = new Event();

    constructor() {
        super("Scene_1");
    }

    create() {
        this.map = this.add.tilemap('map', 32,  32);
        let tiles = this.map.addTilesetImage('level', 'tiles');
        this.layer = this.map.createLayer('map', tiles);
        this.g.setup(this)

    }

    update(time, delta) {
        this.g.draw(this)
    }

}