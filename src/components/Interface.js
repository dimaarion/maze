import Animate from "./Animate";
import mobile from "mobile-detect";
import Scena from "./Scena";
import Action from "./Action";

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

    constructor(x, y, w, h, img = "") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img
        this.md = new mobile(window.navigator.userAgent);
    }

    loadImg(p5) {

        //  this.headBarImg.animateLoad(p5, "./img/headBar/Stats_Bar.png");
        //  this.moneyImg.animateLoad(p5, "./img/money/moneySt.png");
        //  this.image.animateLoad(p5, this.img);
        this.playerImg.loadImg(p5);
        this.key.loadImg(p5);
        this.moneyImg.loadImg(p5);
    }


    setup(p5, scene) {

        this.p5 = p5;
        this.scene = scene;
        this.money = window.localStorage.getItem("money");
        if (this.md.mobile()) {
            if (p5.deviceOrientation === p5.LANDSCAPE) {
                this.x = this.scene.procentX(this.x);
                this.y = this.scene.procentY(this.y);
                this.w = this.scene.procentX(this.w);
                this.h = this.scene.procentX(this.h);
            } else {

                this.x = this.scene.procentX(this.x);
                this.y = this.scene.procentY(this.y);
                this.w = this.scene.procentY(this.w);
                this.h = this.scene.procentY(this.h);
            }
        } else {
            this.x = this.scene.procentX(this.x);
            this.y = this.scene.procentY(this.y);
            this.w = this.scene.procentX(this.w);
            this.h = this.scene.procentX(this.h);
        }
    }


    viewImage() {
        try {
            this.p5.image(this.image.img, this.x, this.y, this.w, this.h);
        } catch (error) {

        }
    }

    viewText(txt, x, y, s, f) {
        if (this.md.mobile()) {
            if (this.p5.deviceOrientation === this.p5.LANDSCAPE) {
                x = this.scene.procentX(x);
                y = this.scene.procentX(y);
            } else {
                x = this.scene.procentY(x);
                y = this.scene.procentY(y);
            }
        } else {
            x = this.scene.procentX(x);
            y = this.scene.procentX(y);
        }
        this.p5.push();
        this.p5.fill(f);
        this.p5.textSize(s);
        this.p5.text(txt, x, y);
        this.p5.pop();
    }

    viewMoney(money, x, y) {
        if (this.md.mobile()) {
            if (this.p5.deviceOrientation === this.p5.LANDSCAPE) {
                x = this.scene.procentX(x);
                y = this.scene.procentX(y);
            } else {
                x = this.scene.procentY(x);
                y = this.scene.procentY(y);
            }
        } else {
            x = this.scene.procentX(x);
            y = this.scene.procentX(y);
        }
        this.p5.push();
        this.p5.fill(255);
        money = window.localStorage.getItem("money");
        money = Number.parseInt(money)
        if (!Number.isInteger(money)) {
            money = 0
        }

        this.p5.textSize(this.w);
        this.p5.text(Number.parseInt(money), x, y);
        this.p5.pop();
    }

    headBar() {

    }

    view(p5, player, key) {
        if (p5.width > p5.height) {
            p5.push();
            p5.stroke("#81e6ed");
            p5.strokeWeight(this.scene.size(10, this.scene.scale));
            // p5.line(120, 55, 120 + player.live ,55);
            p5.line(this.scene.size(30, this.scene.scale), this.scene.size(14, this.scene.scale), this.scene.size(30 + player.live, this.scene.scale), this.scene.size(14, this.scene.scale));
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
            p5.text(player.money === 0?this.money:player.money,this.scene.size(48, this.scene.scale),this.scene.size(6.5, this.scene.scale))
            p5.text(player.level,this.scene.size(27.5, this.scene.scale),this.scene.size(6.5, this.scene.scale))
            p5.pop();
            this.playerImg.spriteView(p5, this.scene.size(1, this.scene.scale), this.scene.size(1, this.scene.scale), this.scene.size(25, this.scene.scale), this.scene.size(25, this.scene.scale))

        }

    }
}