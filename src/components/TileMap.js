import Matter from "matter-js";

export default class TileMap {
    body = {};
    scena = {};
    image = "";
    width = 100;
    height = 100;
    x = 0;
    y = 0;
    name = "";
    sprite = {};
    spriteBg = {};
    level = 0;
    id = 0;
    bg = "";
    pI;
    p5;
    imageView;
    imgRez;
    imageObject = [{}];
    imageBg;
    // eslint-disable-next-line no-useless-constructor
    constructor(image, level, scena, id, bg) {


        this.image = image;
        this.level = level;
        this.scena = scena;
        this.id = id;
        this.bg = bg;
        // this.x = x;
        // this.y = y;
        //  this.width = width;
        //  this.height = height;
    }

    preloadImage(p5) {
        this.p5 = p5;
        this.sprite = p5.loadImage(this.image);
        if (this.bg !== "") {
            this.spriteBg = p5.loadImage(this.bg);
        } else {
            this.spriteBg = false;
        }
    }

    loadBg(p5) {
        this.imageObject = this.scena.getObjectsType("imagelayer");
        this.imageBg = this.imageObject.map((el)=>p5.loadImage(el.image.replace(/\./g, "").replace(/\/{3}/, "").replace(/public/, ".").replace(/png/, ".png").replace(/jpg/, ".jpg")))
    console.log(this.imageBg)
        }

    setup(p5, world, scena) {
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
        if (this.spriteBg) {
            try {
                p5.image(this.spriteBg, -p5.width / 2, -p5.height / 2, this.scena.size(
                    this.scena.scena.width * this.scena.scena.tilewidth,
                    this.scena.scale
                ), this.scena.size(
                    this.scena.scena.height * this.scena.scena.tileheight,
                    this.scena.scale
                ));
            } catch (error) {

            }
        }
    }


    createTile(id, layers) {
        let col = 0;
        let row = 0;
        let index = 0;

        this.pI = this.p5.createImage(this.scena.scenaWidth, this.scena.scenaHeigiht, this.p5.RGBA);
        let center = { x: this.scena.scenaWidth / 2, y: this.scena.scenaHeigiht / 2 }

        this.scena.getObjectData(layers).map((el, i) => {
            col++;
            this.x = col * this.scena.scena.tilewidth;
            this.y = row * this.scena.scena.tileheight;

            if (el > 0) {
                index = el
                this.imgRez = this.sprite.get(
                    ((--el * this.scena.scena.tilewidth) % this.sprite.width),
                    ((--el * this.scena.scena.tileheight / this.sprite.height) * this.scena.scena.tilewidth),
                    this.scena.scena.tilewidth, this.scena.scena.tileheight
                );
                this.imgRez.resize(this.scena.scena.tilewidth, this.scena.scena.tileheight)
                this.pI.set(this.x, this.y, this.imgRez)

            }
            if (col > this.scena.scena.width - 1) {
                col = 0;
                row++;
            }
        })
        this.imageView = this.pI
     
    }



    imageBgView() {
        if(Array.isArray(this.imageBg)){
             this.imageBg.map((el,i)=>this.p5.image(el, this.scena.size(this.imageObject[i].x, this.scena.scale) + this.scena.size(this.imageObject[i].offsetx, this.scena.scale),this.scena.size(this.imageObject[i].y, this.scena.scale) + this.scena.size(this.imageObject[i].offsety, this.scena.scale),this.scena.size(el.width, this.scena.scale),this.scena.size(el.height, this.scena.scale))) 
        }
       
    }

    viewMap() {
        /*  let col = 0;
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
                      this.sprite,
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
  */
        try {
            this.p5.image(this.pI, -this.scena.size(this.scena.scena.tilewidth, this.scena.scale), -this.scena.size(5, this.scena.scale), this.scena.size(this.scena.scenaWidth, this.scena.scale), this.scena.size(this.scena.scenaHeigiht, this.scena.scale))
        } catch (error) {

        }



    }


}