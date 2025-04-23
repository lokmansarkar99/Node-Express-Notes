const Event = require("events");

// create an instance of EventEmitter class
const eventEmitter = new Event.EventEmitter();

// const greet = () => {
//   console.log("Hello Lokman");
// };

// // define a event listener
// eventEmitter.on("greet", greet);

// //trigger the event
// eventEmitter.emit("greet");




const greet = (name) => {
    console.log("Hello  " + name);
  };
  
  // define a event listener
  eventEmitter.on("greet", greet);
  
  //trigger the event
  eventEmitter.emit("greet", "Lokman");