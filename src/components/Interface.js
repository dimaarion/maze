import Animate from "./Animate";


export default class Interface {
    scene
    headBarImg = new Animate();
    moneyImg = new Animate();
    txtSize = 0.01;
    x = 0;
    y = 0;
    width = 1000;
    height = 100;
    p5;


    loadImg(p5) {
        this.headBarImg.animateLoad(p5,"./img/headBar/Stats_Bar.png");
        this.moneyImg.animateLoad(p5,"./img/money/moneySt.png");
    }

    setup(p5, scene){
        this.p5 = p5;
      
    }

    headBar(p5,scene, money) {
        this.scene = scene;
        p5.push();
        this.txtSize = this.scene.size(this.txtSize, this.scene.scale);
        this.x = this.scene.size(this.x, this.scene.scale);
        this.y = this.scene.size(this.y, this.scene.scale);
       
        this.headBarImg.spriteView(p5, this.scene.size(this.x, this.scene.scale), this.scene.size(this.y + 5, this.scene.scale), this.scene.size(500, this.scene.scale), this.scene.size(50, this.scene.scale));
        p5.textSize(this.scene.size(15, this.scene.scale));
        p5.fill(255)
        if(money === 0){
            money = window.localStorage.getItem("money");
        }
        this.moneyImg.spriteView(p5,this.scene.size(20, this.scene.scale), this.scene.size(15, this.scene.scale),this.scene.size(30, this.scene.scale), this.scene.size(30, this.scene.scale))
        p5.text(money,  this.scene.size(100, this.scene.scale), this.scene.size(35, this.scene.scale));
        p5.pop();
    }
}