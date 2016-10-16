'use strict'

///////////////////////////////////////////////////////////
///////////// global variable that means to get the message
///////////////////////////////////////////////////////////
const R = require('ramda');
const jf = require('jsonfile');
const file = './db/todo.json';
const args = require('./app.js');
let local = jf.readFileSync(file);

// global function for generating unique id and update todo.json
const idGenerator = (arr) => arr.length === 0 ? 1 : arr.length + 1;
const update = () => jf.writeFileSync(file, local)

///////////////////////////////////////////////////////////

const commands = ["help","add", "show", "delete", "update", "show_by_status"];

const defaultMessage = `
<--Welcome to CLI to-do-list Application-->
1. ${commands[0]}
2. ${commands[1]} <add "your task">
3. ${commands[2]} <show "id" or "all">
4. ${commands[3]} <delete "id">
5. ${commands[5]} <show_by_status "true | false">\n
* Remember your space. This is CLI not GUI!\n`;

///////////////////////////////////////////////////////////
///////////// And of defined variable
///////////////////////////////////////////////////////////

module.exports = class Todo {
  constructor() {
    this.data_length = local.length;
  }

  static welcome(){
    console.log(defaultMessage);
  }

  static run(args) {
    switch(args[0]){
      case 'add' :
        args[1] === undefined ? Todo.welcome() : Todo.create({id: idGenerator(local) ,title: args[1], status: "incomplete"});
        break;
      case 'delete' :
        args[1] === undefined ? Todo.welcome() : Todo.destroy(local,Number(args[1]));
        break;
      case 'update' :
        args[1] === undefined ? Todo.welcome() : Todo.update_status(local, args[1], String(args[2]));
        break;
      case 'show':
        args[1] === undefined ? Todo.show_all(local) : Todo.show_id(local, Number(args[1]));
        break;
      case 'show_by_status':
        args[1] === undefined ? Todo.show_all(local) : Todo.show_status(local, args[1]);
        break;
      default:
        Todo.welcome();
    }
  }

  //create

  static create(args) {
    local.push(args);
    update()
    console.log("it's saved");
  }

  static destroy(arr, id) {
    local = R.remove(id - 1, 1, arr);
    update()
    console.log(`the task with ${id} id deleted from the list`);
  }

  static show_all(arr) {
    return R.map(obj => console.log(obj.id + " " + obj.title + " | " + obj.status), arr);
  }

  static show_id(arr, id) {
    var selected = R.filter(obj => obj.id === id, arr);
    return R.map(obj => console.log(obj.id + " " + obj.title + " | " + obj.status), selected)
  }

  static show_status(arr, status) {
    var eh = R.filter(obj => obj.status === status, arr);
    return R.map(obj => console.log(obj.id + " " + obj.title + " | " + obj.status), eh)
  }

  static update_status(arr, id, status) {
    local = R.update(id, status, arr);
    update()
    console.log(`the task with ${id} is updated tp ${status}`);
  }

}
