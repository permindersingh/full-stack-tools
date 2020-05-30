/*
    Comment import statement if using "npm run convert:convert-single-file" to combine all files
    as babel will not remove it while combining and it will simply merge the files with import 
    statement
*/
// import
import { addNumbers } from "./imported";

// arrow function
const sayHello = (name) => {
  log(`Hello ${name}!`); // Template string
};

const log = (value) => {
  console.log(value);
};

class StaticDemo {
  // Class instance properties
  firstName = "John";
  lastName = "Doe";

  // Class static properties (instance independent)
  static classVersion = "1.0";
}

const sDemo = new StaticDemo();

sayHello("John");
log(addNumbers(10, 20));
log(
  `Class attributes: ${sDemo.firstName}, ${sDemo.lastName}, ${StaticDemo.classVersion}`
);
