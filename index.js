const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskNum = document.getElementById("taskNum");
const clearBtn = document.getElementById("clearBtn");

function addTask(){
   if(inputBox.value === ''){
        alert("You must write something");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";//leave input field blank after adding item
    saveData();
    updateTaskCount();
}

/*Add items with the Enter button*/
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter"){
        addTask();
    }
});

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateTaskCount();
    } 
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateTaskCount();
    }
}, false);

//clear List
clearBtn.addEventListener("click", () =>{
    listContainer.innerHTML = "";
    updateTaskCount();
});

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    updateTaskCount();
}

function updateTaskCount(){
    const uncheckedTasks = listContainer.querySelectorAll("li:not(.checked)").length;
    taskNum.textContent = uncheckedTasks;
    
}
showTask();