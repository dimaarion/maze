import Phaser from "phaser"
import Database from "../components/Database";


export default class StartMenu extends Phaser.Scene {
    constructor() {
        super('StartMenu');
    }

    count = 0;
    db = new Database();
    database;

    level = "Scene_1";

    preload() {


    }

    create() {
        this.database = this.db.create();

        this.sound.play("fon-music", {
            loop: true,
        })


        try {
            window.YaGames.init()
                .then((ysdk) => {
                    // Сообщаем платформе, что игра загрузилась и можно начинать играть.
                    ysdk.features.LoadingAPI?.ready()
                }).catch(console.error);
        } catch (e) {
            console.log(e);
        }


        if (this.database.getCollection("player")) {
            this.level = this.database.getCollection("player").findOne({"$loki": 1}).level;
        }
        this.scene.start(this.level);


    }


}
