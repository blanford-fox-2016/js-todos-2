'use strict'

let Todo = require('./model.js');
//import Todo from './model.js'

let args = process.argv.slice(2);

//console.log(args[1]);
Todo.run(args);
