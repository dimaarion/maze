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
    // eslint-disable-next-line no-useless-constructor
    constructor(scene, name, image, x, y, width, height) {
        this.scene = scene;
        this.name = name;
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setup(world) {
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
            this.scene.size(this.x + this.scene.scenaWidth / 2, this.scene.scale),
            this.scene.size(this.y + this.scene.scenaHeigiht / 2, this.scene.scale),
            this.scene.size(this.scene.scenaWidth, this.scene.scale),
            this.scene.size(this.scene.scenaHeigiht, this.scene.scale), {
            isStatic: true,
            isSensor: true,
            render: {
                sprite: {
                    texture: this.image,
                    xScale: this.scene.size(this.scene.scenaWidth, this.scene.scale) / this.width,
                    yScale: this.scene.size(this.scene.scenaHeigiht, this.scene.scale) / this.height
                }
            }
        }

        )
        Matter.World.add(world, [this.body]);

    }
}