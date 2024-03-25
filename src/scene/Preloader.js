import Phaser from "phaser";
import {arrayCount, getObjects} from "../action";
export default class Preloader extends Phaser.Scene{
    constructor() {
        super('Preloader');
    }

    map
    layer;
    cursor;
    cam
    speed = 8
    fugu = [];


    preload(){
        this.load.image('tiles', './img/Tiles/level.png');
        this.load.tilemapTiledJSON('map', './asset/scena/scena.json');
        this.load.tilemapTiledJSON('map2', './img/Tiles/desert.json');
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