import {getObjects} from "../action";
import Loki from "lokijs";
import Player from "../objects/Player";

export default class Database{
    body = [];
    name = 'default';
    base = {
        id: "default",
        xp: 300,
        speed: 1,
        attack: 10,
        live: 300,
        speedLive: 0.01,
        liveMax: 300,
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        level: 1,
        img: ["./img/player/leftRest.png", "./img/player/rightRest.png", "./img/player/leftSwim.png", "./img/player/rightSwim.png"],
        rate: 6,
        money: 0,
        frame: 6,
        key: 0
    }
    sound = {
        music: 20,
        effect: 10,
        pause: false
    }

    db;




    create() {
        this.db = new Loki("db", {
            autosave: true, //setting to save
            autosaveInterval:500

        });

        this.db.loadDatabase({}, () => {
            if (!this.db.getCollection("sound")) {
                 this.db.addCollection("sound");
                //  this.collectionSound.insert({music:1,effect:1})
            }
            if (!this.db.getCollection("player")) {
                this.db.addCollection("player");
            }

        });

        if (!this.db.addCollection("player").findOne({"$loki": 1})) {
            this.db.addCollection("player").insert({level: "Scene_1", money: 0, liveMax: 300, live: 15})
        }
        if(!this.db.addCollection("sound").findOne({"$loki": 1})){
            this.db.addCollection("sound").insert({music:1,effect:1})
        }
        if(!this.db.addCollection("position").findOne({"$loki": 1})){
            this.db.addCollection("position").insert({x:0,y:0});
        }

        return this.db;
    }


    set(name,l = 1,fn = ()=>{}){
        this.db.getCollection(name).chain().find({"$loki": l}).update(fn);
        this.db.saveDatabase();
    }

    get(name,l = 1){
     return  this.db.getCollection(name).findOne({"$loki": l});
    }

}