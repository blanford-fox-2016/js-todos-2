'use strict'
// dataObject.push({'task':'doing nothing'})
// jsonfile.writeFileSync(file,dataObject)
const fs = require('fs')
const jsonfile = require('jsonfile')
var dataJson = fs.readFileSync('data.json','utf-8');
var dataObject = JSON.parse(dataJson);
var file = 'data.json';
var tampung_dataObject = ''

var date = new Date()


//console.log(dataObject[0]);
// for(var i=0;i<dataObject.length;i++){
// dataObject[i].created_date = date
// dataObject[i].completed_date = " "
// }
// jsonfile.writeFileSync(file,dataObject)

process.argv.forEach((val,index,array)=>{
  switch (val) {
    case 'help':
    console.log("node todo.js help\nnode todo.js list\nnode todo.js add <task_content>\nnode todo.js task <task_id>\nnode todo.js delete <task_id>\nnode todo.js complete <task_id>\nnode todo.js uncomplete <task_id>\nnode todo.js list:outstanding asc|desc\nnode todo.js list:completed asc|desc\nnode todo.js tag <task_id> <tag_name_1> <tag_name_2>\nnode todo.js filter:<tag_name>");
    break;
    case 'list':
    for(var idx=0;idx<dataObject.length;idx++){
    tampung_dataObject += dataObject[idx].id+". "+dataObject[idx].status+" "+dataObject[idx].task+"\n"
  }
  console.log(tampung_dataObject);
    break;
    case 'add':
    var tampung_string =""
    var id_task
    if(array.length >3){
      for(var i=3;i<array.length;i++){
        tampung_string +=" "+array[i]
        id_task = dataObject.length+random_id()
      }
    }
    dataObject.push({'id':id_task,'status':'[ ]','task':tampung_string,'created_date':date})
    jsonfile.writeFileSync(file,dataObject)
    break;
    case 'task':
    if(array.length === 4)
    {
      console.log(array[3]);
      for(var i=0;i<dataObject.length;i++){
      if(dataObject[i].id.toString() === array[3].toString()){
      console.log('=========== [ ] => Uncompleted [X] || => Completed ================');
      console.log(dataObject[i].status+" "+ dataObject[i].task);
    }
    }
  }
    break;
    case 'delete':
    if(array.length === 4){
      for(var i=0;i<dataObject.length;i++)
      {
        if(dataObject[i].id.toString() === array[3].toString()){
          dataObject.splice(i,1)
        }
      }
    }
    jsonfile.writeFileSync(file,dataObject)
    break;
    case 'complete':
    if(array.length === 4){
      for(var i=0;i<dataObject.length;i++)
      {
        if(dataObject[i].id.toString() === array[3].toString()){
        dataObject[i].status = '[X]'
        dataObject[i].completed_date = date
        }
      }
    }
    jsonfile.writeFileSync(file,dataObject)
    break;
    case 'uncomplete':
    if(array.length === 4){
      for(var i=0;i<dataObject.length;i++)
      {
        if(dataObject[i].id.toString() === array[3].toString()){
        dataObject[i].status = '[ ]'
        }
      }
    }
    jsonfile.writeFileSync(file,dataObject)
    break;
    case 'list:outstanding':
    if(array.length === 4){
        if(array[3].toString() === 'asc'){
          dataObject.sort(function(a,b){
          return new Date(a.created_date) - new Date(b.created_date);
        })
        }else if(array[3].toString() === 'desc')
        {
          dataObject.sort(function(a,b){
          return new Date(b.created_date) - new Date(a.created_date);
        })
        }
    }
    for(var i=0;i<dataObject.length;i++){
    console.log(dataObject[i].id+" "+dataObject[i].status+" "+ dataObject[i].task+" Created "+dataObject[i].created_date);
  }
    break;
    case 'list:completed':
    if(array.length === 4){
        if(array[3].toString() === 'asc'){
          dataObject.sort(function(a,b){
          return new Date(a.completed_date) - new Date(b.completed_date);
        })
        }else if(array[3].toString() === 'desc')
        {
          dataObject.sort(function(a,b){
          return new Date(b.completed_date) - new Date(a.completed_date);
        })
        }
    }
    for(var i=0;i<dataObject.length;i++){
    if(typeof dataObject[i].completed_date !== 'undefined')
    console.log(dataObject[i].id+" "+dataObject[i].status+" "+ dataObject[i].task+" Completed "+dataObject[i].completed_date);
  }
    break
    case 'tag':
    if(array.length >3){
      var tampung_tag = []
      for(var i=0;i<dataObject.length;i++)
      {
        if(dataObject[i].id.toString() === array[3].toString()){
        if(array.length > 3){
          for(var j=4;j<array.length;j++){
            if(tampung_tag[j] !== 'undefined'){
            tampung_tag += ""+array[j]
          //  tampung_tag.push(array[j])
        }
        }
          dataObject[i].tag = tampung_tag
      }
      console.log(`Tagged tag "${dataObject[i].task}" with tags :${dataObject[i].tag}`);
        }
      }
    }

   jsonfile.writeFileSync(file,dataObject)
    break
    case 'filter':
    if(array.length > 3)
    {
      for(var i=0;i<dataObject.length;i++){
      if(dataObject[i].tag === array[3].toString())
      {
        console.log(`${dataObject[i].task} ${dataObject[i].tag}`);
      }
    }
    }
    break
    default:
  }
})


function random_id()
{
  return Math.floor(Math.random()*10)+1
}
