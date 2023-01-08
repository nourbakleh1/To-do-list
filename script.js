let input=document.querySelector(".input");
let submit=document.getElementsByClassName("add")[0];
let tasksdiv=document.querySelector(".tasks");
let ClearAll=document.querySelector(".all");

let ArrayOfTasks=[];


//check if there is tasks in local storage
if(localStorage.getItem("tasks"))
{
    ArrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}



getdatafromlocal();

submit.onclick=function(){
    if(input.value != ""){
        addTaskToArray(input.value);
        input.value = "";
    }
}
ClearAll.addEventListener("click",function(){
    // clear data from locastorage
    localStorage.removeItem("tasks");
    //clear data from array

    ArrayOfTasks=[];
    checkCount();

    tasksdiv.innerHTML="";


});

//click on task element

tasksdiv.addEventListener("click",function(e){

//delete check
if(e.target.className == "del"){
    //remove element from page
    e.target.parentElement.remove();
    //remove task from local storage
    deleteTaskwith(e.target.parentElement.getAttribute("data-id"));
checkCount();

}
// Task Element 
if(e.target.classList.contains("task")){
    //toggle completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    //toggle done class
    e.target.classList.toggle("done");
checkCount();


}


});
function addTaskToArray(taskText){
    // task data
    const task={
        id: Date.now(),
        title: taskText,
        completed: false,

    };
    //push task to array of tasks
    ArrayOfTasks.push(task);
checkCount();

    //add tasks to page
    addElementsToPageForm(ArrayOfTasks);
    //add task to local storage
    addDataToLocalStorageFrom(ArrayOfTasks);

}

function addElementsToPageForm(ArrayOfTasks){
    //empty tasks div
    tasksdiv.innerHTML= "";
    //create div
    ArrayOfTasks.forEach(task => {
        let div=document.createElement("div");
        div.className="task";
        //check if task Done
        if(task.completed === true){
            div.className="task done";
        }

        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //create  delete button
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        // add task div to tasks
        tasksdiv.appendChild(div); 

    });
}
function addDataToLocalStorageFrom(ArrayOfTasks){
window.localStorage.setItem("tasks",JSON.stringify(ArrayOfTasks));

}
function getdatafromlocal(){
    let data=window.localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
        addElementsToPageForm(tasks);
        
    }
}


function deleteTaskwith(taskId){
        ArrayOfTasks=ArrayOfTasks.filter((task)=>
        task.id != taskId
        );
        addDataToLocalStorageFrom(ArrayOfTasks);
}
function toggleStatusTaskWith(taskId){

    for(let i=0;i<ArrayOfTasks.length;i++){
        if(ArrayOfTasks[i].id== taskId){
            ArrayOfTasks[i].completed == false ? ArrayOfTasks[i].completed = true: ArrayOfTasks[i].completed = false;
        }
    }
    addDataToLocalStorageFrom(ArrayOfTasks);
}

let text=document.getElementsByClassName("text")[0];
let text2=document.getElementsByClassName("text")[1];


function checkCount()
{
    let counter=0;
    let count=0;
    if(ArrayOfTasks.length !=0){
        ArrayOfTasks.forEach(function(ele){
            if(ele.completed===true){
                count=count+1;
            }
            else{
                counter=counter+1;
            }
        });
        text.innerHTML=`Not Completed: ${counter}`;
        text2.innerHTML=`Completed: ${count}`;
    
    }
    else{
        text.innerHTML=`Not Completed`;
        text2.innerHTML=`Completed`;

    }
}


checkCount();
