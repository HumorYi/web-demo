var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function test(teamplate, name, age) {
    console.log(teamplate);
    console.log(name);
    console.log(age);
}
var myName = "luoxing";
var age = function () {
    return 21;
};
test(__makeTemplateObject(["My name is ", ", age is ", ""], ["My name is ", ", age is ", ""]), myName, age);
