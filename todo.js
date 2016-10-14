let fs = require('fs');

let list = [];
let dateTemp = [];

class Task {
	constructor(input){
		this.status = "[ ]"
		this.task = input;
		this.created_date = new Date();
		this.completed_date = " "
		this.tag = [];
	}
}

class Edit{
		static writeData(){
		fs.writeFile('data.json', JSON.stringify(list),function(err,data){})
	}
}

class Kumpulan{
	constructor(){
		list = JSON.parse(fs.readFileSync('data.json', 'utf8'))
	}

	addTask(input){
		list.push(new Task(input))
		Edit.writeData()
	}

	deleteTask(idx){
		list.splice(idx, 1)
		Edit.writeData()
	}

	completeTask(idx){
		list[idx].status = "[x]"
		Edit.writeData()
	}

	uncompleteTask(idx){
		list[idx].status = "[ ]"
		Edit.writeData()
	}

	addTag(idx){
		if(process.argv[4] != null){
			list[idx].tag.push(process.argv[4])
			console.log("tag pada task: "+list[idx].task +", ditambahkan..");
			Edit.writeData()
		}else{
			for (var i = 0; i < list.length; i++) {
				console.log(i+". "+list[i].task+ " [tag: " +list[i].tag+"]");
			}
		}

	}

	filter(tagName){
		for (var i = 0; i < list.length; i++) {
			for (var j = 0; j < list[i].tag.length; j++) {
				if(list[i].tag[j]==tagName){
					console.log("tag :["+ tagName+ "] ada pada list -"+list[i].task);
				}
			}
		}
	}


	showTask(){
		console.log("TO-DO LIST")
		for (let idx in list){
			console.log(`${idx}. ${list[idx].status} [${list[idx].task}] [${list[idx].created_date}]`);
		}
	}

	outstandingTask(){
		for (let idx in list){
			if(list[idx].status === "[ ]"){
				console.log(`${idx}. ${list[idx].status} [${list[idx].task}] [${list[idx].created_date}]`);
			}
		}
	}

	listAsc(){
		for (let idx in list){
			if(list[idx].status === "[ ]"){
			dateTemp.push(list[idx].created_date);
			}
		}
			let dateAsc = dateTemp.sort();
			let taskAsc = [];
			for (let idx in list){
			for(let i in dateAsc){
				if(dateAsc[i] === list[idx].created_date){
					taskAsc.push(list[idx].status + list[idx].task + " " +list[idx].created_date);
				}
			}
			}
			console.log(taskAsc);
	}

	listDsc(){
		for (let idx in list){
			if(list[idx].status === "[ ]"){
			dateTemp.push(list[idx].created_date);
			}
		}
			let dateDsc = dateTemp.sort().reverse();
			let taskDsc = [];
			for (let idx in list){
			for(let i in dateDsc){
				if(dateDsc[i] === list[idx].created_date){
					taskDsc.unshift(list[idx].status + list[idx].task + " " +list[idx].created_date);
				}
			}
			}
			console.log(taskDsc);
		}

	displayMenu(){
		console.log('1. menambah tugas. contoh: node todo.js add "belajar piano"')
		console.log("2. hapus tugas. contoh: node todo.js delete <indeks tugas>")
		console.log("3. menampilkan tugas. contoh: node todo.js list")
		console.log("4. tampilkan menu. contoh: node todo.js help")
		console.log("5. tandai tugas selesai. contoh: node todo.js complete <indeks tugas>");
		console.log("6. ubah tugas tidak selesai. contoh: node todo.js uncomplete <indeks tugas>");
		console.log("7. urutkan secara asc. contoh: node todo.js list:outstanding asc");
		console.log("8. urutkan secara dsc. contoh: node todo.js list:outstanding dsc");
		console.log("9. menambah tag. contoh: node todo.js tag <task_id> <task tag>");
		console.log("10. menambah list dan daftar tag. contoh: node todo.js tag");
		console.log("11. filter sesuai tag. contoh: node todo.js filter <indeks tugas>");
		}

	start(){
		switch (process.argv[2]) {
			case "add":
				this.addTask(process.argv[3])
				break;
			case "delete":
				this.deleteTask(process.argv[3])
				break;
			case "list":
				this.showTask()
				break;
			case "help":
				this.displayMenu()
				break;
			case "complete":
				this.completeTask(process.argv[3])
				break;
			case "uncomplete":
				this.uncompleteTask(process.argv[3])
				break;
			case "tag":
				this.addTag(process.argv[3]);
				break;
			case "filter":
				this.filter(process.argv[3]);
				break
			case "list:outstanding":
				if(process.argv[3] == "asc"){
				this.listAsc();
				}
				else if(process.argv[3] == "dsc"){
				this.listDsc();
				}
				else{
					this.outstandingTask(process.argv[3])
				}
				break;
			default:
				this.displayMenu()
				break;
		}
	}
}

let tugas = new Kumpulan()
tugas.start()
