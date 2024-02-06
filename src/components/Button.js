import {useState} from "react"
import Scena from "./Scena";
import mobile from "mobile-detect";

export default class Button {
    x = 0;
    y = 0;
    w = 100;
    h = 100;
    img = "";
    image = {};
    value = "";
    valueActive = false;
    hit = false;
    p5;
    scena = new Scena();
    md;
    active = false;
    released = false;

    constructor(x, y, w, h, value, img = false, active = false, released = false) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img
        this.value = value;
        this.active = active;
        this.released = released;
    }

    loadImage(p5) {
        this.p5 = p5;
        this.image = p5.loadImage(this.img);
    }

    create(p5) {
        this.scena.create(p5);
        this.md = new mobile(window.navigator.userAgent);

        if (this.md.mobile()) {
            if (p5.deviceOrientation === p5.LANDSCAPE) {
                this.x = this.scena.procentX(this.x);
                this.y = this.scena.procentY(this.y);
                this.w = this.scena.procentX(this.w);
                this.h = this.scena.procentX(this.h);
            } else {

                this.x = this.scena.procentX(this.x);
                this.y = this.scena.procentY(this.y);
                this.w = this.scena.procentY(this.w);
                this.h = this.scena.procentY(this.h);
            }
        } else {
            this.x = this.scena.procentX(this.x);
            this.y = this.scena.procentY(this.y);
            this.w = this.scena.procentX(this.w);
            this.h = this.scena.procentX(this.h);
        }

    }


    collidePointRect = function (pointX, pointY, x, y, xW, yW) {
        return pointX >= x && // right of the left edge AND
            pointX <= x + xW && // left of the right edge AND
            pointY >= y && // below the top AND
            pointY <= y + yW;

    };


    mousePress() {
        // this.hit = this.collidePointRect(this.p5.mouseX, this.p5.mouseY, this.x, this.y, this.w, this.h);
        if (this.hit) {
            //  this.valueActive = this.value;
        }
    }

    mouseRelass(n = 0) {
        if (this.hit) {
            ///  this.valueActive = n;
        }

    }


    rect(p5){
        p5.rect(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
    }

    draw(p5) {
        p5.push()
        p5.rectMode(p5.CENTER)
        if (p5.mouseIsPressed === true) {
            this.hit = this.collidePointRect(p5.mouseX, p5.mouseY, this.x, this.y, this.w, this.h);
        } else {
            if (this.released) {
                this.hit = false;
                this.valueActive = false;
            }
        }

        if (this.hit) {
            this.valueActive = this.value;
        } else {
            if (this.active === true) {
                this.valueActive = false;
            }

        }
        if (this.img === false) {
            //p5.rect(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
        } else {
            try {
                // console.log(this.image)
                p5.image(this.image, this.x, this.y, this.w, this.h);
            } catch (error) {

            }
        }
        p5.pop()
    }

}