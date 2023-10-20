import Matter from "matter-js";

export default class TileMap {
    body = {};
    scena = {};
    image;
    width;
    height;
    x = 0;
    y = 0;
    name = "";
    sprite;

    // eslint-disable-next-line no-useless-constructor
    constructor() {

      
       // this.image = image;
       // this.x = x;
       // this.y = y;
        //  this.width = width;
        //  this.height = height;
    }

    preloadImage(p5,image) {
        this.sprite = p5.loadImage(image);
    }

    setup(world, scena) {
        this.scena = scena;
        /*
        if (this.scena.getObject(this.name) != undefined) {
            if (this.scena.getObject(this.name).offsetx !== undefined) {
                this.x = this.scena.getObject(this.name).offsetx;
            }
            if (this.scena.getObject(this.name).offsety !== undefined) {
                this.y = this.scena.getObject(this.name).offsety;
            }

        }*/




    }


    view(p5) {
        //  console.log(this.sprite)
        try {
            p5.image(this.sprite, this.x, this.y, this.scena.size(
                this.scena.scena.width * this.scena.scena.tilewidth,
                this.scena.scale
            ), this.scena.size(
                this.scena.scena.height * this.scena.scena.tileheight,
                this.scena.scale
            ));
        } catch (error) {

        }

    }

    viewMap(p5, id, layers, platform) {
        let col = 0;
        let row = 0;
        let index = 0;

        let center = { x: this.scena.scenaWidth / 2, y: this.scena.scenaHeigiht / 2 }

        this.scena.getObjectData(layers).map((el, i) => {
            col++;
            this.x = this.scena.size(col * this.scena.scena.tilewidth, this.scena.scale) - this.scena.size(this.scena.scena.tilewidth, this.scena.scale);
            this.y = this.scena.size(row * this.scena.scena.tileheight, this.scena.scale);

            if (el === id && this.x > 0) {
                p5.push()
                p5.image(
                    this.animate.sprite(),
                    this.x,
                    this.y,
                    this.scena.size(this.scena.scena.tilewidth + 1, this.scena.scale),
                    this.scena.size(this.scena.scena.tileheight + 1, this.scena.scale)
                );
                p5.pop()
            }
            if (col > this.scena.scena.width - 1) {
                col = 0;
                row++;
            }
        });

        // image(0,0, this.scena.size(this.scena, this.scena.scale))
    }


}