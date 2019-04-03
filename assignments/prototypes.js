/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject(o) {
  this.createdAt = o.createdAt;
  this.name = o.name;
  this.dimensions = o.dimensions;
}

GameObject.prototype.destroy = function (n) {
  return `${this.name} was removed from the game.`; 
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(o) {
  GameObject.call(this, o);
  this.healthPoints = o.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(o) {
  CharacterStats.call(this, o);
  this.team = o.team;
  this.weapons = o.weapons;
  this.language = o.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}`;
}
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  // console.log(mage.createdAt); // Today's date
  // console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  // console.log(swordsman.healthPoints); // 15
  // console.log(mage.name); // Bruce
  // console.log(swordsman.team); // The Round Table
  // console.log(mage.weapons); // Staff of Shamalama
  // console.log(archer.language); // Elvish
  // console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  // console.log(mage.takeDamage()); // Bruce took damage.
  // console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  function Fighter(o) {
    Humanoid.call(this, o);
    this.hitPoints = o.hitPoints;
  }

  Fighter.prototype = Object.create(Humanoid.prototype);

  Fighter.prototype.fight = function (t) {
    const msg = `${this.name} hit ${t.name} for ${this.hitPoints} health points.`;

    t.healthPoints -= this.hitPoints;

    if (this.healthPoints <= 0) {
      return `${this.name} is too dead to fight.`;
    }

    if (t.healthPoints <= 0) {
      return `${msg}\n${t.destroy()}`;
    }

    return msg;
  }
  
  const hero = new Fighter({
    createdAt: new Date(),
    dimensions: {
      length: 5,
      width: 3,
      height: 5,
    },
    healthPoints: 300,
    name: 'Constantine',
    team: 'Satan',
    weapons: [
      'Shotgun',
      'Combat knife',
    ],
    language: 'Devilish',
    hitPoints: 50
  });

  const villain = new Fighter({
    createdAt: new Date(),
    dimensions: {
      length: 10,
      width: 30,
      height: 40,
    },
    healthPoints: 500,
    name: 'Aeb',
    team: 'Satan',
    weapons: [
      'Claws',
      'Teeth',
    ],
    language: 'Devilish',
    hitPoints: 100
  });

  console.log(hero.fight(villain));
  console.log(villain.fight(hero));
  
  while (villain.healthPoints > 0) {
    if (villain.healthPoints == 300) {
      console.log(villain.fight(hero));
    }
    console.log(hero.fight(villain));
  }
  