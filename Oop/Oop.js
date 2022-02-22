const Person = function(firstName, birthYear)  {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function() {
    console.log(2030 - this.birthYear);
}

const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear)
    this.course = course;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.intorduce = function() {
    console.log(`this is ${this.firstName} and i study ${this.course}`);
}

const mike = new Student("mike", 2010, "CSE");
mike.intorduce();
mike.calcAge()