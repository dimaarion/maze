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

        this.map = this.make.tilemap({key: 'map'});

        this.g.setup(this,'level','tiles')

    }

    update(time, delta) {
        this.g.draw(this)
    }

}