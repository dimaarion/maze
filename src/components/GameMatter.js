import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World,Events } from 'matter-js'

import Scena from './Scena';
import Player from './PlayerS';
import scena from "../asset/scena/scena.json"
import scena2 from "../asset/scena/scena2.json"
import scena3 from "../asset/scena/scena3.json"


export default function GameMatter(){
    const scene = useRef()
    const isPressed = useRef(false)
    const engine = useRef(Engine.create());
    const world = engine.current.world

    const sceneTileMap = new Scena(scena,1);
    const player = new Player("player");
let countFrame = 0
    useEffect(() => {
        const cw = window.innerWidth
        const ch = window.innerHeight

        player.static = true
        player.createEllipse(world,sceneTileMap)


        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: cw,
                height: ch,
                wireframes: false,
                background: 'transparent'
            }
        })
       console.log(player.body[0])

        Events.on(render, 'beforeRender', function() {

         player.translates()

              //  player.body[0].render.sprite.texture = player.imgArr[Math.floor(countFrame += 0.1) % player.imgArr.length]


        })



        Engine.run(engine.current)
        Render.run(render)

        return () => {
            Render.stop(render)
            World.clear(engine.current.world)
            Engine.clear(engine.current)
            render.canvas.remove()
            render.canvas = null
            render.context = null
            render.textures = {}
        }
    }, [])





    return (
        <div>
            <div ref={scene} style={{ width: '100%', height: '100%' }} />
        </div>
    )
}