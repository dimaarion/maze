import Phaser from "phaser";
import {arrayCount, getObjects} from "../action";
export default class Preloader extends Phaser.Scene{
    constructor() {
        super('Preloader');
    }




    preload(){
        this.load.image('tiles', './img/Tiles/level.png');
        this.load.image('tiles2', './img/Tiles/level2.png');
        this.load.tilemapTiledJSON('map', './asset/scena/scena.json');
        this.load.tilemapTiledJSON('map2', './asset/scena/scena22.json');
        this.load.spritesheet('player', './img/player/player2.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('money', './img/money/money2.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('fugu', './img/object/fugu/fuguAll.png', {frameWidth: 200, frameHeight: 150});
    }

    create(){
        this.scene.start('StartMenu');
    }

   update(){

   }


}