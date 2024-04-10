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
      //  this.add.image(1450 ,1450,"tiles2");
        let tiles = this.map.addTilesetImage('level2', 'tiles2',50,50);
        this.layer = this.map.createLayer('map', tiles);
        this.g.setup(this)
    }



    update(time, delta) {
        this.g.draw(this)
    }

}