import Phaser from "phaser"
export default class StartMenu extends Phaser.Scene{
    constructor() {
        super('StartMenu');
    }

    preload(){

    }

    create(){
        this.scene.start('Scene_1');
    }

}
