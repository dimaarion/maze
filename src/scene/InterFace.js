import Phaser from "phaser";
import Database from "../components/Database";
import {percent, percentHeight, percentWidth} from "../action";
import Joystick from "../components/Joystick";
import MobileDetect from "mobile-detect";
import Action from "../components/Action";
import SavePanel from "../components/SavePanel";

export default class InterFace extends Phaser.Scene {
    constructor() {
        super("InterFace");
    }

    size = 400;
    sizeSkill = 400;
    x = 0;
    y = 55;
    live = 0;
    player;
    sizeMax = 400;
    money = 0;
    moneyText;
    touchX = 0;
    touchY = 0;

    mX = 0;

    mY = 0;
    playGame;

    soundGame;
    soundGamePause;

    pauseText;
    closeShop;
    frameShop;
    hpShop;
    openFrame;
    shop = false;
    hpPlus;
    videorek;
    pause;
    isSound = false;
    pauseBg;
    soundBtn;

    sliderMusic;

    sliderEffect;
    sliders;
    sliders2;
    cursorKeysTest;
    scrolling;
    scrolling2;
    volume;
    database;

    collectionSound;

    musicGlobal;

    closeBtn = true;
    countBtn = 0;
    db = new Database();

    joyStickGame = new Joystick();

    skillBtn;

    skillBtnActive = false;

    md = new MobileDetect(window.navigator.userAgent);

    action = new Action()

    savePanel = new SavePanel(this);

    create(data) {

        this.database = this.db.create();

        let music = this.sound.get("fon-music");

        music.volume = this.db.get("sound").music;

        data.player.database = this.database;

        data.player.effect = this.db.get("sound").effect;

        this.add.image(23 + this.x, 25, "power-player").setScale(0.1, 0.1);
        this.add.image(61 + this.x, 25, "money-static").setScale(0.5, 0.5);
        this.debug = this.add.graphics();
        this.player = data.player
        this.size = this.player.body.body.live;
        this.sizeMax = this.player.liveStatic;
        this.money = this.player.body.body.money;
        this.moneyText = this.add.text(75, 8, this.money.toString(), {
            font: '30px bold', fill: '#fff', shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 0,
                stroke: false,
                fill: true
            }
        });
        this.levelText = this.add.text(percentWidth(50), 8, "Уровень " + data.player.level, {
            font: '30px bold', fill: '#fff', shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 0,
                stroke: false,
                fill: true
            }
        });
        this.cursorKeysTest = this.input.keyboard.createCursorKeys();

        if (this.md.mobile()) {
            this.joyStickGame.create(this);
        }

        this.pauseBg = this.add.image(0, 0, "frame-shop").setScale(1.5, 1.7).setPosition(-9000, 0);
        this.soundBtn = this.add.image(0, 0, "sound-btn").setScale(0.08, 0.08).setPosition(-9000, 0);
        this.volume = this.add.image(0, 0, "volume").setScale(0.08, 0.08).setPosition(-9000, 0);
        this.frameShop = this.add.image(0, 0, "frame-shop").setScale(1.5, 1.7).setPosition(-9000, 0);
        this.hpShop = this.add.image(0, 0, 'hp').setScale(0.8, 0.8).setPosition(-9000, 0);
        let player = this.player;
        let sizeMax = this.sizeMax;



        this.hpPlus = this.rexUI.add.buttons({
            buttons: [
                this.add.image(-1000, 0, 'hp-shop-passive').setScale(0.8, 0.8).setInteractive({
                    cursor: 'pointer',
                })
            ],
        });

        this.videorek = this.rexUI.add.buttons({
            buttons: [
                this.add.image(-1000, 0, "video-rek").setScale(0.3, 0.3).setInteractive({
                    cursor: 'pointer',
                })
            ],
        });

        this.openFrame = this.rexUI.add.buttons({
            buttons: [
                this.add.image(this.sizeMax + 19, 67, "money-plus").setScale(0.06, 0.06).setInteractive({
                    cursor: 'pointer',
                })
            ],
        });

        this.closeShop = this.rexUI.add.buttons({
            buttons: [
                this.add.image(-1000, 0, "frame-close").setScale(0.08, 0.08).setInteractive({
                    cursor: 'pointer',
                })
            ],
        });

        this.skillBtn = this.rexUI.add.buttons({
            buttons: [
                this.add.image(0, 0, player.skillImg).setScale(0.15, 0.15).setInteractive({
                    cursor: 'pointer',
                })
            ],

        }, this);

        this.skillBtn.on("button.over", () => {
            this.skillBtnActive = true;
        }, this);

        this.skillBtn.on("button.out", () => {
            this.skillBtnActive = false;
        }, this);

        this.skillBtn.on("button.click", () => {
            if (data.player.obj.name) {
                data.player.obj.setPosition(data.player.body.x, data.player.body.y);
            }

        }, this)

        this.closeShop.on("button.click", () => {
            this.shop = false;
            this.pause = false;
            this.closeBtn = true;
            this.countBtn = 0;

            this.db.set("sound", 1, (el) => {
                return el.effect = data.player.effect;
            });
            this.db.set("sound", 1, (el) => {
                return el.music = music.volume;
            });
            this.database.saveDatabase();
            if (window.ysdk) {
                window.ysdk.features.GameplayAPI?.start();
            }
        }, this);


        this.soundGamePause = this.rexUI.add.buttons({
            buttons: [
                this.add.image(10, 10, "sound-btn").setScale(0.07, 0.07).setInteractive({
                    cursor: 'pointer',
                })
            ],
            type: "checkboxes"
        });


        this.playGame = this.rexUI.add.buttons({
            buttons: [
                this.add.image(10, 10, "pause").setScale(0.07, 0.07).setInteractive({
                    cursor: 'pointer',
                })
            ],
            type: "button"
        });

        this.openFrame.on('button.click', function () {
            this.pause = false;
            this.shop = true;
            this.closeBtn = true;
            this.countBtn = 0;
            if (window.ysdk) {
                window.ysdk.features.GameplayAPI?.stop();
            }
        }, this);

        this.scale.on('orientationchange', function (orientation) {
            this.pause = false;
            this.closeBtn = true;
            this.shop = false;
            this.countBtn = 0;
        }, this);


        this.playGame.on("button.click", (button) => {
            this.pause = true;
            this.closeBtn = false;
            this.shop = false;
            let sound = this.sound;
            let database = this.database;
            let db = this.db;
            this.countBtn++
            if (this.countBtn === 1) {
                this.scrolling = this.add.image((window.innerWidth / 2) + 30, (window.innerHeight / 2) - 50, "scrolling").setScale(0.2, 0.2);
                this.scrolling2 = this.add.image((window.innerWidth / 2) + 30, (window.innerHeight / 2) + 50, "scrolling").setScale(0.2, 0.2);
                this.sliders = this.add.image((window.innerWidth / 2) + 30, (window.innerHeight / 2) - 50, "slider").setScale(0.2, 0.2);
                this.sliders2 = this.add.image((window.innerWidth / 2) + 30, (window.innerHeight / 2) + 50, "slider").setScale(0.2, 0.2);


                this.sliders.slider = this.rexSlider.add(this.sliders, {
                    endPoints: [{
                        x: this.sliders.x - 90,
                        y: this.sliders.y
                    },
                        {
                            x: this.sliders.x + 90,
                            y: this.sliders.y
                        }
                    ],
                    value: db.get("sound").music,
                    valuechangeCallback: function (value) {
                        music.volume = value;

                    }
                });


                this.sliders2.slider = this.rexSlider.add(this.sliders2, {
                    endPoints: [{
                        x: this.sliders2.x - 90,
                        y: this.sliders2.y
                    },
                        {
                            x: this.sliders2.x + 90,
                            y: this.sliders2.y
                        }
                    ],
                    value: db.get("sound").effect,
                    valuechangeCallback: function (value) {
                        data.player.effect = value;
                    }
                });

                if (window.ysdk) {
                    window.ysdk.adv.showFullscreenAdv({
                        callbacks: {
                            onOpen: function () {
                                sound.pauseAll();
                                this.scene.resume(player.sceneKey);
                            },
                            onClose: function (wasShown) {

                            },
                            onError: function (error) {
                            }
                        }
                    })
                }
            }

            if (window.ysdk) {
                window.ysdk.features.GameplayAPI?.stop();
            }

        }, this)

        let s;
        this.soundGamePause.on("button.click", (button) => {
            let states = this.soundGamePause.getAllButtonsState();
            for (let key in states) {
                s = states[key]
            }
            if (s) {
                button.setTexture("sound-close")
                this.isSound = true;
            } else {
                button.setTexture("sound-btn")
                this.isSound = false;

            }

        }, this)

        this.soundGamePause.on('button.out', function (button) {

            let states = this.soundGamePause.getAllButtonsState();
            for (let key in states) {
                s = states[key]
            }
            if (s) {
                button.setTexture("sound-close")
            } else {
                button.setTexture("sound-btn")
            }

        }, this);
        this.soundGamePause.on('button.over', function (button) {
            let s;
            let states = this.soundGamePause.getAllButtonsState();
            for (let key in states) {
                s = states[key]
            }
            if (s) {
                button.setTexture("sound-close-hover")
            } else {
                button.setTexture("sound-btn-hover")
            }

        }, this);

        this.playGame.on('button.out', function (button, index, pointer, event) {
            button.setTexture("pause");

        }, this);
        this.playGame.on('button.over', function (button, index, pointer, event) {
            button.setTexture("pause-hover");
        }, this);

        this.openFrame.on('button.out', function (button, index, pointer, event) {
            button.setTexture("money-plus");

        }, this);
        this.openFrame.on('button.over', function (button, index, pointer, event) {
            button.setTexture("money-plus-hover");
        }, this);

        this.closeShop.on('button.out', function (button, index, pointer, event) {
            button.setTexture("frame-close");

        }, this);
        this.closeShop.on('button.over', function (button, index, pointer, event) {
            button.setTexture("frame-close-hover");
        }, this);


        this.hpPlus.on('button.out', function (button, index, pointer, event) {
            button.setTexture("hp-shop-passive");

        }, this);
        this.hpPlus.on('button.over', function (button, index, pointer, event) {
            button.setTexture("hp-shop-active");
        }, this);
        this.videorek.on('button.out', function (button, index, pointer, event) {
            button.setTexture("video-rek");

        }, this);
        this.videorek.on('button.over', function (button, index, pointer, event) {
            button.setTexture("video-rek-hover");
        }, this);

        function liveAddSave(database, player, coin = 100) {
            if (player.body.body.live < sizeMax) {
                if (player.body.body.live > sizeMax) {
                    player.body.body.live = sizeMax
                } else {
                    player.body.body.live += coin;
                }

            }
            if (player.body.body.live > sizeMax) {
                player.body.body.live = sizeMax
            }
            if (database.getCollection("player")) {
                database.getCollection("player").chain().find({"$loki": 1}).update((doc) => doc.live = player.body.body.live);
                database.saveDatabase();
            }

        }

        this.videorek.on("button.click", () => {
            //   this.isSound = true;
            //  let sound = this.sound;
            if (player.body.body.live < sizeMax) {
                if (window.ysdk) {
                    window.ysdk.adv.showRewardedVideo({
                        callbacks: {
                            onOpen: function () {
                                //sound.pauseAll();
                                // this.scene.pause(player.sceneKey);
                            },
                            onRewarded: () => {
                                liveAddSave(this.database, player, 100);
                            }, onClose: () => {

                            }, onError: () => {

                            }

                        }
                    })
                }
            }


        })


        this.hpPlus.on("button.click", () => {

            function setMoney(db) {
                if (player.body.body.live < sizeMax) {
                    if (player.body.body.live > sizeMax) {
                        player.body.body.live = sizeMax
                    } else {
                        player.body.body.live += 100;
                        player.body.body.money -= 100;
                    }

                }
                if (player.body.body.live > sizeMax) {
                    player.body.body.live = sizeMax
                }
                db.getCollection("player").chain().find({"$loki": 1}).update((doc) => {
                    doc.money = player.body.body.money;
                    doc.live = player.body.body.live;
                    return doc;
                });
                db.saveDatabase();
            }

            if (player.body.body.money > 100) {
                setMoney(this.database);
            }

        }, this)

        if (player.sceneKey === "Scene_1") {
            liveAddSave(this.database, player, this.sizeMax)
        }


    }


    update(time, delta) {


        this.skillBtn.buttonGroup.buttons[0].setTexture(this.player.skillImg)
        this.skillBtn.setPosition(percentWidth(80), percentHeight(80))

        this.moneyText.setText(this.player.body.body.money.toString());
        this.scene.bringToTop();
        this.debug.clear();
        this.size = this.player.body.body.live;
        this.debug.fillStyle(0xE10000);
        this.debug.lineStyle(5, 0x87eef3);
        let colorSkill = Phaser.Display.Color.GetColor(255, 255, 0);
        if (this.size < 9) {
            this.size = 15;
        }
        this.debug.fillRect(4 + this.x, 4 + this.y, this.size - 6, 20);
        this.debug.strokeRoundedRect(this.x, this.y, this.sizeMax, 25, 10);
        this.debug.fillStyle(colorSkill);
        this.debug.fillRect(4 + this.x, 30 + this.y, this.player.sizeSkill, 10);

        let pointer = this.input.activePointer;
        if (pointer.isDown) {
            this.touchX = pointer.x;
            this.touchY = pointer.y;
        }


        if (this.shop) {
            this.frameShop.setPosition(window.innerWidth / 2, window.innerHeight / 2);
            this.hpShop.setPosition(window.innerWidth / 2, (window.innerHeight / 2) - 30);
            this.hpPlus.setPosition((window.innerWidth / 2) + 920, (window.innerHeight / 2) + 30);
            this.videorek.setPosition((window.innerWidth / 2) + 1080, (window.innerHeight / 2) + 30);


        } else {
            this.frameShop.setPosition(-1000, 0);
            this.hpShop.setPosition(-1000, 0);
            this.hpPlus.setPosition(-1000, 0);
            this.videorek.setPosition(-1000, 0);

        }

        if (this.pause) {
            this.pauseBg.setPosition(window.innerWidth / 2, window.innerHeight / 2);
            this.soundBtn.setPosition((window.innerWidth / 2) - 110, (window.innerHeight / 2) - 50);
            this.volume.setPosition((window.innerWidth / 2) - 110, (window.innerHeight / 2) + 50);

        } else {
            this.pauseBg.setPosition(-1000, 0);
            this.soundBtn.setPosition(-1000, 0);
            this.volume.setPosition(-1000, 0);
        }

        if (this.pause || this.shop) {
            this.closeShop.setPosition((window.innerWidth / 2) + 1150, (window.innerHeight / 2) - 90);
            this.scene.pause(this.player.sceneKey);
        } else {
            this.scene.resume(this.player.sceneKey);
            this.closeShop.setPosition(-1000, 0);

        }

        if (window.innerWidth < 500) {
            this.soundGamePause.setPosition((window.innerWidth / 2) - 30, 20);
            this.playGame.setPosition((window.innerWidth / 2) + 30, 20);
            this.levelText.setPosition(percentWidth(80), 10)
            this.levelText.setText("Ур. " + this.player.level)
        } else {
            this.soundGamePause.setPosition((window.innerWidth) - 40, 20);
            this.playGame.setPosition((window.innerWidth) - 100, 20);
            this.levelText.setPosition(percentWidth(50) - 50, 8);
            this.levelText.setText("Уровень " + this.player.level)
        }

        if (this.isSound || this.shop || this.pause) {
            this.sound.pauseAll();
        } else {
            this.sound.resumeAll();
        }

        if (this.closeBtn) {
            if (this.sliders) {
                this.sliders.destroy();
                this.sliders2.destroy();
                this.scrolling.destroy();
                this.scrolling2.destroy();
            }

        }


    }
}