export class Pixel {
  constructor(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
  get hex(){
    function toHex(n){
      let hex = n.toString(16);
      if (hex.length === 1) hex = "0" + hex;
      return hex;
    }
    return "#" + toHex(this.r) + toHex(this.g) + toHex(this.b);
  }
  get sum(){
    return parseInt(this.r + this.g + this.b);
  }
  get hue(){ // hue is a degree from 0 to 359
    let r = this.r/255;
    let g = this.g/255;
    let b = this.b/255;
    let hue;
    let max = Math.max(r,g,b);
    let min = Math.min(r,g,b);
    switch(max){
      case r:
        hue = (g-b)/(max-min);
        break;
      case g:
        hue = 2 + (b-r)/(max-min);
        break;
      case b:
        hue = 4 + (r-g)/(max-min);
        break;
      default:
        hue=0;
    }
    hue *= 60;
    if (hue < 0) hue += 360;
    if (hue >= 360) hue -= 360;

    return hue;
  }
}

export class RGBMinMax {
  constructor(rmin, rmax, gmin, gmax, bmin, bmax){
    this.rmin = this.check(rmin);
    this.rmax = this.check(rmax);
    this.gmin = this.check(gmin);
    this.gmax = this.check(gmax);
    this.bmin = this.check(bmin);
    this.bmax = this.check(bmax);
  }

  check(n){
    if(n < 0){
      n = 0;
    }
    else if (n > 255){
      n=255;
    }
    return n;
  }
}

export class RandomPixelSquare {
  constructor(dimension, rgbminmax=new RGBMinMax(0,255,0,255,0,255)){
    this.data = [];
    for(let i=0; i<dimension; i++){
      let inner = [];
      for(let j=0; j<dimension; j++){
        let r = Math.floor(Math.random()*rgbminmax.rmax + rgbminmax.rmin);
        let g = Math.floor(Math.random()*rgbminmax.gmax + rgbminmax.gmin);
        let b = Math.floor(Math.random()*rgbminmax.bmax + rgbminmax.bmin);
        let p = new Pixel(r, g, b);
        inner.push(p)
      }
      this.data.push(inner);
    }
  }
  sortHue(length) { // horizontal
    if (!length || length < 0) length = this.data[0].length;
    if (length > this.data[0].length) length = this.data[0].length;

    let i, j, row;
    for(row of this.data){
      for(i=1; i<length; i++){
        let temp = row[i].hue;
        let temp_item = row[i];
        for(j=i; j > 0 && temp < row[j-1].hue; j--){
          row[j] = row[j-1];
        }
        row[j] = temp_item;
      }
    }
    return this.data;
  }

  sortHueVertical(length){
    if (!length || length < 0) length = this.data.length;
    if (length > this.data.length) length = this.data.length;

    let i,j,k;

    for(j=0; j<this.data[0].length; j++){
      for(i=1;i<this.data.length; i++){
        let temp = this.data[i][j].hue;
        let temp_item = this.data[i][j];
        for(k=i; k > 0 && temp < this.data[k-1][j].hue; k--){
          this.data[k][j] = this.data[k-1][j];
        }
        this.data[k][j] = temp_item;
      }
    }
    return this.data;
  }

}