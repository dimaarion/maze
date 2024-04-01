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
        this.add.image(50 + this.x,50,"power-player").setScale(0.2,0.2);
        this.debug = this.add.graphics();

        this.map = this.add.tilemap('map');
        let tiles = this.map.addTilesetImage('level', 'tiles');
        this.layer = this.map.createLayer('map', tiles);
        let walls = this.map.createLayer('walls', tiles);
        this.g.setup(this)
        this.matter.world.convertTilemapLayer(walls);


    }

    update(time, delta) {

        this.g.draw(this)
    }

}