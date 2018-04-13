

/*
* Class UniformRandomNumber
*
* class UniformRandomNumber
*   generate a random number that not too close to ones generated before
*
* Specification
*

* */

class UniformRandomNumber {
  /*
  * Invariant of the UniformRandomNumber class:
  *
  * 1. the used random is stored in used
  * */

  /* Constructor
  *   Parameters:
  *     max - the max random number will be generated
  *     space - space bewteen numbers
  *   Preconditions:
  *
  */
  constructor(max, space) {
    this.used = [];
    this.max = max;
    this.space = space;
  }

  /*
  * returns the next random, not within +- 5 range of generated ones
  *
  * Preconditions:
  *
  * Throws:
  *   the max number of this method can be called is this.max / this.space
  *   so if this.used.length >= this.max/this.space, the program throws an error
  * */
  next() {
    if (this.used.length >= this.max/this.space) {
      throw new Error("Max number of call time for this method is reached.")
    }

    while (true) {
      let random = Math.floor(Math.random() * Math.floor(this.max));

      if (this.isTooCloseToGenerated(random)) {
        continue;
      }

      this.used.push(random);
      return random;
    }
  }

  isTooCloseToGenerated(random) {
    // check if the random is within +- 5 range of existing numbers
    for (let i = 0; i < this.used.length; i++) {
      if (this.isBetween(this.used[i], this.used[i] + this.space, random) || this.isBetween(this.used[i], this.used[i] - this.space, random) ) {
        return true;
      }

    }

    return false;
  }

  isBetween(x, y, num) {
    if (num >=x && num <= y || num >=y && num <= x) {
      return true;
    }
    else {
      return false;
    }
  }


}

let a = new UniformRandomNumber(100, 5);
console.log(a.next());
console.log(a.next());
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
// console.log(a.next());
// console.log(a.next());
