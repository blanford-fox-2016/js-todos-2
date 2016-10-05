"use strict"

var fs = require("fs");
var content = fs.readFileSync("data.json");
var jsonContent = JSON.parse(content)
var toText = JSON.stringify(jsonContent[0])
class Interface {
  static clearscreen(){
    var lines = 20
    for(var i = 0; i < lines; i++) {
    console.log('\n');
      }
    }

  static newLines(value){
    for (var i=1; i<=value; i++){
      console.log(`\n`);
          }
        }
      }

class Todo {
  constructor(property){
    this._task = content
  }
  static mainMenu(){
    console.log(`=======================================`);
    console.log(`            Welcome to Todo js`);
    console.log(`=======================================`);
    console.log(`Type following sentence to get start : `);
    console.log(`$ node todo.js help`);
    console.log(`$ node todo.js list`);
    console.log(`$ node todo.js add (type new task)`);
    console.log(`$ node todo.js task (type spesific task id)`);
    console.log(`$ node todo.js delete (type spesific task id)`);
    console.log(`$ node todo.js complete (type spesific task id)`);
    console.log(`$ node todo.js uncomplete (type spesific task id)`);
    console.log(`$ node todo.js list:outstanding`);
    console.log(`$ node todo.js list:outstanding asc`);
    console.log(`$ node todo.js list:outstanding desc`);
    console.log(`$ node todo.js list:completed`);
    console.log(`$ node todo.js tag (type spesific task id) (write tags)`);
    console.log(`$ node todo.js filter (type filter)`);
  }

  static help(){
    console.log(`=======================================`);
    console.log(`            Welcome to Todo js`);
    console.log(`=======================================`);
    console.log(`========================== Help Menu ===================`);
    console.log(`$ node todo.js help >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> to view help`);
    console.log(`$ node todo.js list >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> to see all task`);
    console.log(`$ node todo.js add (type new task) >>>>>>>>>>>>>>>>>>>>> to add new task`);
    console.log(`$ node todo.js task (type spesific task id) >>>>>>>>>>>> to see selected task`);
    console.log(`$ node todo.js delete (type spesific task id) >>>>>>>>>> to delete selected task`);
    console.log(`$ node todo.js complete (type spesific task id) >>>>>>>> to see completed task`);
    console.log(`$ node todo.js uncomplete (type spesific task id) >>>>>> to see uncomplete task`);
    console.log(`$ node todo.js list:outstanding >>>> to sort uncompleted task by created date`);
    console.log(`$ node todo.js list:outstanding asc >>>> to sort uncompleted task by created date (ascending)`);
    console.log(`$ node todo.js list:outstanding desc >>>> to sort uncompleted task by created date (descending)`);
    console.log(`$ node todo.js list:completed >>>> to sort completed task by created date`);
    console.log(`$ node todo.js tag (type spesific task id) (type tags) >>>>>> to add custom tags`);
    console.log(`$ node todo.js filter (type filter) >>>>> to sort task by filter`);
  }
  static list(){
    console.log(`============== All List =============================`);
    for(var i=0; i<jsonContent.length; i++){
      if(jsonContent[i]._done == true){
      console.log(`[X] ${jsonContent[i]._id+1}. ${jsonContent[i]._note} `);
    }else {
      console.log(`[ ] ${jsonContent[i]._id+1}. ${jsonContent[i]._note}`);
    }
    }
  }

  static task(value){
    for(var i=0; i<jsonContent.length; i++){
      if(parseInt(value) - 1 == jsonContent[i]._id){
        if(jsonContent[i]._done == true){
          console.log(`---------------------------------------------`);
          console.log(`Task id ${jsonContent[i]._id+1} :  ${jsonContent[i]._note} | Status : Completed `);
          console.log(`---------------------------------------------`);
        } else {
          console.log(`----------------------------------------`);
          console.log(`Task id ${jsonContent[i]._id+1} :  ${jsonContent[i]._note} | Status : Uncomplete `);
          console.log(`----------------------------------------`);
        }
      }
    }
  }
  static add(value){
    value = value.join(" ")
    if(jsonContent.length == 0){
      var newTask = new Task({id:0, note:value, done:false, created_at:new Date(), completed_at:null, tag:[]})
      jsonContent.push(newTask)
      var write = JSON.stringify(jsonContent)
      fs.writeFileSync('data.json', write, 'utf8');
    }else{
      var newTask = new Task({id:jsonContent[jsonContent.length-1]._id+1, note:value, done:false, created_at:new Date(), completed_at:null, tag:[]})
      jsonContent.push(newTask)
      var write = JSON.stringify(jsonContent)
      fs.writeFileSync('data.json', write, 'utf8');
    }
    console.log(`----------------------------------------`);
    console.log(`System note : Task added successfully`);
    console.log(`----------------------------------------`);
  }

  static delete(value){
    for(var i=0; i<jsonContent.length; i++){
      if(parseInt(value) - 1 == jsonContent[i]._id){
        jsonContent.splice(i,1)
      }
    }
    var write = JSON.stringify(jsonContent)
    fs.writeFileSync('data.json', write, 'utf8');
    console.log(`----------------------------------------`);
    console.log(`System note : Task deleted successfully`);
    console.log(`----------------------------------------`);

  }

  static complete(value){
    for(var i=0; i<jsonContent.length; i++){
      if(parseInt(value)-1 == jsonContent[i]._id){
        jsonContent[i]._done = true
        jsonContent[i]._completed_at = new Date()
      }
    }
    var write = JSON.stringify(jsonContent)
    fs.writeFileSync('data.json', write, 'utf8');
    console.log(`----------------------------------------`);
    console.log(`System note : One task set to complete`);
    console.log(`----------------------------------------`);
  }

  static uncomplete(value){
    for(var i=0; i<jsonContent.length; i++){
      if(parseInt(value)-1 == jsonContent[i]._id){
        jsonContent[i]._done = false
        jsonContent[i]._completed_at = null
      }
    }
    var write = JSON.stringify(jsonContent)
    fs.writeFileSync('data.json', write, 'utf8');
    console.log(`----------------------------------------`);
    console.log(`System note : One task set to uncomplete`);
    console.log(`----------------------------------------`);

}

  static outstanding(value){
    if(value != undefined){
      console.log(`------------------------------------------`);
      console.log(` Outstanding list sorted by Date : ${value}`);
      console.log(`------------------------------------------`);
    } else {
      console.log(`------------------------------------------`);
      console.log(`      Outstanding list sorted by Date `);
      console.log(`------------------------------------------`);
    }
    if(value === 'desc'){
      var sorted = jsonContent.sort(function(a,b){
        if(a._created_at > b._created_at){
          return -1
        }
        if(a._created_at < b._created_at){
          return 1
        }
        return 0;
      })
      for(var i=0; i<sorted.length; i++){
        if(sorted[i]._done == false){
        console.log(`[ ] ${sorted[i]._id+1}. ${sorted[i]._note} | Date created : ${sorted[i]._created_at}`);
          }
        }
    } else if(value === 'asc'){
      var sorted = jsonContent.sort(function(a,b){
        if(a._created_at > b._created_at){
          return 1
        }
        if(a._created_at < b._created_at){
          return -1
        }
        return 0;
      })
      for(var i=0; i<sorted.length; i++){
        if(sorted[i]._done == false){
        console.log(`[ ] ${sorted[i]._id+1}. ${sorted[i]._note} | Date created : ${sorted[i]._created_at}`);
          }
        }
    } else{
      for(var i=0; i<jsonContent.length; i++){
        if(jsonContent[i]._done == false){
        console.log(`[ ] ${jsonContent[i]._id+1}. ${jsonContent[i]._note} | Date created : ${jsonContent[i]._created_at}`);
          }
        }
    }
    }

    static listCompleted(value){
      if(value != undefined){
        console.log(`------------------------------------------`);
        console.log(` Completed list sorted by Date : ${value}`);
        console.log(`------------------------------------------`);
      } else {
        console.log(`------------------------------------------`);
        console.log(`      Completed list sorted by Date `);
        console.log(`------------------------------------------`);
      }
      if(value === 'desc'){
        var sorted = jsonContent.sort(function(a,b){
          if(a._created_at > b._created_at){
            return -1
          }
          if(a._created_at < b._created_at){
            return 1
          }
          return 0;
        })
        for(var i=0; i<sorted.length; i++){
          if(sorted[i]._done == true){
          console.log(`[X] ${sorted[i]._id+1}. ${sorted[i]._note} | Date created : ${sorted[i]._created_at}`);
            }
          }
      } else if(value === 'asc'){
        var sorted = jsonContent.sort(function(a,b){
          if(a._created_at > b._created_at){
            return 1
          }
          if(a._created_at < b._created_at){
            return -1
          }
          return 0;
        })
        for(var i=0; i<sorted.length; i++){
          if(sorted[i]._done == true){
          console.log(`[X] ${sorted[i]._id+1}. ${sorted[i]._note} | Date created : ${sorted[i]._created_at}`);
            }
          }
      } else{
        for(var i=0; i<jsonContent.length; i++){
          if(jsonContent[i]._done == true){
          console.log(`[X] ${jsonContent[i]._id+1}. ${jsonContent[i]._note} | Date created : ${jsonContent[i]._created_at}`);
            }
          }
      }
      }
    static tag(number, array){
      for(var i=0; i<jsonContent.length; i++){
        if(parseInt(number)== jsonContent[i]._id+1){
          jsonContent[i]._tag = array
          if(jsonContent[i]._done == false){
            console.log(`[ ] ${jsonContent[i]._id+1}. ${jsonContent[i]._note} | tag : ${jsonContent[i]._tag}`);
          } else {
            console.log(`[X] ${jsonContent[i]._id+1}. ${jsonContent[i]._note} | tag : ${jsonContent[i]._tag}`);
          }
          var write = JSON.stringify(jsonContent)
          fs.writeFileSync('data.json', write, 'utf8');
          console.log(`----------------------------------------`);
          console.log(`System note : Tag updated for item  ${jsonContent[i]._id+1} | [ ${jsonContent[i]._tag} ]`);
          console.log(`----------------------------------------`);
        }
      }
      }

    static filter(number){
      console.log(`----------------------------------------`);
      console.log(`     Task Filtered by tag : ${number}`);
      console.log(`----------------------------------------`);
      var sorted = jsonContent.sort(function(a,b){
        if(a._created_at > b._created_at){
          return 1
        }
        if(a._created_at < b._created_at){
          return -1
        }
        return 0;
      })
      for(var i=0; i<sorted.length; i++){
        for(var j=0; j<sorted[i]._tag.length; j++){
          if(number === sorted[i]._tag[j]){
            if(sorted[i]._done == false){
              console.log(`[ ] ${sorted[i]._id+1}. ${sorted[i]._note} | tag : ${sorted[i]._tag}`);
            }else{
              console.log(`[X] ${sorted[i]._id+1}. ${sorted[i]._note} | tag : ${sorted[i]._tag}`);
              }
            }
          }
        }
      }
    }

class Task {
  constructor(property){
    this._id = property['id']
    this._note = property['note']
    this._done = property['done']
    this._created_at = property['created_at']
    this._completed_at = property['completed_at']
    this._tag = property['tag']
  }

  set id(value){this._id = value}
  get id(){return this._id}
  set note(value){this._note = value}
  get note(){return this._note}
  set done(value){this._done = value}
  get done(){return this._done}
  set created_at(value){this._created_at = value}
  get created_at(){return this._created_at}
  set completed_at(value){this._completed_at = value}
  get completed_at(){return this._completed_at}
  set tag(value){this._tag = value}
  get tag(){return this._tag}


}

var args = process.argv
if(args[2] === 'help'){
  Interface.clearscreen()
  Todo.help()
} else if(args[2] === 'list'){
  Interface.clearscreen()
  Todo.list()
  Todo.mainMenu()
} else if(args[2] === 'task'){
  Interface.clearscreen()
  Todo.task(args[3])
  Todo.list()
  Todo.mainMenu()
} else if(args[2] === 'add'){
  Interface.clearscreen()
  Todo.add(args.slice(3,args.length))
  Todo.list()
  Todo.mainMenu()
} else if(args[2] === 'delete'){
  Interface.clearscreen()
  Todo.delete(args[3])
  Todo.list()
  Todo.mainMenu()
} else if(args[2] === 'complete'){
  Interface.clearscreen()
  Todo.complete(args[3])
  Todo.list()
  Todo.mainMenu()
} else if(args[2] === 'uncomplete'){
  Interface.clearscreen()
  Todo.uncomplete(args[3])
  Todo.list()
  Todo.mainMenu()
} else if(args[2] === 'list:outstanding'){
  Interface.clearscreen()
  Todo.outstanding(args[3])
  Todo.mainMenu()
} else if(args[2] === 'list:completed'){
  Interface.clearscreen()
  Todo.listCompleted(args[3])
  Todo.mainMenu()
} else if(args[2] === 'tag'){
  Interface.clearscreen()
  Todo.tag(args[3], args.slice(4,args.length))
  Interface.newLines(1)
  Todo.mainMenu()
} else if(args[2] === 'filter'){
  Interface.clearscreen()
  Todo.filter(args[3])
  Todo.mainMenu()
} else{
  Interface.clearscreen()
  Todo.mainMenu()
}
