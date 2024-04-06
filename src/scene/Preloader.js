import Phaser from "phaser";
import {arrayCount, getObjects} from "../action";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }


    preload() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect((width / 2) - (250 / 1.5), height / 2, 320, 50);
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Загрузка...',
            style: {font: '20px monospace', fill: '#ffffff'}
        });
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {font: '18px monospace', fill: '#ffffff'}

        });
        percentText.setOrigin(0.5, 0.5);
        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {font: '18px monospace', fill: '#ffffff'}
        });
        assetText.setOrigin(0.5, 0.5);
        loadingText.setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            // console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect((width / 2) - (250 / 1.5), height / 2 + 8, 300 * value, 30);
        });
        this.load.on('fileprogress', function (file) {
            //   console.log(file.src);
            assetText.setText('Загрузка ресурса: ' + file.src);
        });

        this.load.on('complete', function () {
           // console.log('Завершено');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
//load
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

        this.load.image("power-player", './img/power/player.png');
        this.load.image("power-live", './img/power/3.png');
        this.load.image("money-static", './img/money/moneySt2.png');

        //joystick
        this.load.image("j1",'./img/power/1.png');
        this.load.image("j2",'./img/power/1-2.png');
        //

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
        this.load.spritesheet('shark', './img/object/shark/sharkAll.png', {frameWidth: 300, frameHeight: 150});
        this.load.image("hp", "./img/object/hp.png");
        this.load.image("ej-direct", './img/object/еj/ejD.png');

        // button

        this.load.image("btn-right", './img/gui/buttons/click/play.png');
    }

    create() {

        this.scene.start('StartMenu');

    }

    update() {

    }


}