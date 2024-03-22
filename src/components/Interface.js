import Animate from "./Animate";
import mobile from "mobile-detect";
import Scena from "./Scena";
import Action from "./Action";
import playerIcon from "../asset/scena/playerIion.json"


export default class Interface {
    headBarImg = new Animate();
    moneyImg = new Animate();
    playerImg = new Animate("./img/power/player.png");
    key = new Animate("./img/object/key.png");
    moneyImg = new Animate("./img/money/moneySt.png");
    txtSize = 0.01;
    x = 0;
    y = 0;
    w = 50;
    h = 20;
    width = 1000;
    height = 100;
    p5;
    img;
    md;
    image = new Animate();
    // eslint-disable-next-line no-dupe-class-members
    scene;
    _gui;
    action = new Action();
    money = 0;
    frameSettings;
    arrowLeftPlayer;
    arrowRightPlayer;
    iconP = [];

    constructor(x, y, w, h, img = "") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img
        this.md = new mobile(window.navigator.userAgent);
    }

    loadImg(p5) {
        this.playerImg.loadImg(p5);
        this.key.loadImg(p5);
        this.moneyImg.loadImg(p5);
        this.frameSettings = p5.loadImage("./img/gui/frames/level select.png");
        this.arrowLeftPlayer = p5.loadImage("./img/gui/buttons/click/left.png");
        this.arrowRightPlayer = p5.loadImage("./img/gui/buttons/click/right.png");
        this.iconP = playerIcon.map((el)=>p5.loadImage(el.img[0]));
    }


    setup(p5, scene) {

        this.p5 = p5;
        this.scene = scene;
        this.money = window.localStorage.getItem("money");
        this.money = Number.parseInt(this.money)
        if (!Number.isInteger(this.money)) {
            this.money = 0
        }
     //  console.log(this.iconP)
       
    }


    

    view(p5, player, key,db) {
       
        if (p5.width > p5.height) {
            p5.push();
            p5.stroke("#81e6ed");
            p5.strokeWeight(this.scene.size(10, this.scene.scale));
            // p5.line(120, 55, 120 + player.live ,55);
            p5.line(this.scene.size(30, this.scene.scale), this.scene.size(14, this.scene.scale), this.scene.size(30 + db.get().liveMax, this.scene.scale), this.scene.size(14, this.scene.scale));
            p5.stroke("red");
            p5.strokeWeight(this.scene.size(7, this.scene.scale));
            p5.line(this.scene.size(30, this.scene.scale), this.scene.size(14, this.scene.scale), this.scene.size(30 + player.body[0].live, this.scene.scale), this.scene.size(14, this.scene.scale));
            p5.noFill();
            p5.strokeWeight(this.scene.size(1.5, this.scene.scale));
            p5.stroke("#81e6ed");
            this.key.spriteView(p5,this.scene.size(22, this.scene.scale), this.scene.size(19, this.scene.scale), this.scene.size(10, this.scene.scale), this.scene.size(10, this.scene.scale));
            this.moneyImg.spriteView(p5,this.scene.size(35, this.scene.scale), this.scene.size(1, this.scene.scale), this.scene.size(8, this.scene.scale), this.scene.size(8, this.scene.scale))
            p5.ellipse(this.scene.size(27, this.scene.scale), this.scene.size(24, this.scene.scale), this.scene.size(10, this.scene.scale), this.scene.size(10, this.scene.scale));
            p5.ellipse(this.scene.size(39, this.scene.scale), this.scene.size(5, this.scene.scale), this.scene.size(9, this.scene.scale), this.scene.size(9, this.scene.scale));
            p5.ellipse(this.scene.size(29, this.scene.scale), this.scene.size(5, this.scene.scale), this.scene.size(9, this.scene.scale), this.scene.size(9, this.scene.scale));
            this.action.arrayCount(player.key).forEach((el)=>this.key.spriteView(p5,this.scene.size(22 + el * 11, this.scene.scale), this.scene.size(19, this.scene.scale), this.scene.size(10, this.scene.scale), this.scene.size(10, this.scene.scale)))
            this.action.arrayCount(key.body.length).forEach((el)=>p5.ellipse(this.scene.size(27 + el * 11, this.scene.scale), this.scene.size(24, this.scene.scale), this.scene.size(10, this.scene.scale), this.scene.size(10, this.scene.scale)))
            p5.noStroke();
            p5.fill(255)
            p5.textSize(this.scene.size(5, this.scene.scale))
            p5.text(p5.round(db.get().money),this.scene.size(48, this.scene.scale),this.scene.size(6.5, this.scene.scale))
            p5.text(db.get().level,this.scene.size(27.5, this.scene.scale),this.scene.size(6.5, this.scene.scale))
            p5.pop();
            this.playerImg.spriteView(p5, this.scene.size(1, this.scene.scale), this.scene.size(1, this.scene.scale), this.scene.size(25, this.scene.scale), this.scene.size(25, this.scene.scale))

        }

    }

    settings(p5){
        p5.image(this.frameSettings,this.scene.procentX(10),this.scene.size(30, this.scene.scale),this.scene.procentX(80),this.scene.size(100, this.scene.scale));
        p5.image(this.arrowLeftPlayer,this.scene.procentX(12),this.scene.size(35, this.scene.scale),this.scene.size(10, this.scene.scale),this.scene.size(10, this.scene.scale));
        p5.image(this.arrowRightPlayer,this.scene.procentX(85.5),this.scene.size(35, this.scene.scale),this.scene.size(10, this.scene.scale),this.scene.size(10, this.scene.scale));
   // this.iconP.map((el,i)=>p5.image(el,this.scene.procentX(85.5 + i * 2),this.scene.size(35, this.scene.scale),this.scene.size(10, this.scene.scale),this.scene.size(10, this.scene.scale)))
    }
}