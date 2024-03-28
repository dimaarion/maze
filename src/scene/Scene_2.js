import Phaser from "phaser"
import {arrayCount, getObjects} from "../action";
import Player from "../objects/Player";
import Money from "../objects/Money";
import Fugu from "../objects/Fugu";
import Event from "../action/Event";
import Point from "../objects/Point";
import Game from "../action/Game";
import {money} from "../redux/store";
export default class Scene_2 extends Phaser.Scene {
    map
    layer;
    cursor;
    cam
    speed = 8

    money = new Money("money");
    fugu = new Fugu("fugu","alive",1);

    point = new Point("point");
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
        this.g.setup(this)
        this.matter.world.convertTilemapLayer(walls);

    }



    update(time, delta) {
        this.g.draw(this)
    }

}