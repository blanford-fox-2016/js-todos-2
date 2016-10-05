const fs = require('fs')

var display = () =>{
  console.log("<--------------------->")
  console.log("help");
  console.log("list");
  console.log("add <task_content>");
  console.log("delete <task_id>");
  console.log("complete <task_id>");
  console.log("uncomplete <task_id>");
  console.log("sortedlist <asc/desc>");
  console.log("listcomplete (list completed tasks)");
  console.log("tag <your_tags>");
  console.log("filter <tag>");
  console.log("<-------------------->");
}

class Task{
  constructor(tugas){
    // this.id = Data.allData[Data.allData.length-1].id + 1
    this.task = tugas
    this.complete = "[x]"
    this.created_date = new Date().toLocaleString()
    this.complete_date = "belum selesai"
    this.tag = []
  }
}

class Data{

  constructor(tugas){
    this._tugas = tugas
    this.allData = []
  }
  get allData(){
    return this.allData
  }
  static parseJSON(){
    var data = fs.readFileSync('data.json','utf8')
    this.allData = JSON.parse(data)
    // console.log(this.allData);
    return this.allData
  }
  static take_task(){
    var result = [];
    for (var i = 0; i < this.parseJSON().length; i++){
      result.push(this.parseJSON()[i]['task'])
    }
    return result
  }

  static list(){
    for(var i = 0; i < this.take_task().length; i++){
      console.log(i+1,this.allData[i].complete,this.take_task()[i])
    }
    return ""
  }

  static add_task(text){
    this.allData.push(new Task(text))
    console.log("Added " + text + " to your to do list!")
    this.save()
    return this.allData
  }

  static delete_task(id){
    console.log("Deleted " + this.allData[id - 1].task + " from your to do list")
    this.allData.splice((id - 1),1)
    this.save()
    return this.allData
  }

  static complete(id){
    this.allData[id -1].complete = "[v]"
    this.allData[id -1].complete_date = new Date().toLocaleString()
    this.save()
  }
  static listcomplete(){
    this.allData = this.allData.sort(function(a,b) {
    if ( a.complete_date < b.complete_date )
        return -1;
    if ( a.complete_date > b.complete_date )
        return 1;
    return 0;
    } );
    var j = 1
    for (var i = 0; i < this.allData.length; i++){
      if (this.allData[i].complete === "[v]"){
        console.log(j + " " + this.allData[i].task + " || Completed on: "+ this.allData[i].complete_date)
        j +=1
      }
    }
  }
  static uncomplete(id){
    this.allData[id -1].complete = "[x]"
    this.allData[id -1].complete_date = "date"
    this.save()
  }

  static asc(){
    this.allData = this.allData.sort(function(a,b) {
    if ( a.created_date < b.created_date )
        return -1;
    if ( a.created_date > b.created_date )
        return 1;
    return 0;
    } );
    for (var i = 0; i < this.allData.length ; i++){
      console.log((i + 1) + " " + this.allData[i].task)
    }
  }

  static desc(){
    this.allData = this.allData.sort(function(b,a) {
    if ( a.created_date < b.created_date )
        return -1;
    if ( a.created_date > b.created_date )
        return 1;
    return 0;
    } );
    for (var i = 0; i < this.allData.length ; i++){
      console.log((i + 1) + " " + this.allData[i].task)
    }
  }

  static tagging(tag){
    tag = tag.split(" ")
    var id = tag[0]
    tag.splice(0, 1)
    this.allData[id - 1].tag = tag
    this.save()
  }

  static filter(thefilter){
    var j = 1
    for (var i = 0; i < this.allData.length; i++){
      if (this.allData[i].tag.indexOf(thefilter) != -1){
        console.log(j+ " " + this.allData[i].task + " [" + this.allData[i].tag+"]")
        j++
      }
    }
  }

  static save(){
    fs.writeFile('data.json', JSON.stringify(this.allData), (err) => {
      if (err) throw err;
      console.log('Your input, It\'s saved!');
    });
  }
}

Data.parseJSON()
  process.argv.splice(0,2)
  var func = process.argv.splice(0, 1).join("")
  var arg = process.argv.join(" ")

  switch (func) {
    case "help":
        display();
      break;
    case "list":
      Data.list()
      break;
    case "add":
      Data.add_task(arg)
      break;
    case "delete":
      Data.delete_task(arg)
      break;
    case "complete":
      Data.complete(arg)
      break;
    case "uncomplete":
      Data.uncomplete(arg)
      break;
    case "sortedlist":
      if (arg == "desc"){
        Data.desc()
      } else {
        Data.asc()
      }
      break;
    case "listcomplete":
      Data.listcomplete()
      break;
    case "tag":
        Data.tagging(arg)
        break;
    case "filter":
        Data.filter(arg)
        break;
    default:
        display();
  }

// Data.parseJSON();
// Data.list();
// Data.add_task("bangun")
// Data.save()
// Data.delete_task(3)
// console.log(Data.allData)
// display()
// Data.list:outstanding()
