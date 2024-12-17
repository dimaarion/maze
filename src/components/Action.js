export default class Action{

    maps = ['./img/Tiles/mapL1.png','./img/Tiles/mapL2.png','./img/Tiles/mapL3.png','./img/Tiles/mapL4.png','./img/Tiles/mapL5.png']

    arrayCount(c = 0,n) {
        let a = [];
        for (let i = c; i < n; i++) {
            a[i] = i + 1;
        }
        return a;
    }

    percent(num,pr) {
        return num * pr / 100;
    }

    getPositions(p5, x1,y1,x2,y2){
        let x = x1 - x2;
        let y = y1 - y2;
        let position = {x:0,y:0}
        const MAX_DEFLECT = 0.01;
        position.x = p5.map(x, -1, 1, -0.5, MAX_DEFLECT);
        position.y = p5.map(y, -1 ,1, MAX_DEFLECT, 0.5);
        return position;
    }

    getSpeed(pos,speed){
        return pos > speed?speed:pos;
    }





}