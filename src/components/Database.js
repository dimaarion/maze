export default class Database{
    base = [{
        id:"default",
        xp:100,
        speed:1,
        attack:10,
        x:0,
        y:0,
        width:10,
        height:10,
        level:1,
        leftRest:"./img/player/leftRest.png",
        rightRest:"./img/player/rightRest.png",
        leftSwim:"./img/player/leftSwim.png",
        rightSwim:"./img/player/rightSwim.png",
        frame:6
    },{
        id:"meduza",
        xp:100,
        speed:1,
        attack:20,
        x:0,
        y:0,
        width:20,
        height:20,
        level:1,
        leftRest:"./img/object/meduza2.png",
        rightRest:"./img/object/meduza2.png",
        leftSwim:"./img/object/meduza2.png",
        rightSwim:"./img/object/meduza2.png",
        frame:6
    }]

    add(world,scene){

        this.base.forEach((el)=>{
            el.x = scene.getObjects("player")[0].x;
            el.y = scene.getObjects("player")[0].y;
        })
        window.localStorage.setItem("base",JSON.stringify(this.base))

    }
}