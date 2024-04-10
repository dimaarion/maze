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
      //  this.add.image(1450 ,1400,"tiles3");
       let tiles = this.map.addTilesetImage('level3', 'tiles3');
       this.layer = this.map.createLayer('map', tiles);
        this.g.setup(this)


    }



    update(time, delta) {
        this.g.draw(this)
    }

}