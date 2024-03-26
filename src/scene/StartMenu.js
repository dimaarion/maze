import Phaser from "phaser"
export default class StartMenu extends Phaser.Scene{
    constructor() {
        super('StartMenu');
    }
count = 0
    preload(){


    }

    create(){
        this.scene.start('Scene_1');
        this.input.on("pointerdown",()=>{
            this.count = this.count + 1

            if(this.count === 0){

            }else {

            }
            if(this.count > 3){
               // this.count = 0;
            }
            console.log(this.count)
        })

    }



}
