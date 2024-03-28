import {getObjects} from "../action";

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

    create(map) {

        this.base.x = getObjects(map, "player")[0].x;
        this.base.y = getObjects(map, "player")[0].y;

        if (!window.localStorage.getItem("base")) {
            window.localStorage.setItem("base", JSON.stringify(this.base))
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

    getMoney(){
        if(window.localStorage.getItem("money")){
            return Number.parseInt(window.localStorage.getItem("money"));
        }else {
            return 0;
        }
    }

    setLevel(n) {
        console.log(n)
        return window.localStorage.setItem("level", n);
    }
    getLevel() {
        if(window.localStorage.getItem("level")){
            return window.localStorage.getItem("level");
        }else {
            return "Scene_1";
        }
    }
    setLive(n) {
        return window.localStorage.setItem("live", n.toString())
    }

    getLive() {
        if(window.localStorage.getItem("live")){
            return Number.parseInt(window.localStorage.getItem("live"));
        }else {
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