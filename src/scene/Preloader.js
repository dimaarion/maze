import Phaser from "phaser";
import Loader from "../components/Loader";


export default class Preloader extends Phaser.Scene {
    loader = new Loader(this);


    constructor() {
        super('Preloader');
    }


    preload() {

       this.loader.create();
//load

        this.load.audio("fon-music", "./asset/music/y2mate.com - Dmitriy Lukyanov_Underwater.mp3");
        this.load.audio("coin", "./asset/music/upali-dengi-na-igrovoy-schet.mp3");
        this.load.audio("attack", "./asset/music/player_damagebody_03.mp3");
        this.load.audio("openCh", "./asset/music/open-magic-reveal-002379-.mp3");
        this.load.audio("open-hp", "./asset/music/hp.mp3");


        this.load.image("power-player", './img/power/player.png');
        this.load.image("power-live", './img/power/3.png');
        this.load.image("money-static", './img/money/moneySt2.png');
        this.load.image("money-plus", './img/gui/buttons/normal/plus.png');
        this.load.image("money-plus-hover", './img/gui/buttons/hover/plus.png');
        this.load.image("achievement", './img/gui/frames/achievement.png');
        this.load.image("cancel", './img/gui/buttons/click/cancel.png');
        this.load.image("video-rek", './img/gui/frames/rek.png');
        this.load.image("video-rek-hover", './img/gui/frames/rekhover.png');
        this.load.image("frame-shop", './img/gui/frames/frameShop.png');
        this.load.image("hp-shop-passive", './img/gui/frames/shopHpPassiv.png');
        this.load.image("hp-shop-active", './img/gui/frames/shopHpActive.png');
        this.load.image("play-game", './img/gui/buttons/normal/play.png');
        this.load.image("play-game-hover", './img/gui/buttons/hover/play.png');
        this.load.image("sound-close", './img/gui/buttons/normal/music-close.png');
        this.load.image("sound-close-hover", './img/gui/buttons/hover/music-close-hover.png');
        this.load.image("sound-btn", './img/gui/buttons/normal/music.png');
        this.load.image("sound-btn-hover", './img/gui/buttons/hover/music.png');
        this.load.image("pause", './img/gui/buttons/normal/pause.png');
        this.load.image("pause-hover", './img/gui/buttons/hover/pause.png');
        this.load.image("frame-close", './img/gui/buttons/normal/cancel.png');
        this.load.image("frame-close-hover", './img/gui/buttons/hover/cancel.png');
        this.load.image("slider", './img/gui/left right botton map.png');
        this.load.image("scrolling", './img/gui/horisontal skrolling map.png');
        this.load.image("volume", './img/gui/buttons/normal/volume.png');


        //joystick
        this.load.image("j1",'./img/power/1.png');
        this.load.image("j2",'./img/power/1-2.png');
        //

        this.load.image('tiles', './img/Tiles/level.png');

        this.load.tilemapTiledJSON('map', './asset/scena/scena.json');
        this.load.tilemapTiledJSON('map2', './asset/scena/scena2.json');
        this.load.tilemapTiledJSON('map3', './asset/scena/scena3.json');
        this.load.tilemapTiledJSON('map4', './asset/scena/scena4.json');
        this.load.tilemapTiledJSON('map5', './asset/scena/scena5.json');
        this.load.tilemapTiledJSON('map6', './asset/scena/scena6.json');
        this.load.tilemapTiledJSON('map7', './asset/scena/scena7.json');
        this.load.tilemapTiledJSON('map8', './asset/scena/scena8.json');
        this.load.tilemapTiledJSON('map9', './asset/scena/scena9.json');


        this.load.spritesheet('player', './img/player/player2.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('money', './img/money/money3.png', {frameWidth: 20, frameHeight: 20});
        this.load.spritesheet('fugu', './img/object/fugu/fuguAll.png', {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('meduza', './img/object/meduza/meduza.png', {frameWidth: 44, frameHeight: 60});
        this.load.spritesheet('meduzaFind', './img/object/meduza/meduzaFind.png', {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('crab', './img/object/crab/crab2.png', {frameWidth: 125, frameHeight: 50});
        this.load.spritesheet('ej', './img/object/еj/ej.png', {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('shark', './img/object/shark/shark.png', {frameWidth: 152, frameHeight: 70});
        this.load.spritesheet("grassAttack","./img/object/grass/grassAttackAll.png",{frameWidth: 50, frameHeight: 100});
        this.load.spritesheet("bubble-potok","./img/object/bubble/bubble-potok.png",{frameWidth: 64, frameHeight: 192});
        this.load.spritesheet("stone","./img/object/bubble/ketre.png",{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("goldFish","./img/object/goldFish/gold-fish.png",{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("wood-rotate","./img/object/skill/wood-rotate.png",{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("wood-rotate-static","./img/object/skill/wood-rotate-static.png",{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("hit-rotate","./img/object/skill/hit-rotate.png",{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("hit-rotate-static","./img/object/skill/hit-rotate-stat.png",{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("hp-rotate","./img/object/skill/hp-rotate.png",{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("hp-rotate-static","./img/object/skill/hp-rotate-static.png",{frameWidth: 64, frameHeight: 64});


        this.load.image("hp", "./img/object/hp.png");
        this.load.image("ej-direct", './img/object/еj/ejD.png');
        this.load.image('ch','./img/object/chest/1.png');
        this.load.image('ch-active','./img/object/chest/2.png');
        this.load.image('angle-pule','./img/object/Anglerfish/puleAngle.png');
        this.load.image('noimage','./img/object/noimage.png');

        // button

       // this.load.image("btn-right", './img/gui/buttons/click/play.png');
    }



    create() {

        this.anims.create({
            key: 'hp-rotate',
            frames: 'hp-rotate',
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'hp-rotate-static',
            frames: 'hp-rotate-static',
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'hit-rotate',
            frames: 'hit-rotate',
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'wood-rotate',
            frames: 'wood-rotate',
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'wood-rotate-static',
            frames: 'wood-rotate-static',
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'hit-rotate-static',
            frames: 'hit-rotate-static',
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'goldFish_L',
            frames: this.anims.generateFrameNumbers('goldFish', {start: 0, end: 59}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'goldFish_R',
            frames: this.anims.generateFrameNumbers('goldFish', {start: 60, end: 120}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'stone',
            frames: "stone",
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'grassAttackPassive',
            frames: this.anims.generateFrameNumbers('grassAttack', {start: 0, end: 17}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'grassAttackActive',
            frames: this.anims.generateFrameNumbers('grassAttack', {start: 18, end: 35}),
            frameRate: 30,
            repeat: 0
        });

        // player
        this.anims.create({
            key: 'left_p',
            frames: this.anims.generateFrameNumbers('player', {start: 6, end: 11}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'right_p',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 5}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 12, end: 17}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start: 18, end: 23}),
            frameRate: 6,
            repeat: -1
        });
        //
        // money
        this.anims.create({
            key: 'money',
            frames: "money",
            frameRate: 30,
            repeat: -1,
        });
        //
        //fugu

        this.anims.create({
            key: "fugu_L",
            frames: this.anims.generateFrameNumbers('fugu', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: "fugu_R",
            frames: this.anims.generateFrameNumbers('fugu', { start: 8, end: 15 }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: "fugu_AL",
            frames: this.anims.generateFrameNumbers('fugu', { start: 16, end: 23 }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: "fugu_AR",
            frames: this.anims.generateFrameNumbers('fugu', { start: 24, end: 31}),
            frameRate: 8,
            repeat: -1,
        })

        //
// shark
        this.anims.create({
            key: "shark_L",
            frames: this.anims.generateFrameNumbers('shark', { start: 0, end: 9 }),
            frameRate: 6,
            repeat: -1,
        });

        this.anims.create({
            key: "shark_R",
            frames: this.anims.generateFrameNumbers('shark', { start: 10, end: 19 }),
            frameRate: 6,
            repeat: -1,
        });

        //
        // meduza
        this.anims.create({
            key: "meduza",
            frames: "meduza",
            frameRate: 20,
            repeat: -1,
        });
        //
        //crab
        this.anims.create({
            key: "crab",
            frames: "crab",
            frameRate: 20,
            repeat: -1,
        });
        //
        // ej
        this.anims.create({
            key: "ej",
            frames: "ej",
            frameRate: 20,
            repeat: -1,
        });
        //
        this.anims.create({
            key: "meduzaFind",
            frames: "meduzaFind",
            frameRate: 6,
            repeat: -1,
        });
        this.scene.start('StartMenu');


    }

    update() {

    }


}