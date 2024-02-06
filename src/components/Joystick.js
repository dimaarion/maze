import Body from "./Body";
import Eye from "./Eye";
import Action from "./Action";

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
    action = new Action();


    setup(x,y,r){
        this.eye = new Eye(x,y,r);
    }

    createJoystick(p5, x = 100, y = 100, w = 256, h = 256, minX = (-1), maxX = 1, minY = (-1), maxY = 1) {
        this.p5 = p5
        this.x = x;
        this.y = y;
        this.xPosJ = x;
        this.yPosJ = y;
        let pos = this.action.getPositions(p5, p5.mouseX,p5.mouseY,this.xPosJ,this.yPosJ);
        this.xPos = pos.x;
        this.yPos = pos.y;
        this.eye.update(p5,p5.mouseX,p5.mouseY);
    }


    view(p5,img1,img2) {
        this.eye.display(p5,img1,img2);
    }



}
