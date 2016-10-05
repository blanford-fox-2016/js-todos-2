
var jsonfile = require('jsonfile')
var file = 'data.json'

var result= []
var list = []
var index = 0
var cekStatus = false
var read = jsonfile.readFileSync(file)
for (var i = 0; i < read.length; i++) {
    list.push(read[i])
  }
// console.dir(jsonfile.readFileSync(file))

// jsonfile.readFile(file, function(err, obj) {
//   cekFile.push(obj)
// })
// console.log(cekFile);

// var obj = [{task: 'JP1', id: 5},{task: 'JP2'}]
// var read = jsonfile.readFileSync(file)
//
// if(read.length == 0) {
//   // console.log("adssa");
//   jsonfile.writeFileSync(file, obj)
// }else {
//   // console.log(read);
//   for (var i = 0; i < read.length; i++) {
//     data.push(read[i])
//   }
//   data.push({task: 'JP3'})
//   // console.log(data);
//   jsonfile.writeFileSync(file, data)
// }

var argv = process.argv

let printHelp = () => {
  console.log("============HELP============\n");
  console.log("node todo.js #will call help");
  console.log("node todo.js help");
  console.log("node todo.js list");
  console.log("node todo.js add <task_content>");
  console.log("node todo.js task <task_id>");
  console.log("node todo.js delete <task_id>");
  console.log("node todo.js complete <task_id>");
  console.log("node todo.js uncomplete <task_id>");
}


if (typeof argv[2] === "undefined") {
  printHelp()
}


class Task {
  constructor(id, status, task) {
    this.id = id
    this.status = status
    this.task = task
    this.tag = []
    this.createDate = new Date()
    this.completeDate = ""
  }
}

let searchIndexArr = (id) => {
  for(let i = 0 ; i < list.length ; i++){
    // console.log(typeof list[i].id)
    if(id === String(list[i].id)){
      // console.log(i);
      return i
    }
  }
}

let searchStatus = (status) => {
  var temp = []
  for (var i = 0; i < list.length; i++) {
    if (list[i].status == status) {
      temp.push(list[i])
    }
  }
  return temp
}

let searchFilter = (filter) => {
  var result = []
  for(var i = 0 ; i < list.length ; i++){
    for(var j = 0 ; j < list[i].tag.length ; j++){
      if(list[i].tag[j] === filter){
        result.push(list[i].id)
      }
    }
  }
  return result
}

argv.forEach((val, index) => {

  let idToDo = argv[3]

  val = val.toLowerCase()
  index = searchIndexArr(idToDo)
  var status = false

  if(val == "help"){
    printHelp()
  }
  else if(val == "list"){
    console.log(`ID. [CheckList] TODO's NAME`)
    for (var i = 0; i < list.length; i++) {
       status = list[i].status
      console.log(`${list[i].id}. [${status == true ? "x" : " "}] ${list[i].task}`);
    }
  }

  else if(val == "list:outstanding"){
    list = searchStatus(false)
    console.log(`ID. [CheckList] TODO's NAME`)
    if (idToDo == "asc") {
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list.length - 1; j++) {
          if (list[j].createDate > list[j+1].createDate) {
            var temp = list[j]
            list[j] = list[j+1]
            list[j+1] = temp
          }
        }
      }

      for (var i = 0; i < list.length; i++) {
        status = list[i].status
        console.log(`${list[i].id}. [${status == true ? "x" : " "}] ${list[i].task} Tanggal buat ${list[i].createDate}`);
      }
    }
    else if (idToDo == "desc" || typeof idToDo == "undefined") {
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list.length - 1; j++) {
          if (list[j].createDate < list[j+1].createDate) {
            var temp = list[j]
            list[j] = list[j+1]
            list[j+1] = temp
          }
        }
      }
      for (var i = 0; i < list.length; i++) {
        status = list[i].status
        console.log(`${list[i].id}. [${status == true ? "x" : " "}] ${list[i].task} Tanggal buat ${list[i].createDate}`);
      }
    }
  }

  else if(val == "list:completed"){
    list = searchStatus(true)
    console.log(`ID. [CheckList] TODO's NAME`)
    if (idToDo == "asc") {
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list.length - 1; j++) {
          if (list[j].createDate > list[j+1].createDate) {
            var temp = list[j]
            list[j] = list[j+1]
            list[j+1] = temp
          }
        }
      }

      for (var i = 0; i < list.length; i++) {
        status = list[i].status
        console.log(`${list[i].id}. [${status == true ? "x" : " "}] ${list[i].task} Tanggal buat ${list[i].createDate}`);
      }
    }
    else if (idToDo == "desc" || typeof idToDo == "undefined") {
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list.length - 1; j++) {
          if (list[j].createDate < list[j+1].createDate) {
            var temp = list[j]
            list[j] = list[j+1]
            list[j+1] = temp
          }
        }
      }
      for (var i = 0; i < list.length; i++) {
        status = list[i].status
        console.log(`${list[i].id}. [${status == true ? "x" : " "}] ${list[i].task} Tanggal buat ${list[i].createDate}`);
      }
    }
  }

  else if (val == "add") {

      var dataBaru = ""

      if (typeof argv[3] == "undefined") {
        console.log("Data harus di isi");
      }else {
        for (var i = 3; i < argv.length; i++) {
          dataBaru += argv[i] + (i < argv.length-1 ? " " : "")
        }
        list.push(new Task(list[list.length-1].id+1, false, dataBaru))

        // console.log(temp);

        // list.push({"id": read.length, "task": dataBaru})
        // console.log(data);
        jsonfile.writeFileSync(file, list)
        console.log(`Added "${dataBaru}" to your TODO list`);
      }
  }
  else if (val == "task") {

    // console.log(list[argv[3]-1].id);
    // console.log(argv[3]);

    cekStatus = list[index].cekStatus
    // console.log(typeof idToDo);
    // console.log(index);
    console.log(`nama task "${list[index].task}", status ${cekStatus == true ? "completed" : "uncomplete"}.`);
  }
  else if (val == "delete") {
    // console.log(argv[3]);
    // console.log(list[argv[3]-1].id);
    // if (list[argv[3]-1].id == argv[3]) {
    //
    // }

    console.log(`Delete "${list[index].task}" to your TODO list`);
    // console.log(list[i].id);
    list.splice(index, 1)
    jsonfile.writeFileSync(file, list)
  }
  else if (val == "completed") {

    // console.log(list[i].id);
    list[index].status = true
    list[index].completeDate = new Date()
    jsonfile.writeFileSync(file, list)
    console.log(`Task "${list[index].task}" to your TODO list telah selesai`);
  }

  else if (val == "uncompleted") {

    // console.log(list[i].id);
    list[index].status = false
    jsonfile.writeFileSync(file, list)
    console.log(`Task "${list[index].task}" to your TODO list belum selesai`);
  }
  else if (val == "tag") {
    var tag = ''
    for(var i = 4 ; i < argv.length ; i++){
      tag += argv[i] + (i < argv.length-1 ? ", " : "")
      list[index].tag.push(argv[i])
    }
    jsonfile.writeFileSync(file, list)
    console.log(`Tagged task "${list[index].task}" with tags : ${tag}`);
  }
  else if (val.search("filter") == 0) {
    var temp = val.split(":")
    var filter = searchFilter(temp[1])

    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < list.length - 1; j++) {
        if (list[j].createDate < list[j+1].createDate) {
          var temp = list[j]
          list[j] = list[j+1]
          list[j+1] = temp
        }
      }
    }
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < filter.length; j++) {
        if (filter[j] == list[i].id) {
          console.log(`${list[i].id}. ${list[i].task} [${list[i].tag}] Tanggal pembuatan: ${list[i].createDate}`);
        }
      }
    }
  }
})




// console.log(result);
