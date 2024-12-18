import Phaser from "phaser"
import Database from "../components/Database";
import {get, set, setPrefix} from "lockr";

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

        setPrefix("_maze_")
        if (!get("_maze_music")) {
            set("_maze_music", 1);
        }
        if (!get("_maze_effect")) {
            set("_maze_effect", 1);
        }
        if (!get("_maze_levels")) {
            set("_maze_levels", [
             {
                level: '12',
                x: 100,
                y: 100,
                money: 0,
                chest: 0,
                monster: 0,
                goldFish:0
            }]);
        }


        console.log(get("_maze_levels"))
        this.sound.play("fon-music", {
            loop: true,
            volume:get("_maze_music")
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
