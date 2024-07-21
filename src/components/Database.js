import {getObjects} from "../action";
import Loki from "lokijs";

export default class Database {
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
            autosaveInterval: 1000
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

        return this.db;
    }

    setSound() {
        window.localStorage.setItem("sound", JSON.stringify(this.sound));

    }

    getSound(){
        if(window.localStorage.getItem("sound")){

            return JSON.parse(window.localStorage.getItem("sound"))

        }else {
            return this.sound;
        }
    }

    get() {
        if (window.localStorage.getItem("base")) {
            return JSON.parse(window.localStorage.getItem("base"));
        } else {
            return this.base;
        }


    }

    setPosition(x, y) {
        this.base.x = x;
        this.base.y = y;

        if (window.localStorage.getItem("base")) {
            return window.localStorage.setItem("base", JSON.stringify(this.base))
        } else {
            return this.base;
        }
    }

    setMoney(n) {
        return window.localStorage.setItem("money", n.toString())
    }

    getMoney() {
        if (window.localStorage.getItem("money")) {
            return Number.parseInt(window.localStorage.getItem("money"));
        } else {
            return 0;
        }
    }

    setLevel(n) {
        return window.localStorage.setItem("level", n);
    }

    getLevel() {
        if (window.localStorage.getItem("level")) {
            return window.localStorage.getItem("level");
        } else {
            return "Scene_1";
        }
    }

    setLive(n) {
        return window.localStorage.setItem("live", n.toString())
    }

    getLive() {
        if (window.localStorage.getItem("live")) {
            return Number.parseInt(window.localStorage.getItem("live"));
        } else {
            return 15;
        }
    }

    setKey(n) {
        this.base.key = n;
        if (window.localStorage.getItem("base")) {
            return window.localStorage.setItem("base", JSON.stringify(this.base))
        } else {
            return this.base;
        }
    }

    setImage(n = [], f) {

        this.base.img = n;
        this.base.frame = f;

        if (window.localStorage.getItem("base")) {
            return window.localStorage.setItem("base", JSON.stringify(this.base))
        } else {
            return this.base;
        }
    }

    cleaner() {
        return window.localStorage.clear();
    }
}