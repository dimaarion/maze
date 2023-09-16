export default class Scena{
    name = "";
    scena = {};
    scenaWidth = 0;
    scenaHeigiht = 0;
    scenaSize = 0;
    scale = 8;

    create() {
        this.scenaWidth = this.scena.width * this.scena.tileheight;
        this.scenaHeigiht = this.scena.height * this.scena.tileheight;
        this.scenaSize =
            this.scena.width * this.scena.tileheight +
            this.scena.height * this.scena.tileheight;
    }

    getObjects(name) {
        let nameObject = name;
        let arrObject = [];
        let layersObjects = this.scena.layers
            .map((x) => x.objects)
            .filter((f) => f !== undefined);
        layersObjects.map((x, i) =>
            x
                .filter((f2) => f2.name === nameObject)
                .map((x2, j) => (arrObject[j] = x2))
        );
        return arrObject;
    }

    getObjectsType(name, type) {
        let layers = this.scena.layers;
        let nameObject = name;
        let arrObject = [];
        let layersObjects = layers
            .map((x) => x.objects)
            .filter((f) => f !== undefined);
        layersObjects.map((x, i) =>
            x
                .filter((f2) => f2.name === nameObject && f2.type === type)
                .map((x2, j) => (arrObject[j] = x2))
        );
        return arrObject;
    }

    getObject(name) {
        return this.scena.layers
            .filter((f, i) => f.name === name)
            .map((x, i) => x)[0];
    }

    getObjectData(name) {
        return this.scena.layers
            .filter((f, i) => f.name === name)
            .map((x, i) => x)[0].data;
    }

    getProperties(name) {
        if (this.getObject(name).properties) {
            return this.getObject(name).properties.map((pos) => pos);
        } else {
            return [];
        }
    }

    procentXY(n) {
        let r = window.innerWidth + window.innerHeight;
        return this.procentIn(r, n)
    }

    procentIn(n, p) {
        return (n / 100) * p;
    }

    procent(x, scale = 1) {
        return this.procentXY(x) * scale;
    }

    procentX(x) {
        let r = window.innerWidth;
        return this.procentIn(r, x);
    }

    procentY(x) {
        let r = window.innerHeight;
        return this.procentIn(r, x);
    }

    procentInv(n, p) {
        return (p * 100) / n;
    }

    size(num, scale) {
        return this.procent(this.procentInv(this.scenaSize, num), scale);
    }

    sizeX(num) {
        return this.procentX(this.procentInv(this.scenaSize, num));
    }

    sizeY(num) {
        return this.procentY(this.procentInv(this.scenaSize, num));
    }

    collideRectRect = function (x, y, w, h, x2, y2, w2, h2) {
        //2d
        //add in a thing to detect rectMode CENTER
        if (
            x + w >= x2 && // r1 right edge past r2 left
            x <= x2 + w2 && // r1 left edge past r2 right
            y + h >= y2 && // r1 top edge past r2 bottom
            y <= y2 + h2
        ) {
            // r1 bottom edge past r2 top
            return true;
        }
        return false;
    };

    collideRectRectVector = function (p1, sz, p2, sz2) {
        return this.collideRectRect(
            p1.x,
            p1.y,
            sz.x,
            sz.y,
            p2.x,
            p2.y,
            sz2.x,
            sz2.y
        );
    };

    collideRectCircle = function (rx, ry, rw, rh, cx, cy, diameter) {
        //2d
        // temporary variables to set edges for testing
        var testX = cx;
        var testY = cy;

        // which edge is closest?
        if (cx < rx) {
            testX = rx; // left edge
        } else if (cx > rx + rw) {
            testX = rx + rw;
        } // right edge

        if (cy < ry) {
            testY = ry; // top edge
        } else if (cy > ry + rh) {
            testY = ry + rh;
        } // bottom edge

        // // get distance from closest edges
        var distance = this.dist(cx, cy, testX, testY);

        // if the distance is less than the radius, collision!
        if (distance <= diameter / 2) {
            return true;
        }
        return false;
    };

    collidePointRect = function (pointX, pointY, x, y, xW, yW) {
        //2d
        if (
            pointX >= x && // right of the left edge AND
            pointX <= x + xW && // left of the right edge AND
            pointY >= y && // below the top AND
            pointY <= y + yW
        ) {
            // above the bottom

            return true;
        }
        return false;
    };
}