import Phaser from "phaser"

import Event from "../action/Event";

import Game from "../action/Game";
import {getObjects} from "../action";

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
        this.map = this.add.tilemap('map');
       // this.add.image(1450 ,1450,"tiles");
        let tiles = this.map.addTilesetImage('level', 'tiles',50,50);
        this.layer = this.map.createLayer('map', tiles);
        this.g.setup(this)

    }

    update(time, delta) {
        this.g.draw(this)
    }

}