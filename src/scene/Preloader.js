import Phaser from "phaser";
import {arrayCount, getObjects} from "../action";
export default class Preloader extends Phaser.Scene{
    constructor() {
        super('Preloader');
    }




    preload(){

        this.load.image("power-player",'./img/power/player.png');
        this.load.image("power-live",'./img/power/3.png');
        this.load.image("money-static",'./img/money/moneySt2.png');

        this.load.image('tiles', './img/Tiles/level.png');
        this.load.image('tiles2', './img/Tiles/level2.png');
        this.load.tilemapTiledJSON('map', './asset/scena/scena.json');
        this.load.tilemapTiledJSON('map2', './asset/scena/scena22.json');
        this.load.spritesheet('player', './img/player/player2.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('money', './img/money/money3.png', {frameWidth: 20, frameHeight: 20});
        this.load.spritesheet('fugu', './img/object/fugu/fuguAll.png', {frameWidth: 200, frameHeight: 150});
        this.load.spritesheet('meduza', './img/object/meduza/meduza12.png', {frameWidth: 50, frameHeight: 60});
        this.load.spritesheet('crab', './img/object/crab/crab2.png', {frameWidth: 125, frameHeight: 50});
        this.load.spritesheet('ej', './img/object/еj/ej.png', {frameWidth: 100, frameHeight: 100});
        this.load.image("hp","./img/object/hp.png");
        this.load.image("ej-direct","./img/object/еj/ejD.png");
    }

    create(){

        this.scene.start('StartMenu');

    }

   update(){

   }


}