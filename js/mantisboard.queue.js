/*!
 * mantisboard.js
 * http://mantisboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the WTFPL license
 * https://github.com/seeb0h/mantisboard/blob/master/LICENSE.md
 */


// Create an array and append your functions to them
functionsQueue = [];

// Function wrapping code.
// fn - reference to function.
// context - what you want "this" to be.
// params - array of parameters to pass to function.
var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}

// Wrap the functions and append them to the queue
function initFunctionsQueue() {
  var fun1 = wrapFunction(readJSONParameters, this, ["mantisboard", true]);
  var fun2 = wrapFunction(readJSONParameters, this, ["tilesSettings", true]);
  var fun3 = wrapFunction(displayTiles, this, [true]);
  var fun4 = wrapFunction(getMantisEnumStatus, this, [true]);
  var fun5 = wrapFunction(getMantisProjectID, this, [true]);
  var fun6 = wrapFunction(getMantisFilterID, this, ["undefined", true]);
  var fun7 = wrapFunction(getMantisStats, this, ["undefined","undefined", true]);
  var fun8 = wrapFunction(endInit, this, []);

  functionsQueue.push(fun1);
  functionsQueue.push(fun2);
  functionsQueue.push(fun3);
  functionsQueue.push(fun4);
  functionsQueue.push(fun5);
  functionsQueue.push(fun6);
  functionsQueue.push(fun7);
  functionsQueue.push(fun8);
}

// Wrap the functions and append them to the queue
function callNextFunction() {
  if(functionsQueue.length > 0)
    (functionsQueue.shift())();   
}

