import Action from "./Action";

export default class Bubble extends Action {
    bubbles = [];//holds bubble objects
    bubbleNum = 100;//# of bubbles?
    xVariation = 2;//how much the bubbles move in the x direction
    p5;
    speed = 1;
    scena;
    x = [window.innerWidth];
    y = [window.innerHeight];
    xs = [0];
    ys = [0];
    parametr = 0

    setup(p5, scena,j) {
        this.p5 = p5;
        this.scena = scena;
    
        //frameRate(10);
        //make random bubble objects {x,y,size,speed}
        for (var i = 0; i < this.bubbleNum; i++) {
            this.bubbles[i] = {
                x: this.parametr === 0?this.p5.random(this.scena.size(this.scena.scale),this.scena.size(this.x, this.scena.scale)):this.p5.random(this.xs[j], this.x[j]),
                y: this.parametr === 0?this.p5.random(this.scena.size(this.scena.scale), this.scena.size(this.y, this.scena.scale)):this.p5.random(this.y[j]),
                size: this.p5.random(3, 10),
                speed: 0
            };
        }
        //set color of the bubbles 'feel free to play with opacity, I think .4 looks nice'
    }


    view(n) {

        this.bubbles.forEach((bub, index) => {
            this.moveBubbles(bub);
            if (bub.y < -10) {
                this.newBubble(index,n)
            };
        });
    }
    //makes a new bubble at a specified index once its off screen
    newBubble(index,j) {
        this.bubbles[index] = {
            x: this.parametr === 0?this.p5.random(this.scena.size(this.scena.scale),this.scena.size(this.x, this.scena.scale)):this.p5.random(this.xs[j], this.x[j]),
            y: this.parametr === 0?this.p5.random(this.scena.size(this.scena.scale), this.scena.size(this.y, this.scena.scale)):this.p5.random(this.y[j]),
            size: this.p5.random(3, 10),
            speed: 0
        };
    }

    //move the bubbles based on their size
    moveBubbles(bubble) {
        bubble.x += this.p5.random(-this.xVariation, this.xVariation);
        bubble.speed += bubble.size / 100;
        bubble.y -= this.speed;
        //draw the bubble NOTE they must be integer values to draw to the canvas
        this.p5.push();
        this.p5.fill("#ADD8E6");
        this.p5.stroke("#fff");
        let x = Math.round(bubble.x);
        let y = Math.round(bubble.y);
        let w = Math.round(bubble.size);
        let h = Math.round(bubble.size)
        this.p5.ellipse(
            x,
            y,
            w,
            h
        );
        this.p5.fill("#fff");
        this.p5.ellipse(
            x + (w * 0.2),
            y - (w * 0.25),
            w / 8,
            h / 8
        );
        this.p5.pop();
    }

}