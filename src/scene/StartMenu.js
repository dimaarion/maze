import Phaser from "phaser"
import Database from "../components/Database";
import Loki from "lokijs";


export default class StartMenu extends Phaser.Scene{
    constructor() {
        super('StartMenu');
    }
    count = 0;
    db = new Database();
    database;

    level = "Scene_1";
    preload(){


    }

    create(){
        this.database = this.db.create();

        this.sound.play("fon-music", {
            loop: true,
        })

        if (window.ysdk && window.ysdk.features.LoadingAPI) {
            window.ysdk.features.LoadingAPI.ready(); // Показываем SDK, что игра загрузилась и можно начинать играть.
        }

        if(this.database.getCollection("player")){
            this.level = this.database.getCollection("player").findOne({"$loki":1}).level;
        }
        this.scene.start(this.level);


    }



}
