import Body from "./Body";

export default class Joystick {
    p5 = {};
    yPos = 0;
    xPos = 0;
    yPosJ = 100;
    xPosJ = 100;
    x = 0;
    y = 0;
    b = new Body();
    w
    h
    minX
    maxX
    minY
    maxY
    label
    snap
    _family
    _type

    constructor(label, x, y, w = 256, h = 256, minX = (-1), maxX = 1, minY = (-1), maxY = 1) {
        this.label = label;
        this.x = x
        this.y = y;
        this.w = w;
        this.h = h;
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;

        this.snap = true; // If true, snaps value back to 0 when not active

        this._family = "slider";
        this._type = "joystick";

    }

    _active() {

        if (this.snap) {
            this.valX = (this.minX + this.maxX)/2;
            this.valY = (this.minY + this.maxY)/2;
            this.val  = {x: this.valX, y:this.valY};
        }
    }

    _drawState(p5 ,fillBg, fillTrack, fillHandle, strokeBg, strokeTrack, strokeHandle) {
        let xpos = p5.map(this.valX, this.minX, this.maxX, 8, this.w-24);
        let ypos = p5.map(this.valY, this.minY, this.maxY, this.h-24, 8);

        p5.push();
        p5.strokeWeight(this._style.strokeWeight);
        p5.rectMode(p5.CORNER);

        // Render bg
        p5.stroke(strokeBg);
        p5.fill(fillBg);
        p5.rect(this.x, this.y, this.w, this.h, this._style.rounding);

        // Render circle (track)
        p5.push();
        p5.stroke(fillTrack);
        let r = this.w*this._style.trackRatio;
        if (this.w > this.h) {
            r = this.h*this._style.trackRatio;
        }

        p5.ellipse(this.x+this.w/2, this.y+this.h/2, r)
        p5.pop();

        // Render handle
        p5.push();
        p5.stroke(strokeHandle);
        p5.fill(fillHandle);

        p5.ellipse(this.x+xpos+8,
            this.y+ypos+8,
            this._style.handleRadius,
            this._style.handleRadius);
        p5.pop();
        p5.pop();
    }

    createJoystick(p5, x = 100, y = 100, w = 256, h = 256, minX = (-1), maxX = 1, minY = (-1), maxY = 1) {
        this.p5 = p5
        this.x = x;
        this.y = y;
        this.xPosJ = x;
        this.yPosJ = y;
        const MAX_DEFLECT = 0.01;
        // this.yPos = p5.map(this.mouseYRatio(), 1, -1, -MAX_DEFLECT, MAX_DEFLECT);
        //   this.xPos = p5.map(this.mouseXRatio(), -1, 1, -MAX_DEFLECT, MAX_DEFLECT);
        this.valX = p5.mouseX - this.xPosJ;
        this.valY = p5.mouseY - this.yPosJ;
      //  this._active()
        this.xPos = p5.map(this.valX, minX, maxX, -0.5, MAX_DEFLECT);
        this.yPos = p5.map(this.valY, minY, maxY, MAX_DEFLECT, 0.5);

    }


    view(p5) {
        p5.push();
        p5.stroke("blue");
        p5.strokeWeight(10);
        p5.noFill()
        p5.ellipse(this.x, this.y, 100, 100);
        p5.pop();
        p5.ellipse(this.xPosJ, this.yPosJ, 100, 100);
    }

    mouseXRatio() {
        return this.mouseRatio(this.p5.mouseX, this.xPosJ);
    }

    mouseYRatio() {
        return -this.mouseRatio(this.p5.mouseY, this.yPosJ);
    }


    mouseRatio(mouse, half) {
        let mouseFromCenter = mouse - half;
        return this.p5.constrain(mouseFromCenter, -half, half) / half;
    }

}
