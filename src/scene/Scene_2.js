import Phaser from "phaser"

import Event from "../action/Event";
import Game from "../action/Game";

export default class Scene_2 extends Phaser.Scene {
    map
    layer;
    cursor;
    cam
    speed = 8

    eventColl = new Event();
    g = new Game();

    constructor() {
        super("Scene_2");
    }

    create() {
        this.map = this.add.tilemap('map2');
        let tiles = this.map.addTilesetImage('level2', 'tiles2');
        this.layer = this.map.createLayer('map', tiles);
        let walls = this.map.createLayer('wall', tiles);
        this.matter.world.convertTilemapLayer(walls);
        this.g.setup(this)
    }



    update(time, delta) {
        this.g.draw(this)
    }

}