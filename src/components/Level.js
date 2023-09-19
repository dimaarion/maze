import { useEffect, useRef, useState } from 'react'
import { Engine, Render, World, Events, Composite } from "matter-js";
import Sketch from 'react-p5';
import Scena from './Scena';
import Body from './Body';
import Player from './Player';
import Money from './Money';
import TileMap from './TileMap';
import axios from 'axios';
export default function Level(props) {
    
    let engine;
    let world;
    let render;
    const scena = new Scena();
    scena.scena = props.scena;
    const player = new Player("player");
    const platform = new Body("platform");
    const platformB = new Body("platform_b");
    const money = new Money("money");
    let press = {pressUp:0,pressLeft:0,pressRight:0};
   // let tileMap = new TileMap()
    let tileMap = props.bg.map((el)=>new TileMap(el.name,el.img));


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
      
        

        Events.on(engine.current, "collisionStart", function (event) {
            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
               if(pair.bodyA.label === "money" && pair.bodyB.label === "player" ){
                   player.money++;
                   props.setMoney(player.money)
                   let mst = window.localStorage.getItem("money");
                   mst = Number.parseInt(mst);
                   mst++
                   window.localStorage.setItem("money",mst);
                   Composite.remove(world,pair.bodyA)
               }
            }
        });


       

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


     const preload = (p5)=>{
        tileMap.map((el)=>el.preloadImage(p5))
       
        player.preloadImage(p5,"./img/player/1.png")
     }



    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        scena.create(p5);
        engine = Engine.create();
        render = Render; 
        world = engine.world;
        Engine.run(engine);
       
        let press = {pressUp:0,pressLeft:0,pressRight:0};
       

       
       tileMap.map((el)=>el.setup(world,scena))
       
        platformB.createRect(world, scena);
        platform.createRect(world, scena);
        money.setup(world, scena);
        player.setup(world, scena);






       
      };


      const draw = (p5) => {
        p5.background(255);
      tileMap.map((el)=>el.view(p5))
        player.draw(p5,world,press);
       // money.draw(world);
       platform.viewRect(p5)
      // player.viewRect(p5)
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
      
      };


      


      return <Sketch setup={setup} preload = {preload} draw={draw} />;
}