import Phaser from "phaser"
import {arrayCount, getObjects} from "../action";
import Player from "../objects/Player";
import Money from "../objects/Money";
import Fugu from "../objects/Fugu";
import Event from "../action/Event";
import Point from "../objects/Point";
export default class Scene_1 extends Phaser.Scene {
    map
    layer;
    cursor;
    cam
    speed = 8
   player = new Player();
   money = new Money("money");
   fugu = new Fugu("fugu",5);
   point = new Point("point");
   eventColl = new Event();

    constructor() {
        super("Scene_1");
    }

    create() {
        this.map = this.add.tilemap('map');
        let tiles = this.map.addTilesetImage('level', 'tiles');
        this.layer = this.map.createLayer('map', tiles);
        let walls = this.map.createLayer('walls', tiles);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.map.setCollisionByExclusion([-1, 0]);
        this.map.setCollisionByProperty({collides: true});
        this.matter.world.convertTilemapLayer(walls);
        this.matter.world.createDebugGraphic();

        this.money.setup(this,this.map)
        this.fugu.setup(this,this.map)

        this.point.setup(this,this.map);

        this.player.setup(this,this.map)
        this.cursor = this.input.keyboard.createCursorKeys()
        this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cam = this.cameras.main;
        this.cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cam.startFollow(this.player.body, true);
        this.cam.setZoom(1)
        this.eventColl.CollisionStart(this)
    }

    update(time, delta) {
        this.fugu.draw(this)
        this.player.draw(this)
    }

}