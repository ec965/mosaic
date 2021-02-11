export class Pixel {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  get hex() {
    function toHex(n) {
      let hex = n.toString(16);
      if (hex.length === 1) hex = "0" + hex;
      return hex;
    }
    return "#" + toHex(this.r) + toHex(this.g) + toHex(this.b);
  }
  get hue() {
    // hue is a degree from 0 to 359
    let r = this.r / 255;
    let g = this.g / 255;
    let b = this.b / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let hue;
    switch (max) {
      case r:
        hue = (g - b) / (max - min);
        break;
      case g:
        hue = 2 + (b - r) / (max - min);
        break;
      case b:
        hue = 4 + (r - g) / (max - min);
        break;
      default:
        hue = 0;
    }
    hue *= 60;
    if (hue < 0) hue += 360;
    if (hue >= 360) hue -= 360;

    return hue;
  }
  get luminace() {
    let r = this.r / 255;
    let g = this.g / 255;
    let b = this.b / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    return (max + min) / 2;
  }
  get saturation() {
    let r = this.r / 255;
    let g = this.g / 255;
    let b = this.b / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let lumi = this.luminance;
    if (lumi <= 0.5) {
      return (max - min) / (max + min);
    }
    return (max - min) / (2 - max - min);
  }
}

// this object holds rgb min and max data
// it also ensures that data is within the 0-255 range
// and that min < max
// export class RGBMinMax {
//   constructor(rmin, rmax, gmin, gmax, bmin, bmax){
//     function check(n){
//       if(n < 0){
//         n = 0;
//       }
//       else if (n > 255){
//         n=255;
//       }
//       return n;
//     }

//     function swap(min, max){
//       if(min > max){
//         let temp = min;
//         min = max;
//         max = temp;
//       }
//       return {min, max}
//     }

//     this.rmin = check(rmin);
//     this.rmax = check(rmax);
//     let r = swap(this.rmin, this.rmax);
//     this.rmin = r.min;
//     this.rmax = r.max;

//     this.gmin = check(gmin);
//     this.gmax = check(gmax);
//     let g = swap(this.gmin, this.gmax);
//     this.gmin = g.min;
//     this.gmax = g.max;

//     this.bmin = check(bmin);
//     this.bmax = check(bmax);
//     let b = swap(this.bmin, this.bmax);
//     this.bmin = b.min;
//     this.bmax = b.max;
//   }

// }

export class RandomPixelSquare {
  constructor(
    dimension = null,
    rmin = 0,
    rmax = 255,
    gmin = 0,
    gmax = 255,
    bmin = 0,
    bmax = 255,
    data = null
  ) {
    if (!data) {
      function randInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      this.data = [];
      for (let i = 0; i < dimension; i++) {
        let inner = [];
        for (let j = 0; j < dimension; j++) {
          let r = randInt(rmin, rmax);
          let g = randInt(gmin, gmax);
          let b = randInt(bmin, bmax);
          let p = new Pixel(r, g, b);
          inner.push(p);
        }
        this.data.push(inner);
      }
    } else {
      this.data = data;
    }
  }

  sortHue(length = null) {
    // horizontal
    if (!length || length < 0) length = this.data[0].length;
    if (length > this.data[0].length) length = this.data[0].length;

    let i, j, row;
    for (row of this.data) {
      for (i = 1; i < length; i++) {
        let temp = row[i].hue;
        let temp_item = row[i];
        for (j = i; j > 0 && temp < row[j - 1].hue; j--) {
          row[j] = row[j - 1];
        }
        row[j] = temp_item;
      }
    }
    return this.data;
  }

  sortHueVertical(length = null) {
    if (!length || length < 0) length = this.data.length;
    if (length > this.data.length) length = this.data.length;

    let i, j, k;

    for (j = 0; j < this.data[0].length; j++) {
      for (i = 1; i < this.data.length; i++) {
        let temp = this.data[i][j].hue;
        let temp_item = this.data[i][j];
        for (k = i; k > 0 && temp < this.data[k - 1][j].hue; k--) {
          this.data[k][j] = this.data[k - 1][j];
        }
        this.data[k][j] = temp_item;
      }
    }
    return this.data;
  }
}
