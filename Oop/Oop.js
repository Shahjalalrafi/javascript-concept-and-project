// Inheritence with function constructor
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function () {
    console.log(2030 - this.birthYear);
}

const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear)
    this.course = course;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.intorduce = function () {
    console.log(`this is ${this.firstName} and i study ${this.course}`);
}

// const mike = new Student("mike", 2010, "CSE");
// mike.intorduce();
// mike.calcAge()




// ///////////////////////////////////////
// // Coding Challenge #3

// /* 
// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
// GOOD LUCK 😀

const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
}

Car.prototype.break = function () {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
}

// const bmw = new Car("BMW", 120);
// bmw.accelerate();
// bmw.break();
// bmw.accelerate();



const EV = function (make, speed, betteryCharge) {
    Car.call(this, make, speed);
    this.betteryCharge = betteryCharge;
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
    this.betteryCharge = chargeTo;
    console.log(`Tesla going at ${this.speed} km/h, with a charge of 22%`)
}

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.betteryCharge--;
    console.log(`Tesla going at ${this.speed} km/h, with a charge of 22%`)
}

// const tesla = new EV("Tesla", 120, 23)

// tesla.accelerate()


// Inheritence with Class constructor

class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    calcAge() {
        console.log(`in 2031 year, ${this.firstName} will be ${2031 - this.birthYear}`);
    }
}

// const person1 = new PersonCl("rakib", 2003);
// person1.calcAge();


class Students extends PersonCl {
    constructor(firstName, birthYear, course) {
        super(firstName, birthYear);
        this.course = course;
    }

    intorduce() {
        console.log(`i am ${this.firstName} and i study ${this.course}`);
    }

    calcAge() {
        console.log(`in 2030 student ${this.firstName} will be ${2030 - this.birthYear} years old`);
    }
}

// const rafi = new Students("Rafi", 1999, "ELL");
// rafi.intorduce();
// rafi.calcAge();


// Inheritence with Class : Object.create

const PersonProto = {
    calcAge() {
        console.log(2030 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.intorduce = function () {
    console.log(`i am ${this.firstName} and i study ${this.course}`);
}

// const tasib = Object.create(StudentProto)

// tasib.init("Tasib", 2002, "English");
// tasib.intorduce();



// Another Example

class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;

        // Protected Properties
        this._movements = [];
        this.locale = navigator.language;
    }

    // Public Interface

    getMovements() {
        return this._movements;
    }

    diposite(val) {
        this._movements.push(val);
    }

    withdraw(val) {
        this.diposite(-val);
    }

    _approvedLoan(val) {
        if (val < 20000) {
            return true;
        } else {
            return false;
        }
    }

    requestLoan(val) {
        if (this._approvedLoan(val)) {
            this.diposite(val);
            console.log("loan Approved");
        }
    }
}

// const account1 = new Account("Rafi", "BDT", 2221);

// account1.diposite(500);
// account1.diposite(300);
// account1.withdraw(700);
// account1.requestLoan(1500);
// console.log(account1.getMovements())
// console.log(account1)




// with private filed
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this;
    }

    break() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this;
    }
}

// const allien = new Car("ALLIEN", 120);




class EVCl extends CarCl {
    #batterycharge;

    constructor(make, speed, batterycharge) {
        super(make, speed);
        this.#batterycharge = batterycharge;
    }

    chargeBattery(chargeTo) {
        this.batterycharge = chargeTo;
        console.log(`Tesla going at ${this.speed} km/h, with a charge of 22%`);
        return this;
    }

    accelerate() {
        this.speed += 20;
        this.batterycharge--;
        console.log(`${this.make} going at ${this.speed} km/h, with a charge of 22%`);
        return this;
    }
}


// const ferrari = new EVCl("FERRARI", 90, 23)

// ferrari.accelerate().accelerate().accelerate().break().accelerate()

// console.log(ferrari)