import Phaser from "phaser"
import Database from "../components/Database";
export default class StartMenu extends Phaser.Scene{
    constructor() {
        super('StartMenu');
    }
    count = 0;
    db = new Database();
    preload(){


    }

    create(){
        if (window.ysdk && window.ysdk.features.LoadingAPI) {
            window.ysdk.features.LoadingAPI.ready(); // Показываем SDK, что игра загрузилась и можно начинать играть.

        }
    //   this.db.cleaner()


        this.scene.start(this.db.getLevel());
        this.input.on("pointerdown",()=>{

            this.count = this.count + 1

            if(this.count === 0){

            }else {

            }
            if(this.count > 3){
               // this.count = 0;
            }

        })

    }



}
