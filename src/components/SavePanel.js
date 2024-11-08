export default class SavePanel{
    scene;
    constructor(scene) {
        this.scene = scene;
    }

    setup(){

    }

    view(){
        if (this.scene.size < 30 || this.scene.shop){
            this.scene.frameShop.setPosition(window.innerWidth / 2, window.innerHeight / 2);
            this.scene.hpPlus.setPosition((window.innerWidth / 2) + 920, (window.innerHeight / 2) + 30);
            this.scene.hpShop.setPosition(window.innerWidth / 2, (window.innerHeight / 2) - 30);
            this.scene.closeShop.setPosition((window.innerWidth / 2) + 1150, (window.innerHeight / 2) - 90);
            this.scene.scene.pause(this.scene.player.sceneKey);
        }

    }
}