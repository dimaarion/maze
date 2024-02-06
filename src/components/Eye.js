export default class Eye {
    x;
    y;
    size;
    angle = 0.0;


    constructor(tx, ty, ts) {
        this.x = tx;
        this.y = ty;
        this.size = ts;
    }

    update(p5, mx, my) {
        this.angle = p5.atan2(my - this.y, mx - this.x);
    }

    display(p5,img1,img2) {
        p5.push();
        p5.translate(this.x, this.y);
        p5.fill(255);
        try {
            p5.image(img2,-this.size / 2, -this.size / 2, this.size, this.size);
        }catch (e) {

        }
      //  p5.ellipse(0, 0, this.size, this.size);
        p5.rotate(this.angle - 0.5);
        p5.fill(153, 204, 0);
        if(p5.touches[0]){
            try {
                p5.image(img1,this.size / 4, 0, this.size / 2, this.size / 2);
            }catch (e) {

            }
         //   p5.ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
        }else{
            try {
                p5.image(img1,-this.size/4, -this.size/4, this.size / 2, this.size / 2);
            }catch (e) {

            }
           // p5.ellipse(0, 0, this.size / 2, this.size / 2);
        }

        p5.pop();
    }
}