//1  Using existing functions that takes a callback as an argument
let names = ["Jake", "Amy", "Charles","Rosa","Terry","Holt","Gina"];

let namesContainingA = names.filter(name => name.includes("a") || name.includes("A"));

console.log("Names containing A: ");
console.log(namesContainingA);

let namesReversed = names.map(name => name.split("").reverse().join(""));

console.log("\nNames reversed: ");
console.log(namesReversed);


//2  Implement user defined functions that take callbacks as an argument
function myFilter(array, callback) {
    let newArray = [];
    array.forEach(element => {
        if(callback(element)) {
            newArray.push(element);
        }
    });
    return newArray;
}

console.log("\nNames containing A, but filtered by me:");
console.log(myFilter(names, name => name.includes("a") || name.includes("A")));

function myMap(array, callback) {
    let newArray = [];
    array.forEach(element => {
        newArray.push(callback(element));
    })
    return newArray;
}

console.log("\nNames reversed, but mapped by me: ");
console.log(myMap(names, name => name.split("").reverse().join("")));

//3  Getting really comfortable with filter and map
let numbers = [1, 3, 5, 10, 11];

let result = numbers.map(function callback( currentValue, index, array) {
    if(index + 1 < array.length) {
        return currentValue + array[index + 1];
    } else {
        return currentValue;
    }   
});
console.log("\nChanged Array:")
console.log(result);

let navArray = names.map(name => "<a href=\"\">" + name + "</a>");
let navHTML = "<nav>\n" + navArray.join("\n") + "\n</nav>"

console.log("\nNav html version of names array");
console.log(navHTML);

var persons = [{name:"Jake",phone:"1234567"}, {name: "Amy",phone: "675843"}, {name: "Charles", phone: "98547"},{name: "Rosa", phone: "79345"}];
let tableHTMLArray = persons.map(person => "<tr><td>"+ person.name + "</td><td>" + person.phone + "</td></tr>");
let tableHTML = "<table><thead>\n<tr><th>Name</th><th>Phone</th></tr>\n</thead><tbody>\n";
tableHTML += tableHTMLArray.join("\n") + "\n</tbody></table>";

console.log("\nTable HTML for persons:");
console.log(tableHTML);

//4 reduce
let all = ["Jake", "Amy", "Charles","Rosa","Terry","Holt","Gina", "Hitchcock", "Scully"];
console.log("\nArray joined with #");
console.log(all.join("#"));

const cnumbers = [2, 3, 67, 33]; 
let number = cnumbers.reduce((accumulator, number) => accumulator + number);
console.log("\nReduced sum number array");
console.log(number);

const members = [
    {name : "Peter", age: 18},
    {name : "Jan", age: 35},
    {name : "Janne", age: 25},
    {name : "Martin", age: 22}];

let averageAge = 0;
averageAge = members.reduce((accumulator, member, index, array) => {
    if(array.length - 1 > index) {
        return member.age + accumulator;
    }else { 
        let sum = accumulator + member.age;
        return sum/array.length;
    }
}, 0);

console.log("\nAverage age of members:");
console.log(averageAge);

const votes = [ "Biden","Trump","Biden","Biden","Trump","Trump","Biden","None"];
const electionResult = votes.reduce((accu, currentVote) => {
    //the questionmark operator is a conditional, if it's true the first part before the : will be executed
    // if false, the second part. We literally check whether the key currentVote exists.
    //Here we take the accumulator and set it equals to itself, after checking whether the current voted candiate exists
    // as a key. If it doesn't, we set it to 1, if it does we set it to itself + 1
    accu[currentVote] = accu[currentVote]? accu[currentVote] + 1: 1;
    return accu;


    //js is fucking dark magic
    //Stack Overflow solution
    //Each iteration of the reduce method, the accumulated map is spread, with the result of the current vote line added
    // We take the currentvote key, then we either take the current amount of votes stored in that key, or 0, and add 1
    //...accu,
    //[currentVote]: (accu[currentVote] || 0) + 1,

}, {});

console.log("\nElection Results:");
console.log(electionResult);

//5  this in javascript

var car = {
    brand: "Nissan",
    getBrand: function(){
      console.log(this.brand);
    }
  };
  

var getCarBrand = car.getBrand;

//the getBrand call returns undefined because it is being called as a function
//This is because it is called like a Java static method, i.e. without instantiating the car as an object
//This means that the keyword this refers to the global object, and not the car.

let list = ["Peter", "Jane", "Karl"];
console.log(list.join());