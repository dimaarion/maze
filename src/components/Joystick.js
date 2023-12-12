import Body from "./Body";
import Eye from "./Eye";

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
    eye


    setup(x,y,r){
        this.eye = new Eye(x,y,r);
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
        this.eye.update(p5,p5.mouseX,p5.mouseY);
    }


    view(p5) {
        this.eye.display(p5)
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
