// =========================================
// CURRENTLY EDITING TASK
// =========================================

let editingTask = null;
// =========================================
// ADD TASK MODAL
// =========================================

// Find the button
const addTaskBtn = document.getElementById("addTaskBtn");

// Find the modal
const taskModal = document.getElementById("addTaskModal");

// Find the close (×) button
const closeTaskModal = document.getElementById("closeTaskModal");

// Open the modal
addTaskBtn.addEventListener("click", function () {
    taskModal.style.display = "flex";
});

// Close the modal
closeTaskModal.addEventListener("click", function () {
    taskModal.style.display = "none";
});
// make the existing cards editable and deletable
function attachTaskEvents(taskCard) {

    const deleteBtn = taskCard.querySelector(".ff-btn-delete");
    const editBtn = taskCard.querySelector(".ff-btn-edit");

    deleteBtn.addEventListener("click", function () {

        const confirmDelete = confirm("Are you sure you want to delete this task?");

        if (confirmDelete) {
    taskCard.remove();
    saveTasks();
}

    });

    editBtn.addEventListener("click", function () {

        editingTask = taskCard;

        document.getElementById("taskName").value =
            taskCard.querySelector(".ff-task-card-title").innerText;

        document.getElementById("taskDate").value =
            taskCard.querySelectorAll(".ff-m-val")[0].innerText;

        document.getElementById("taskPriority").value =
            taskCard.querySelectorAll(".ff-m-val")[1].innerText;

        document.getElementById("taskTime").value =
            taskCard.querySelectorAll(".ff-m-val")[2].innerText.replace(" Hours", "");

        taskModal.style.display = "flex";

    });

}
const existingTasks = document.querySelectorAll(".ff-task-profile-card");

existingTasks.forEach(function (task) {
    attachTaskEvents(task);
});
saveTasks();
// =========================================
// SAVE TASK
// =========================================

const saveTaskBtn = document.getElementById("saveTaskBtn");

saveTaskBtn.addEventListener("click", function () {

    // Get values from the form
    const taskName = document.getElementById("taskName").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskPriority = document.getElementById("taskPriority").value;
    const taskTime = document.getElementById("taskTime").value;

    console.log(taskName);
    console.log(taskDate);
    console.log(taskPriority);
    console.log(taskTime);
    const taskContainer = document.getElementById("taskContainer");
    if (editingTask !== null) {

    editingTask.querySelector(".ff-task-card-title").innerText = taskName;

    editingTask.querySelectorAll(".ff-m-val")[0].innerText = taskDate;

    editingTask.querySelectorAll(".ff-m-val")[1].innerText = taskPriority;

   editingTask.querySelectorAll(".ff-m-val")[2].innerText =
    taskTime + " Hours";

saveTasks();

editingTask = null;

    editingTask = null;

    taskModal.style.display = "none";

    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskPriority").selectedIndex = 0;
    document.getElementById("taskTime").value = "";

    return;

}

const newTask = document.createElement("div");

newTask.className = "ff-glass-card ff-task-profile-card";

newTask.innerHTML = `
    <h2 class="ff-task-card-title">${taskName}</h2>

    <div class="ff-task-data-matrix">

        <div class="ff-matrix-row">
            <span class="ff-m-label">Due:</span>
            <span class="ff-m-val">${taskDate}</span>
        </div>

        <div class="ff-matrix-row">
            <span class="ff-m-label">Priority:</span>
            <span class="ff-m-val ff-high-alert">${taskPriority}</span>
        </div>

        <div class="ff-matrix-row">
            <span class="ff-m-label">Est Time:</span>
            <span class="ff-m-val">${taskTime} Hours</span>
        </div>

        <div class="ff-matrix-row">
            <span class="ff-m-label">Effort:</span>
            <span class="ff-m-val">Medium</span>
        </div>

    </div>

    <div class="ff-status-banner-card">
        Status: Pending
    </div>

    <div class="ff-card-action-bar">
        <button class="ff-btn-subtle ff-btn-edit">EDIT</button>
        <button class="ff-btn-subtle ff-btn-delete">DELETE</button>
    </div>
`;

taskContainer.appendChild(newTask);


// Attach Edit & Delete functionality
attachTaskEvents(newTask);

// Save all tasks
saveTasks();
// Close modal
taskModal.style.display = "none";

// Reset form
document.getElementById("taskName").value = "";
document.getElementById("taskDate").value = "";
document.getElementById("taskPriority").selectedIndex = 0;
document.getElementById("taskTime").value = "";
});
// =========================================
// SAVE TASKS
// =========================================

function saveTasks() {

    const allTasks = [];

    document.querySelectorAll(".ff-task-profile-card").forEach(function(card){

        allTasks.push({

            title: card.querySelector(".ff-task-card-title").innerText,

            due: card.querySelectorAll(".ff-m-val")[0].innerText,

            priority: card.querySelectorAll(".ff-m-val")[1].innerText,

            time: card.querySelectorAll(".ff-m-val")[2].innerText

        });

    });

    localStorage.setItem("focusflowTasks", JSON.stringify(allTasks));

}