function test(teamplate, name, age) {
    console.log(teamplate);
    console.log(name);
    console.log(age);
}

var myName = "luoxing";

var age = function () {
    return 21;
};

test`My name is ${myName}, age is ${age}`;