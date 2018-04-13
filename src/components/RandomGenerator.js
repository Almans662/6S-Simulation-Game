export default class RandomGenerator {

  constructor(size, space) {
    this.arr = [];
    this.size = size;
    this.maxCallNum = Math.floor(size / space);

    for (let i = 0; i < size; i += space) {
      this.arr.push(i);
    }

    this.shuffle();
    this.currentIndex = 0;
  }

  shuffle() {
    let currentIndex = this.arr.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.arr[currentIndex];
      this.arr[currentIndex] = this.arr[randomIndex];
      this.arr[randomIndex] = temporaryValue;
    }

  }

  next() {
    if (this.currentIndex >= this.maxCallNum - 1) {
      // throw new Error("max call num reached.")
      return Math.floor(Math.random() * Math.floor(this.size));

    }

    return this.arr[++this.currentIndex];
  }

}

// let a = new RandomGenerator(100,10);
// a.shuffle();
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.arr);

