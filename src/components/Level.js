import { Engine, Composite, Events } from "matter-js";
import Sketch from 'react-p5';
import Scena from './Scena';
import Body from './Body';
import Player from './Player';
import Money from './Money';
import Interface from './Interface';
import Ladder from "./Ladder";

export default function Level(props) {

    let engine;
    let world;
    const interfaces = new Interface();
    const scena = new Scena();
    scena.scena = props.scena;
    const player = new Player("player");
    const platform = new Body("platform");
    const platformB = new Body("platform_b");
    const money = new Money("money");
    const ladder = new Ladder("ladder");
    let press = { pressUp: 0, pressLeft: 0, pressRight: 0, rePress: 1 };
    let tileMap = props.bg.map((el) => new Body(el.name, el.img));

    /*
    
        useEffect(() => {
           
            // mount
        
    
           
            const render = Render.create({
                element: scene.current,
                engine: engine.current,
                options: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    wireframes: false,
                    background: '#000'
                }
            })
    
    
            // run the engine
            Engine.run(engine.current)
            Render.run(render);
            let world = engine.current.world;
            
            scena.create();
           
            const player = new Player("player");
            const platform = new Body("platform");
            const platformB = new Body("platform_b");
            
            const money = new Money("money");
    
            const tileMap = props.bg.map((el)=>new TileMap(scena,el.name,el.img,el.position.x,el.position.y,el.size.w,el.size.h));
            tileMap.map((el)=>el.setup(world))
           
            platformB.createRect(world, scena);
            platform.createRect(world, scena);
            money.setup(world, scena);
            player.setup(world, scena);
          
            
    
           
    
           
    
            Events.on(engine.current,"afterUpdate",(event)=>{
                document.addEventListener("keydown",(e)=>{
               if(e.key === "ArrowUp"){press.pressUp = e.key}
               if(e.key === "ArrowRight"){press.pressRight = e.key}
               if(e.key === "ArrowLeft"){press.pressLeft = e.key}
            
    
                })
                document.addEventListener("keyup",(e)=>{
                    press = {pressLeft:0,pressRight:0,pressUp:0}
                    
               })
    
                player.draw(world,press);
                money.draw(world);
                
            })
    
           
           
            
            // unmount
            return () => {
                // destroy Matter
                Render.stop(render)
                render.canvas.remove()
                render.canvas = null
                render.context = null
                render.textures = {}
            }
    
    
        }, [])
    
    */


    const preload = (p5) => {
        tileMap.map((el) => el.preloadImage(p5));
        player.loadImg(p5);
        money.loadImg(p5);
        interfaces.loadImg(p5);
        ladder.loadImg(p5);
    }



    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        scena.create(p5);
        engine = Engine.create();
        world = engine.world;
        Engine.run(engine);
        let mst = 0;
        Events.on(engine, "collisionStart", function (event) {
            let pairs = event.pairs;

            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA.label === "money" && pair.bodyB.label === "player") {

                    mst = window.localStorage.getItem("money");
                    // eslint-disable-next-line use-isnan
                    if (mst !== NaN) {
                        mst = Number.parseInt(mst);
                        mst++;
                        console.log(mst)
                        window.localStorage.setItem("money", mst);
                        player.money = window.localStorage.getItem("money");
                        Composite.remove(world, pair.bodyA)
                        pair.bodyA.remove = true;
                    }


                }
            }
        });

        Events.on(engine, "collisionActive", function (event) {
            let pairs = event.pairs;

            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA.label === "ladder" && pair.bodyB.label === "player") {
                  //  engine.gravity.y = 0;
                }
            }
        });





        interfaces.setup(p5, scena);
       
        platformB.createRect(world, scena);
        platform.createRect(world, scena);

        tileMap.map((el) => {
            el.sensor = true;
            return el.createRect(world, scena);
        })
        ladder.setup(world,scena);
        money.setup(world, scena);
        player.setup(world, scena);
       
    };





    const keyPressed = (e) => {
        if (e.key === "ArrowUp") { press.pressUp = e.key }
        if (e.key === "ArrowRight") { press.pressRight = e.key }
        if (e.key === "ArrowLeft") { press.pressLeft = e.key }
        press.rePress = 0;
    }

    const keyReleased = (e) => {

        if (e.key === "ArrowUp") { press.pressUp = 0 }
        if (e.key === "ArrowRight") { press.pressRight = 0 }
        if (e.key === "ArrowLeft") { press.pressLeft = 0 }
        press.rePress = 1;

    }





    const draw = (p5) => {
        p5.background("#06082d");
        p5.rectMode(p5.CENTER);
        p5.push();
        player.translates(p5);
        tileMap.map((el) => el.sprite(p5));
        ladder.draw(p5);
        player.draw(p5, world, press);
        money.draw(p5);
        p5.pop();
        //interface
        interfaces.headBar(p5, scena, player.money)

    };





    return <Sketch setup={setup} keyPressed={keyPressed} keyReleased={keyReleased} preload={preload} draw={draw} />;
}