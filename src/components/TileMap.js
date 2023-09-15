import Matter from "matter-js";

export default class TileMap {
    body = {};
    scene = {};
    image;
    width;
    height
    // eslint-disable-next-line no-useless-constructor
    constructor(scene, image, width, height) {
        this.scene = scene;
        this.image = image;
        this.width = width;
        this.height = height;
    }

    setup(world) {
        this.body = Matter.Bodies.rectangle(
            this.scene.size(this.scene.scenaWidth / 2, this.scene.scale),
            this.scene.size(this.scene.scenaHeigiht / 2, this.scene.scale),
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