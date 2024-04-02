import Phaser from "phaser";
import {arrayCount, getObjects} from "../action";
export default class Preloader extends Phaser.Scene{
    constructor() {
        super('Preloader');
    }




    preload(){
//load
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

        this.load.image("power-player",'./img/power/player.png');
        this.load.image("power-live",'./img/power/3.png');
        this.load.image("money-static",'./img/money/moneySt2.png');

        this.load.image('tiles', './img/Tiles/level.png');
        this.load.image('tiles2', './img/Tiles/level2.png');
        this.load.image('tiles3', './img/Tiles/level3.png');
        this.load.image('tiles4', './img/Tiles/level4.png');
        this.load.tilemapTiledJSON('map', './asset/scena/scena.json');
        this.load.tilemapTiledJSON('map2', './asset/scena/scena2.json');
        this.load.tilemapTiledJSON('map3', './asset/scena/scena3.json');
        this.load.tilemapTiledJSON('map4', './asset/scena/scena4.json');
        this.load.spritesheet('player', './img/player/player2.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('money', './img/money/money3.png', {frameWidth: 20, frameHeight: 20});
        this.load.spritesheet('fugu', './img/object/fugu/fuguAll2.png', {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('meduza', './img/object/meduza/meduza12.png', {frameWidth: 50, frameHeight: 60});
        this.load.spritesheet('crab', './img/object/crab/crab2.png', {frameWidth: 125, frameHeight: 50});
        this.load.spritesheet('ej', './img/object/еj/ej.png', {frameWidth: 100, frameHeight: 100});
        this.load.image("hp","./img/object/hp.png");
        this.load.image("ej-direct",'./img/object/еj/ejD.png');

        // button

        this.load.image("btn-right",'./img/gui/buttons/click/play.png');
    }

    create(){

        this.scene.start('StartMenu');

    }

   update(){

   }


}