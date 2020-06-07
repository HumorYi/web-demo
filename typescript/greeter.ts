/**
 * Hello typescript !
 * */
function greeter(person) {
    return "Hello, " + person;
}

let user = "luoxing";

document.getElementById('d1').innerHTML = greeter(user);

function greeter2(person: string) {
    return "Hello, " + person;
}

let user2 = [0, 1, 2];

// 报错提示
// error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
// console.log(greeter2(user2));

// error TS2554: Expected 1 arguments, but got 0.
// console.log(greeter2());

// interface
interface Person {
    firstName: string;
    lastName: string;
}

function greeter3(person: Person) {
    return "Hello, " + person.firstName + ' ' + person.lastName;
}

let user3 = {
    firstName: "Luo",
    lastName: "xing"
};

document.getElementById('d3').innerHTML = greeter3(user3);

// class
class Student {
    fullName: string;

    constructor(public firstName: string, public middleInitial: string, public lastName: string){
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter4 (person: Person) {
    return "Hello, " + person.firstName + ' ' + person.lastName;
}

let user4 = new Student("Huang", "Luo", "Xing");

document.getElementById('d4').innerHTML = greeter4(user4);