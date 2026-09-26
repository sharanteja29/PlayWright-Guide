let num = 35;
console.log(num);

//num="Sharan";
//This above line will give an error because we have declared num as a number type and we are trying to assign a string value to it.

let str = "Hello, TypeScript!";

//str=3
//This above line will give an error because we have declared str as a string type and we are trying to assign a number value to it.

console.log(str);

const isActive: boolean = true;
//isActive = false; 
// This will give an error because we cannot reassign a value to a constant variable.

let age: number = 25;
age = 30; // This is valid because we can reassign a value to a variable declared with let.

var city: string = "New York";
city = "Los Angeles"; // This is valid because we can reassign a value to a variable declared with var.

if(true) {
  var country: string = "USA";
  let state: string = "California";
  const zipCode: number = 90001;  
}
console.log(country); // This will work because var has function scope, so country is accessible outside the if block.

// console.log(state); 

// This will give an error because let has block scope, so state is not accessible outside the if block.

//console.log(zipCode); 

// This will give an error because const has block scope, so zipCode is not accessible outside the if block.


export {};