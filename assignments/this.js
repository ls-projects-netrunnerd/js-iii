/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. this == window || console
* 2. if (myObj.grow()) this == myObj
* 3. if (constructor.used) this == objInstance
* 4. if (apply().used || call().used) this == explicit
*
* write out a code example of each explanation above
*/

// Principle 1

function sayName(name) {
  console.log(this);
  return name;
}

sayName("D'Artagnan");

// Principle 2

const myObj = {
  greeting: 'Hello',
  sayHello: function(name) {
    console.log(`${this.greeting} my name is ${name}`);
    console.log(this);
  }
};

myObj.sayHello('Ryan');

// code example for New Binding

function CordialPerson(greeter) {
  this.greeting = 'Hello ';
  this.greeter = greeter;
  this.speak = function() {
    console.log(this.greeting + this.greeter);
    console.log(this);
  };
}

const jerry = new CordialPerson('Newman');
const newman = new CordialPerson('Jerry');

newman.speak();
newman.speak();

// Principle 4

function Human(object) {
  this.name = object.name;
  this.age = object.age;
  this.gender = object.gender;
  this.location = object.location;
}

Human.prototype.bioLine = function () {
  return `${this.name} - ${this.age} / ${this.gender} / ${this.location}`;
}

function Nerd(object) {
  Human.call(this, object); // explicit binding
  this.superPowers = object.superPowers;
  this.likes = object.likes;
}

Nerd.prototype = Object.create(Human.prototype);

Nerd.prototype.detailLine = function () {
  return `${this.name} has these powers: ${this.superPowers.join(', ')}.\nAnd likes: ${this.likes.join(', ')}`;
}

const ruby = new Nerd({
  name: 'ruby',
  age: 420,
  gender: 'M',
  location: '127.0.0.1',
  superPowers: ['bash', 'vscode'],
  likes: ['entertainment', 'programming', 'reading']
});

console.log(ruby.bioLine());
console.log(ruby.detailLine());