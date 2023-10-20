import { useState } from "react"

export default class Button {
    x = 0;
    y = 0;
    w = 100;
    h = 100;
    img = "";
    value = "";
    valueActive = false;
    hit = false;
    p5;
    constructor(x, y, w, h, value, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img
        this.value = value;
    }

    loadImage(p5) {
        p5.loadImage(this.img);
    }

    create(p5) {
        this.p5 = p5;
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

    mouseRelass(n = 0){
            this.valueActive = n;
    }



    draw(p5) {
        try {
            p5.image(this.img, this.x, this.y, this.w, this.h);
        } catch (error) {

        }
     

        p5.rect(this.x, this.y, this.w, this.h)
    }

}