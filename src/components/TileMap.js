import Matter from "matter-js";

export default class TileMap {
    body = {};
    scene = {};
    image;
    width;
    height;
    x = 0;
    y = 0;
    name = "";
    sprite;

    // eslint-disable-next-line no-useless-constructor
    constructor(name, image) {

        this.name = name;
        this.image = image;
        //  this.x = x;
        //  this.y = y;
        //  this.width = width;
        //  this.height = height;
    }

    preloadImage(p5) {
        this.sprite = p5.loadImage(this.image);
    }

    setup(world, scene) {
        this.scene = scene;
        if (this.scene.getObject(this.name) != undefined) {
            if (this.scene.getObject(this.name).offsetx !== undefined) {
                this.x = this.scene.getObject(this.name).offsetx;
            }
            if (this.scene.getObject(this.name).offsety !== undefined) {
                this.y = this.scene.getObject(this.name).offsety;
            }
            console.log(this.scene.getObject(this.name).offsetx)
        }


        this.body = Matter.Bodies.rectangle(
            this.scene.size(this.x, this.scene.scale),
            this.scene.size(this.y, this.scene.scale),
            this.scene.size(this.scene.scenaWidth, this.scene.scale),
            this.scene.size(this.scene.scenaHeigiht, this.scene.scale), {
            isStatic: true,
            isSensor: true,
            sprite: this.sprite
        }

        )
        Matter.World.add(world, [this.body]);

    }


    view(p5) {
        p5.image(this.body.sprite, 0, 0, this.scena.size(
            this.scena.scena.width * this.scena.scena.tilewidth,
            this.scena.scale
        ), this.scena.size(
            this.scena.scena.height * this.scena.scena.tileheight,
            this.scena.scale
        ));
    }
}