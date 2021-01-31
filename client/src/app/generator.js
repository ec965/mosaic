export class Pixel {
  constructor(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
  get hex(){
    return "#" + this.r.toString(16) + this.g.toString(16) + this.g.toString(16);
  }
}

export class RandomPixelSquare {
  constructor(dimension){
    this.data = [];
    for(let i=0; i<dimension; i++){
      let inner = [];
      for(let j=0; j<dimension; j++){
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        let p = new Pixel(r, g, b);
        inner.push(p)
      }
      this.data.push(inner);
    }
  }

}

// let p = new RandomPixelSquare(100);
// for (inner of p.data){
//   for (i of inner){
//     console.log(i.hex)
//   }
// }