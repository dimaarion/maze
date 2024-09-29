import {percent} from "../action";

export default class Joystick {

    jst;

    create(t){
        let d = 0;
        let rJs = 50;
        if (t.rexvirtualjoystickplugin) {
            t.joyStick = t.rexvirtualjoystickplugin.add(t, {
                x: window.innerWidth < window.innerHeight ? percent(window.innerWidth, 70) : percent(window.innerWidth, 80),
                y: window.innerWidth > window.innerHeight ? percent(window.innerHeight, 70) : percent(window.innerHeight, 80),
                radius: rJs,
                base: t.add.image(0, 0, 'j1').setScale(0.2, 0.2),
                thumb: t.add.image(0, 0, 'j2').setScale(0.15, 0.15),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true

            }).on('update', () => {
                let cursorKeys = t.joyStick.createCursorKeys();

                if (!t.joyStick.touchCursor.noKeyDown) {
                    if (cursorKeys.left.isDown) {
                        d = 1;
                        t.player.body.play('left', true)
                    } else if (cursorKeys.right.isDown) {
                        d = 0;
                        t.player.body.play('right', true)
                    }
                    t.player.body.body.jX = t.joyStick.forceX;
                    t.player.body.body.jY = t.joyStick.forceY;
                } else {
                    if (d === 1) {
                        t.player.body.play('left_p', true)
                    }
                    if (d === 0) {
                        t.player.body.play('right_p', true)
                    }

                    t.player.body.body.jX = 0;
                    t.player.body.body.jY = 0;
                }


            }, t);
        }

        t.input.on('pointerdown', (pointer) => {

            if (!t.shop && !t.pause && !t.skillBtnActive && pointer.y > window.innerHeight / 3) {
                let touchX = pointer.x;
                let touchY = pointer.y;
                t.joyStick.x = touchX
                t.joyStick.y = touchY
            }

        }, t);

    }




}