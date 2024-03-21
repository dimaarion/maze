import Sketch from "react-p5";
import {Engine} from "matter-js";
import scena_1 from "../asset/scena/scena_1.json";
import Player from "./Player";

const player = new Player("player");
function preload() {

}

function setup(p5, canvasParentRef) {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    let engine = Engine.create();
    let world = engine.world;
    Engine.run(engine);


}


function draw(p5) {
    p5.background("aqua");
    p5.rectMode(p5.CENTER);
    p5.rect(0,0,1000,1000)
}

function keyPressed() {

}

function keyReleased() {

}
function mousePressed() {

}

function mouseReleased() {

}

export default function World(){
    return  <Sketch setup={setup} keyPressed={keyPressed} mouseReleased={mouseReleased} mousePressed={mousePressed}
                          keyReleased={keyReleased} preload={preload} draw={draw}/>
}