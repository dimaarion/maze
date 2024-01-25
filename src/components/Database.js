export default class Database{
    name = 'default';
    base = [{
        id:"default",
        xp:100,
        speed:1,
        attack:10,
        live:50,
        speedLive:0.01,
        liveMax:50,
        x:0,
        y:0,
        width:10,
        height:10,
        level:1,
        leftRest:"./img/player/leftRest.png",
        rightRest:"./img/player/rightRest.png",
        leftSwim:"./img/player/leftSwim.png",
        rightSwim:"./img/player/rightSwim.png",
        money:0,
        frame:6,
        key:0
    }]

    create(world,scene){

        this.base.forEach((el)=>{
            el.x = scene.getObjects("player")[0].x;
            el.y = scene.getObjects("player")[0].y;
        })
        if(!window.localStorage.getItem("base")){
              window.localStorage.setItem("base",JSON.stringify(this.base))
        }
      

    }


    get(){
        if(window.localStorage.getItem("base")){
            return JSON.parse(window.localStorage.getItem("base")).filter((f)=>f.id === this.name)[0];
        }else{
             return this.base.filter((f)=>f.id === this.name)[0];
        }
      
    }

    setPosition(x,y){
        this.base.filter((f)=>f.id === this.name).forEach((el)=>{
            el.x = x;
            el.y = y;
        })
        if(window.localStorage.getItem("base")){
             return window.localStorage.setItem("base",JSON.stringify(this.base))
        }else{
            return [{}]
        }
    }

    setMoney(n){
        this.base.filter((f)=>f.id === this.name).forEach((el)=>{
            el.money = n;
        })
        if(window.localStorage.getItem("base")){
             return window.localStorage.setItem("base",JSON.stringify(this.base))
        }else{
            return [{}]
        }
    }

    setLevel(n){
        this.base.filter((f)=>f.id === this.name).forEach((el)=>{
            el.level = n;
        })
        if(window.localStorage.getItem("base")){
             return window.localStorage.setItem("base",JSON.stringify(this.base))
        }else{
            return [{}]
        }
    }
    setLive(n){
        this.base.filter((f)=>f.id === this.name).forEach((el)=>{
            el.live = n;
        })
        if(window.localStorage.getItem("base")){
             return window.localStorage.setItem("base",JSON.stringify(this.base))
        }else{
            return [{}]
        }
    }

    setKey(n){
        this.base.filter((f)=>f.id === this.name).forEach((el)=>{
            el.key = n;
        })
        if(window.localStorage.getItem("base")){
            return window.localStorage.setItem("base",JSON.stringify(this.base))
        }else{
            return [{}]
        }
    }

    cleaner(){
        return window.localStorage.clear();
    }
}