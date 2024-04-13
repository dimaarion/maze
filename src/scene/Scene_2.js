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
        this.map = this.make.tilemap({key: 'map2'});
        this.g.setup(this,'level2','tiles2')
    }



    update(time, delta) {
        this.g.draw(this)
    }

}