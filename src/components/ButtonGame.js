export default class ButtonGame {

    create(t){
        t.hpPlus = t.rexUI.add.buttons({
            buttons: [
                t.add.image(-1000, 0, 'hp-shop-passive').setScale(0.8, 0.8).setInteractive({
                    cursor: 'pointer',
                })
            ],
        });

        t.videorek = t.rexUI.add.buttons({
            buttons: [
                t.add.image(-1000, 0, "video-rek").setScale(0.3, 0.3).setInteractive({
                    cursor: 'pointer',
                })
            ],
        });

        t.openFrame = t.rexUI.add.buttons({
            buttons: [
                t.add.image(t.sizeMax + 19, 67, "money-plus").setScale(0.06, 0.06).setInteractive({
                    cursor: 'pointer',
                })
            ],
        });

        t.closeShop = t.rexUI.add.buttons({
            buttons: [
                t.add.image(-1000, 0, "frame-close").setScale(0.08, 0.08).setInteractive({
                    cursor: 'pointer',
                })
            ],
        });

        t.soundGamePause = t.rexUI.add.buttons({
            buttons: [
                t.add.image(10, 10, "sound-btn").setScale(0.07, 0.07).setInteractive({
                    cursor: 'pointer',
                })
            ],
            type: "checkboxes"
        });

        t.playGame = t.rexUI.add.buttons({
            buttons: [
                t.add.image(10, 10, "pause").setScale(0.07, 0.07).setInteractive({
                    cursor: 'pointer',
                })
            ],
            type: "button"
        });

    }

    events(t,data){



    }




}