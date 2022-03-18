const { Console } = require("console");
const readline =require("readline");
const  salida=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/* 
    Primer modo: lectura de tareas a realizar
*/

let taskList=[];

function addTask(taskList,taskDescription){
    taskList.push({
        done:false,
        description: taskDescription
    });
}

function printTaskList(taskList){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].done){
            console.log(`Tarea ${i+1}: [x] ${taskList[i].description}`);
        }
        else{
            console.log(`Tarea ${i+1}: [ ] ${taskList[i].description}`);
        }
    }
}
/*
Primer modo: lectura de tareas a realizar
*/

function askForTask(taskList){
    salida.question("Introduce una tarea [Fin]=Para terminar o [Exit]=Para salir: ", (asnwer)=>{
        switch(asnwer){
            case "Fin":
                console.log("No se introduce tarea");
                mode2(taskList);
            break;
            case "Exit":
                salida.close();
            break;
            default:
                addTask(taskList,asnwer);
                console.log(`La lista actual es: `);
                printTaskList(taskList);
                askForTask(taskList);
        }
    })
}

/* 
    Segundo modo: Terminar tareas 
*/

function markTastAsDone(taskList,index){
    if(index>=0 &&index<taskList.length){
        taskList[index].done=true;
    }
    else{
        console.log("Esa tarea no se encuentra en la lista");
    }
}

function checkAllDone(taskList){
    for(let task of taskList){
        if(!task.done){
            return false;
        }
        return true;
    }
}

function mode2(taskList){
    printTaskList(taskList);
    salida.question("Introduce la tarea terminada [Fin]=Para terminar o [Exit]=Para salir: ", (asnwer)=>{
        switch(asnwer){
            case "Fin":
            case "Exit":
                console.log("See you later!");
                salida.close();
            break;
            default:
                markTastAsDone(taskList,asnwer-1);
                if(checkAllDone(taskList)){
                    console.log("En hora buena has completado todo!");
                    salida.close();
                }
                else{
                mode2(taskList);
                }                
        }
    })
}

askForTask(taskList);
