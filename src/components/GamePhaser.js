import Phaser from "phaser"
import {useEffect, useRef, useState} from "react";
import Scena from "./Scena";
import level from "../asset/scena/scena.json"
import {getObjects} from "../action";

export default function GamePhaser() {
    const phaserRef = useRef(null);

    useEffect(() => {

        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            physics: {
                default: 'matter',
                matter: {
                    gravity: {
                        x: 0,
                        y: 0
                    },
                    debug: {
                        hullColor: '#ffffff'
                    }
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
        };

        const game = new Phaser.Game(config);

        let player2;
        let player;
        let map
        let layer;
        let cursor;
        let cam
        let speed = 8
        let fugu = []

        function smoothMoveCameraTowards(target, smoothFactor, cam) {
            if (smoothFactor === undefined) {
                smoothFactor = 0;
            }
            cam.scrollX = smoothFactor * cam.scrollX + (1 - smoothFactor) * (target.x - cam.width * 0.5);
            cam.scrollY = smoothFactor * cam.scrollY + (1 - smoothFactor) * (target.y - cam.height * 0.5);
        }

        function preload() {
            this.load.image('tiles', './img/Tiles/level.png');
            this.load.tilemapTiledJSON('map', './asset/scena/scena.json');
            this.load.spritesheet('player', './img/player/player2.png', {frameWidth: 64, frameHeight: 64});
            this.load.spritesheet('money', './img/money/money2.png', {frameWidth: 50, frameHeight: 50});
            this.load.spritesheet('fugu', './img/object/fugu/left.png', {frameWidth: 200, frameHeight: 150});

        }

        function create() {

            map = this.add.tilemap('map');
            let tiles = map.addTilesetImage('level', 'tiles');
            layer = map.createLayer('map', tiles);
            let walls = map.createLayer('walls', tiles);

            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            map.setCollisionByExclusion([-1, 0]);
            map.setCollisionByProperty({collides: true});
            this.matter.world.convertTilemapLayer(walls);
            this.matter.world.createDebugGraphic();
            //   this.matter.world.drawDebug = false;


            this.anims.create({
                key: 'spin',
                frames: "money",
                frameRate: 60,
                repeat: -1,
            })
            this.anims.create({
                key: 'fugu_L',
                frames: "fugu",
                frameRate: 10,
                repeat: -1,
            })

            let money = map.createFromObjects("money", {key: "money"})


            fugu = getObjects(map, "fugu").map((b) => {
                return this.matter.add.sprite(b.x, b.y, "fugu").play("fugu_L").setCircle(b.width / 2, {
                    isSensor: true,
                    label: "fugu",
                    direction: 0,
                    key:"fugu_L"
                }).setFixedRotation();
            })
            getObjects(map, "point").forEach((b) => {
                this.matter.add.rectangle(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, {
                    isSensor: true,
                    label: b.type
                });

            })

            player = this.matter.add.sprite(2201, 284, 'player')
                .setCircle(30, {label: "player"})
                .setFixedRotation()
                .setFrictionAir(0.05)
                .setMass(30)
            this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
                if (bodyA.label === "fugu" && bodyB.label === "right") {
                    bodyA.direction = 1;
                    bodyA.key = "fugu_L";
                }else if (bodyA.label === "fugu" && bodyB.label === "left") {
                    bodyA.direction = 0;
                    bodyA.key = "fugu_R";
                }
                console.log(bodyB.label)
            });

            this.anims.play('spin', money);

            this.anims.create({
                key: 'left_p',
                frames: this.anims.generateFrameNumbers('player', {frames: [6, 7, 8, 9, 10, 11]}),
                frameRate: 6,
                repeat: -1
            });
            this.anims.create({
                key: 'right_p',
                frames: this.anims.generateFrameNumbers('player', {frames: [0, 1, 2, 3, 4, 5]}),
                frameRate: 6,
                repeat: -1
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('player', {frames: [12, 13, 14, 15, 16, 17]}),
                frameRate: 6,
                repeat: -1
            });
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('player', {frames: [18, 19, 20, 21, 22, 23]}),
                frameRate: 6,
                repeat: -1
            });
            cursor = this.input.keyboard.createCursorKeys()


            this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            cam = this.cameras.main;
            cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            cam.startFollow(player, true);
            cam.setZoom(1)
            player.play("right_p")

            this.input.keyboard.on('keydown', function (event) {
                if (event.key === "ArrowRight") {
                    player.play("right")
                }
                if (event.key === "ArrowLeft") {
                    player.play("left")
                }
            });
            this.input.keyboard.on('keyup', function (event) {

                if (event.key === "ArrowRight") {
                    player.play("right_p")
                }
                if (event.key === "ArrowLeft") {
                    player.play("left_p")
                }
            });

        }

        function update() {

            fugu.forEach((el) => {
                if (el.body.direction === 0) {
                    el.setVelocity(1, 0)
                } else {
                    el.setVelocity(-1, 0)
                }
            })


            if (cursor.left.isDown) {
                if (cursor.left.isDown && cursor.down.isDown) {
                    player.setVelocity(-speed, speed)
                } else if (cursor.left.isDown && cursor.up.isDown) {
                    player.setVelocity(-speed, -speed)
                } else {
                    player.setVelocity(-speed, 0)

                }

            }


            if (cursor.right.isDown) {
                if (cursor.right.isDown && cursor.down.isDown) {
                    player.setVelocity(speed, speed)
                } else if (cursor.right.isDown && cursor.up.isDown) {
                    player.setVelocity(speed, -speed)
                } else {
                    player.setVelocity(speed, 0)

                }

            }
            if (cursor.up.isDown) {
                if (cursor.up.isDown && cursor.right.isDown) {
                    player.setVelocity(speed, -speed)
                } else if (cursor.up.isDown && cursor.left.isDown) {
                    player.setVelocity(-speed, -speed)
                } else {
                    player.setVelocity(0, -speed)
                }
            }
            if (cursor.down.isDown) {
                if (cursor.down.isDown && cursor.right.isDown) {
                    player.setVelocity(speed, speed)
                } else if (cursor.down.isDown && cursor.left.isDown) {
                    player.setVelocity(-speed, speed)
                } else {
                    player.setVelocity(0, speed)
                }
            }

            smoothMoveCameraTowards(player, 0.9, cam)

        }

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref={phaserRef}/>;

}