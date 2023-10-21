import Animate from "./Animate";
import mobile from "mobile-detect";
import Scena from "./Scena";

export default class Interface {
    headBarImg = new Animate();
    moneyImg = new Animate();
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
    scene = new Scena();

    constructor(x, y, w, h, img = "") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img

    }

    loadImg(p5) {
        this.headBarImg.animateLoad(p5, "./img/headBar/Stats_Bar.png");
        this.moneyImg.animateLoad(p5, "./img/money/moneySt.png");
        this.image.animateLoad(p5, this.img)
    }

    setup(p5) {
        this.p5 = p5;
        this.md = new mobile(window.navigator.userAgent);
        this.scene.create(p5);
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

    viewText() {

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
}