import { useEffect, useRef } from 'react'
import { Engine, Render, World, Events } from "matter-js";
import Scena from './Scena';
import Body from './Body';
import Player from './Player';
import Money from './Money';
import TileMap from './TileMap';
export default function Level(props) {
    const scene = useRef()
    const engine = useRef(Engine.create());
   useEffect(()=>{
    console.log("test")
   },[])

    useEffect(() => {
        // mount
        const scena = new Scena();
        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent'
            }
        })


        // run the engine
        Engine.run(engine.current)
        Render.run(render);
        let world = engine.current.world;
        scena.scena = props.scena;
        scena.create()
        const player = new Player("player");
        const platform = new Body("platform");
        const platformB = new Body("platform_b");
        const money = new Money("money");
        const tileMap = new TileMap(scena,"./img/scene/scena1.png",6200,6200);
        tileMap.setup(world);
        platformB.createRect(world, scena);
        platform.createRect(world, scena);
        money.setup(world, scena);
        player.setup(world, scena);
        Events.on(render,"beforeRender",(event)=>{
            player.draw(world);
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

    return (
        <div ref={scene} style={{ width: '100%', height: '100%', position: "fixed", margin: 0, padding: 0 }} />
    )
}