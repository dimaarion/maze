import Scena from "./Scena";

export default class Interface{
scene = new Scena();

    headBar(p5,money){
        p5.textSize(32);
        p5.fill(255)
        p5.text(money, 100, 100);
    }
}