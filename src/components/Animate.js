export default class Animate {
  name;
  img;
  x;
  y;
  w;
  h;
  xr = 0;
  xp = 0;
  frame = 0;
  widthI = 100;
  heightI = 100;
  widthSp = 0;
  format = 0;
  rate = 1;
  orientation = 0;
  p5;
  animated = true;
  last = false;
  newArrImg = [];
  arrImg = [];
  image;
  world;
  speed = 2;
  count = 0;
  arrSprite = [];
  arrAnimate = [];
  position = [{ x: 0, y: 0 }];
  imageAll = [
    {
      width: 0,
      height: 0,
    },
  ];


  // eslint-disable-next-line no-useless-constructor
  constructor(name, frame = 0) {
    if (frame > 0) {
      this.frame = frame;
      this.animated = true;
    } else {
      this.animated = false;
    }

    if (Array.isArray(name)) {
      this.name = name;
    } else {
      this.name = name;
    }

  }


  loadImg(p5) {

    if (Array.isArray(this.name)) {
      this.img = this.name.map((el) => p5.loadImage(el));

    } else {
      this.img = p5.loadImage(this.name);

    }

  }



  animateLoad(p5, name, frame = 0) {
    this.name = name;
    if (frame > 0) {
      this.frame = frame;
      this.animated = true;
    } else {
      this.animated = false;
    }

    this.img = p5.loadImage(this.name);
  }




  animateA(p5, name, frame, format, x, y, w, h) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.frame = frame;
    this.format = format;
    this.img = p5.loadImage(this.name);
  }




  animateB(p5, name, frame, x, y, w, h) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.frame = frame;
    this.img = p5.loadImage(this.name);
  }





  animateC(p5, name, frame, format) {
    this.name = name;
    this.frame = frame;
    this.format = format;
    this.img = p5.loadImage(this.name);
  }




  animateD(p5, name, frame = 0) {
    this.name = name;
    this.frame = frame;
    this.animated = true;
    this.img = p5.loadImage(this.name);
  }




  animateE(p5, name) {
    this.name = name;
    this.animated = false;

    if (typeof name === "string") {

      this.img = p5.loadImage(this.name);
    } else {
      this.img = this.name;
    }

  }




  animateAll(p5, name, frame) {
    if (Array.isArray(name)) {
      this.arrAnimate = name.map((img, i) => {
        return { image: p5.loadImage(img), frame: frame[i] };
      });
    }
  }



  setupTest() {

    if (Array.isArray(this.img)) {
     this.img = this.img.map((el) => {
        if (el && this.animated) {
          this.newArrImg = new Array(this.frame);
          this.widthI = el.width;
          this.heightI = el.height;

          if (this.orientation === 0) {
            if (this.widthSp !== 0) {
              el.resize(this.frame * this.widthSp, this.heightI);
            } else {
              this.widthSp = this.widthI / this.frame;
            }
          } else {
            if (this.widthSp !== 0) {
              el.resize(this.widthI, this.frame * this.widthSp);
            } else {
              this.widthSp = this.heightI / this.frame;
            }
          }

          for (let i = 0; i < this.newArrImg.length; i++) {
            if (this.orientation === 0) {
              this.newArrImg[i] = el.get(
                i * this.widthSp,
                0,
                this.widthSp,
                this.heightI
              );
            } else {
              this.newArrImg[i] = el.get(
                0,
                i * this.widthSp,
                this.widthI,
                this.widthSp
              );
            }
          }

          return this.newArrImg;
        }else{
          return this.img;
        } 
      })
    } else {

      if (this.animated && this.img) {
        this.newArrImg = new Array(this.frame);

        this.widthI = this.img.width;
        this.heightI = this.img.height;

        if (this.orientation === 0) {
          if (this.widthSp !== 0) {
            this.img.resize(this.frame * this.widthSp, this.heightI);
          } else {
            this.widthSp = this.widthI / this.frame;
          }
        } else {
          if (this.widthSp !== 0) {
            this.img.resize(this.widthI, this.frame * this.widthSp);
          } else {
            this.widthSp = this.heightI / this.frame;
          }
        }

        for (let i = 0; i < this.newArrImg.length; i++) {
          if (this.orientation === 0) {
            this.newArrImg[i] = this.img.get(
              i * this.widthSp,
              0,
              this.widthSp,
              this.heightI
            );
          } else {
            this.newArrImg[i] = this.img.get(
              0,
              i * this.widthSp,
              this.widthI,
              this.widthSp
            );
          }
        }
      }
    }



  }

  setupAnimate() {

  
    if (Array.isArray(this.img)) {
      this.img = this.img.map((el) => {
         if (el && this.animated) {
           this.newArrImg = new Array(this.frame);
           this.widthI = el.width;
           this.heightI = el.height;
 
           if (this.orientation === 0) {
             if (this.widthSp !== 0) {
               el.resize(this.frame * this.widthSp, this.heightI);
             } else {
               this.widthSp = this.widthI / this.frame;
             }
           } else {
             if (this.widthSp !== 0) {
               el.resize(this.widthI, this.frame * this.widthSp);
             } else {
               this.widthSp = this.heightI / this.frame;
             }
           }
 
           for (let i = 0; i < this.newArrImg.length; i++) {
             if (this.orientation === 0) {
               this.newArrImg[i] = el.get(
                 i * this.widthSp,
                 0,
                 this.widthSp,
                 this.heightI
               );
             } else {
               this.newArrImg[i] = el.get(
                 0,
                 i * this.widthSp,
                 this.widthI,
                 this.widthSp
               );
             }
           }
 
           return this.newArrImg;
         }else{
           return this.img;
         } 
       })
     } else {
 
       if (this.animated && this.img) {
         this.newArrImg = new Array(this.frame);
 
         this.widthI = this.img.width;
         this.heightI = this.img.height;
 
         if (this.orientation === 0) {
           if (this.widthSp !== 0) {
             this.img.resize(this.frame * this.widthSp, this.heightI);
           } else {
             this.widthSp = this.widthI / this.frame;
           }
         } else {
           if (this.widthSp !== 0) {
             this.img.resize(this.widthI, this.frame * this.widthSp);
           } else {
             this.widthSp = this.heightI / this.frame;
           }
         }
 
         for (let i = 0; i < this.newArrImg.length; i++) {
           if (this.orientation === 0) {
             this.newArrImg[i] = this.img.get(
               i * this.widthSp,
               0,
               this.widthSp,
               this.heightI
             );
           } else {
             this.newArrImg[i] = this.img.get(
               0,
               i * this.widthSp,
               this.widthI,
               this.widthSp
             );
           }
         }
       }
     }
 


  }






  setupAnimateAll() {
    this.arrSprite = this.arrAnimate.map((img) => {
      return img.map((el) => {
        let arrImage = new Array(el.frame);
        if (this.orientation === 0) {
          if (this.widthSp !== 0) {
            el.image.resize(el.frame * this.widthSp, this.heightI);
          } else {
            this.widthSp = this.widthI / el.frame;
          }
        } else {
          if (this.widthSp !== 0) {
            el.image.resize(this.widthI, el.frame * this.widthSp);
          } else {
            this.widthSp = this.heightI / el.frame;
          }
        }
        for (let i = 0; i < arrImage.length; i++) {
          if (this.orientation === 0) {
            arrImage[i] = el.image.get(
              i * this.widthSp,
              0,
              this.widthSp,
              this.heightI
            );
          } else {
            arrImage[i] = el.image.get(
              0,
              i * this.widthSp,
              this.widthI,
              this.widthSp
            );
          }
        }
        return [
          {
            image: el.image,
            width: el.image.width,
            height: el.image.height,
            frame: el.frame,
            widthSp: this.heightI / el.frame,
            arrImage: arrImage,
          },
        ];
      });
    });
  }







  params() {
    if (this.format === 0) {
      this.xr += 1;
      if (this.xr > this.rate) {
        this.xp = this.xp + 1;
        this.xr = 0;
      }
      if (this.xp > this.frame - 1) {
        this.xp = 0;
        this.count += 1;
      }

      if (this.count > this.position.length - 1) {
        this.count = 0;
      }
    } else if (this.format === 1) {
      this.xr += 1;
      if (this.xr > this.rate) {
        this.xp = this.xp + 1;
        this.xr = 0;
      }
      if (this.xp > this.frame - 1) {
        this.xp = this.xp - 1;
      }
    } else if (this.format === 2) {
      this.xr += 1;

      if (this.xr > this.rate) {
        if (this.xp > 0) {
          this.xp = this.xp - 1;
        }

        this.xr = 0;
      }

      if (this.xp < this.frame - 1) {
        //this.xp = 0;
      }
    } else if (this.format === 3) {
      this.xr += 1;
      if (this.xr > this.rate) {
        this.xp = this.xp - 1;
        this.xr = 0;
      }
      if (this.xp <= 0) {
        this.xp = this.frame - 1;
      }
    }
  }







  sprite(p5) {
    if (this.img) {
      if (this.animated) {
        let speed = p5.floor(p5.frameCount / 2) ;
      if(this.format === "one"){
        return this.img[0][p5.frameCount > this.img[0].length?this.img[0].length-1: p5.frameCount % this.img[0].length];
      }else{
        return this.newArrImg[speed % this.newArrImg.length];
      } 
        
      }else {
        return this.img;
      }
    }
  }








  getImage(p5, x, y, w, h) {
    // console.log(this.newArrImg[0])
    p5.image(this.newArrImg[0]);
  }







  spriteRect(w, h) {
    try {
      if (this.animated) {
        this.params();
        this.newArrImg[this.xp].resize(w, h);
        return this.newArrImg[this.xp];
      } else {
        this.newArrImg[0].resize(w, h);
        return this.newArrImg[0];
      }
    } catch (Exception) {
      return this.img;
    }
  }







  spriteEllipse(w) {
    try {
      if (this.animated) {
        this.params();
        this.newArrImg[this.xp].resize(w, w);
        return this.newArrImg[this.xp];
      } else {
        this.newArrImg[0].resize(w, w);
        return this.newArrImg[0];
      }
    } catch (Exception) {
      return this.img;
    }
  }








  spriteInt(w, h, i) {
    try {
      if (this.animated) {
        this.newArrImg[i].resize(w, h);
        return this.newArrImg[i];
      } else {
        this.img.resize(w, w);
        return this.img;
      }
    } catch (Exception) {
      return this.img;
    }
  }








  draw(p5) {
    this.params();
    try {
      if (this.animated) {
        p5.image(this.newArrImg[this.xp], this.x, this.y, this.w, this.h);
      }
    } catch (Exception) {
      console.log("error");
    }
  }









  spriteView(p5, x, y, w, h) {
    try {
      p5.image(this.sprite(p5), x, y, w, h);
    } catch (error) {

    }

  }





}
