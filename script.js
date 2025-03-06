let addInput = document.querySelector("#addInput")
let addBtn = document.querySelector("#addBtn")
let tasksDiv = document.querySelector("#tasksDiv")
let finishedTasksDiv = document.querySelector("#finishedTasksDiv")


let tasksList = JSON.parse(localStorage.getItem("tasksList")) || [];
let nextId = parseInt(localStorage.getItem("nextId")) || 1;

addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let val = addInput.value
    tasksList.push({ id: nextId, text: val, tick: false })
    nextId += 1
    console.clear()
    tasksList.forEach((item) => {
        console.log(item)
    })

    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    localStorage.setItem("nextId", nextId);
    showToDoList()

})

let deleteTask = (taskId) => {
    tasksList = tasksList.filter(task => task.id !== taskId);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
}

let tickTask = (taskId) => {
    tasksList = tasksList.map((task) => {
        if (task.id == taskId) {
            return { ...task, tick: true };
        }
        return task;
    });
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
};

let showToDoList = () => {
    tasksDiv.innerHTML = ""
    let tasksCount = document.createElement("h5")
    tasksCount.classList.add(
        "text-white", "text-center"
    );

    let untickedTasks = 0
    tasksList.forEach((task) => {
        if (!task.tick) {
            untickedTasks += 1
        }
    })

    tasksCount.innerHTML = `Tasks to do - ${untickedTasks}`
    tasksDiv.append(tasksCount)

    tasksList.forEach((task) => {
        if (!task.tick) {
            let taskItem = document.createElement("div")
            taskItem.classList.add("main-border-radius", "my-3", "p-3", "col-12", "taskBg", "d-flex", "justify-content-space-between", "align-items-center")
            taskItem.innerHTML = `
                        <h5><deleted>${task.text}</deleted></h5>
                        <div class="d-flex justify-content-space-between align-items-center  mx-2">
                            <button id="t_${task.id}" type="button" class="px-3 border-none-btn btn"><img class="icon"
                                    src="images/tick.png" alt="Tick"></button>
                            <button id="d_${task.id}" type="button" class="px-3 border-none-btn btn"><img class="icon"
                                    src="images/trash.png" alt="Tick"></button>
                        </div>
                    `
            tasksDiv.append(taskItem)
        }
    })
}

let showFinshedTasks = () => {
    finishedTasksDiv.innerHTML = ""
    let tasksCount = document.createElement("h5")
    tasksCount.classList.add(
        "text-white", "text-center"
    );

    let finishedTasks = 0
    tasksList.forEach((task) => {
        if (task.tick) {
            finishedTasks += 1
        }
    })

    tasksCount.innerHTML = `Done - ${finishedTasks}`
    finishedTasksDiv.append(tasksCount)

    tasksList.forEach((task) => {
        if (task.tick) {
            let taskItem = document.createElement("div")
            taskItem.classList.add("main-border-radius", "my-3", "p-3", "col-12", "taskBg", "d-flex", "justify-content-space-between", "align-items-center")
            taskItem.innerHTML = `
                        <h5 class="green"><del>${task.text}</del></h5>
                        <div class="d-flex justify-content-space-between align-items-center  mx-2">
                            
                            <button id="d_${task.id}" type="button" class="px-3 border-none-btn btn"><img class="icon"
                                    src="images/trash.png" alt="Tick"></button>
                        </div>
                    `
            finishedTasksDiv.append(taskItem)
        }
    })
}

showToDoList()
showFinshedTasks()

let taskDelete = (event) => {
    let button = event.target.closest("button");
    if (!button) return;

    let buttonId = button.id;
    console.log("Clicked Button ID:", buttonId);


    if (buttonId.startsWith("t_")) {
        let tickId = Number(buttonId.replace("t_", ""))
        tickTask(tickId)
        console.log("Completed: ", tickId);

    }

    if (buttonId.startsWith("d_")) {
        let deleteId = Number(buttonId.replace("d_", ""))
        deleteTask(deleteId)
        console.log("Deleted: ", deleteId);
    }
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    showToDoList()
    showFinshedTasks()
}

tasksDiv.addEventListener("click", taskDelete);
finishedTasksDiv.addEventListener("click", taskDelete);
