import { useState } from "react"
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
    constructor(x, y, w, h, value, img = "") {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img
        this.value = value;
    }

    loadImage(p5) {
        this.p5 = p5;
        this.image = p5.loadImage(this.img);
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
        this.hit = this.collidePointRect(this.p5.mouseX, this.p5.mouseY, this.x, this.y, this.w, this.h);
        if (this.hit) {
            this.valueActive = this.value;
        }
    }

    mouseRelass(n = 0) {
        if (this.hit) {
            this.valueActive = n;
        }

    }



    draw(p5) {
        if (this.img === "") {
            p5.rectMode(p5.CORNER);
            //  p5.rect(this.p5.mouseX, this.p5.mouseY, this.w, this.h);
            p5.rect(this.x, this.y, this.w, this.h);
        } else {
            try {
               // console.log(this.image)
                p5.image(this.image, this.x, this.y, this.w, this.h);
            } catch (error) {

            }
        }




    }

}