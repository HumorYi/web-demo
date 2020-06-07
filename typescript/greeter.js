/**
 * Hello typescript !
 * */
function greeter(person) {
    return "Hello, " + person;
}
var user = "luoxing";
document.getElementById('d1').innerHTML = greeter(user);
function greeter2(person) {
    return "Hello, " + person;
}
var user2 = [0, 1, 2];
function greeter3(person) {
    return "Hello, " + person.firstName + ' ' + person.lastName;
}
var user3 = {
    firstName: "Luo",
    lastName: "xing"
};
document.getElementById('d3').innerHTML = greeter3(user3);
// class
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
    return Student;
}());
function greeter4(person) {
    return "Hello, " + person.firstName + ' ' + person.lastName;
}
var user4 = new Student("Huang", "Luo", "Xing");
document.getElementById('d4').innerHTML = greeter4(user4);
