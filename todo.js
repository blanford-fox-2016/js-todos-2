//sync
const readline = require('readline');
var fs = require('fs');

var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));


function writeJson(){
  var contents = fs.writeFileSync("data.json", JSON.stringify(json));
}

function indexSort(){
  var tempArr =[]
  for (var i = 0; i < json.length; i++) {
    tempArr.push(json[i].created_date)
  }
  return tempArr;
}

class TodoList {
  constructor(task) {
    this.taskId = json[json.length-1].id
    this.idTask = task;
    this.kondisi = false;
    this.date = new Date();
  }
  static Display(){
    console.log("---------------------");
    console.log("1. node todo.js help ");
    console.log("2. node todo.js add <task_content>");
    console.log("3. node todo.js task <task_id>");
    console.log("4. node todo.js delete <task_id> ");
    console.log("5. node todo.js complete <task_id>");
    console.log("6. node todo.js uncomplete <task_id");
    console.log("7. node todo.js list:complete asc|| desc");
    console.log("8. node todo.js list:outstanding asc|| desc");
    console.log("9. node todo.js filter <tag_name>");
    console.log("10. node todo.js tag <task_id> <tag_name1> <tag_name2> ... <tag_nameN> ");
    console.log("------------------------------");
  }

  seeAll(){
    for (var i = 0; i < json.length; i++) {
      if(json[i].status){
        console.log(`[x] ${json[i].task} | created : ${json[i].created_date} | complete : ${json[i].completed_date}`);
      }else {
        console.log(`[ ] ${json[i].task} | created : ${json[i].created_date} | complete : ${json[i].completed_date}`);
      }
    }

  }

  sortingCreated(value){
    let x = indexSort()
    if(value == "asc"){
      x.sort()
    }else{
      x.sort().reverse();
    }
    for(let i = 0; i < x.length; i++){
      let index = json.map(function(el) { return el.created_date; }).indexOf(x[i])
      console.log(`${i+1}. ${json[index].task}`);
    }
  }

  completeSort(value){
    let x = indexSort()
    if(value == "asc"){
      x.sort()
    }else{
      x.sort().reverse();
    }
    for (var i = 0; i < json.length; i++) {
      if (json[i].status) {
        let index = json.map(function(el) { return el.created_date; }).indexOf(x[i])
        console.log(`${i+1}. ${json[index].task}`);
      }
    }
    // debugger;
  }

  addTask(task){
    json.push({"id":this.taskId+=1,"task":task,"status":this.kondisi ,"created_date":this.date,"completed_date":null,"tag":[]});
    console.log("Silahkan ubah status menjadi complete menggunakan perintah ke 5");
    writeJson()
  }

  complete(id){
    var index = json.map(function(el) { return el.id; }).indexOf(Number(id));
    json[index].status = true;
    json[index].completed_date = this.date;
    writeJson()
    // debugger;
  }

  uncomplete(id){
    var index = json.map(function(el) { return el.id; }).indexOf(Number(id));
    json[index].status = false;
    writeJson()
  }

  delete(id){
    var index = json.map(function(el) { return el.id; }).indexOf(Number(id));
    json.splice(index, 1)
    writeJson()
  }

  checktask(id){
    var index = json.map(function(el) { return el.id; }).indexOf(Number(id));
    console.log(json[index].task);
  }

  addTag(id,value){
    let index = json.map(function(el) { return el.id; }).indexOf(Number(id));
    let input = value.toString().split(',');
    for (var i = 0; i < input.length; i++) {
      json[index].tag.push(input[i])
    }
    writeJson()
  }

  filterTag(tagName){
    for (var i = 0; i < json.length; i++) {
      if (json[i].tag.indexOf(tagName) >= 0) {
        console.log(`${json[i].task} , ${json[i].tag}`);
      }
    }

  }
}

//

//console.log(json[json.indexOf("")]);
//json argv
//
var testing = new TodoList();
//testing.sortingCreated()
console.log("--------------");
// console.log(json);
//
// var sampel = []
process.argv.forEach((val, index, array) => {

  if (index === 1) {
    TodoList.Display()
  }
  if(index > 1) {
    if (val === "help") {
      TodoList.Display()
    }else if(val === "list") {
      testing.seeAll()
    } else if (val === "add" ) {
      testing.addTask( array[3] )
      // process.exit(-1)
    }else if(val === "complete"){
      testing.complete( Number(array[3]) )
    }else if(val === "uncomplete"){
      testing.uncomplete( array[3] )
      //process.exit(-1)
    }else if(val === "delete"){
      testing.delete( array[3] )
      //process.exit(-1)
    }else if(val === "task"){
      testing.checktask( array[3] )
      //process.exit(-1)
    }else if(val === "list:outstanding") {
      if (array[3]== "asc") {
        testing.sortingCreated(array[3])
      }else if(array[3]==="desc"){
        testing.sortingCreated(array[3])
      }else {
        console.log("anda tidak menginputkan sorting, berikut soring berdasarkan descending");
        testing.sortingCreated(array[3])
      }
    }else if (val === "list:complete") {
      if (array[3]== "asc") {
        testing.completeSort(array[3])
      }else if(array[3]==="desc"){
        testing.completeSort(array[3])
      }else {
        console.log("anda tidak menginputkan sorting, berikut soring berdasarkan descending");
        testing.completeSort(array[3])
      }
    }else if (val === "tag"){
      testing.addTag(array[3],array.splice(4,array.length))
    }else if(val === "filter"){
      testing.filterTag(array[3])
    }
  }
});
