// =========================================
// CURRENTLY EDITING HABIT
// =========================================

let editingHabit = null;

// =========================================
// MODAL
// =========================================

const addHabitBtn = document.getElementById("addHabitBtn");
const habitModal = document.getElementById("addHabitModal");
const closeHabitModal = document.getElementById("closeHabitModal");
const saveHabitBtn = document.getElementById("saveHabitBtn");

addHabitBtn.addEventListener("click", function () {

    habitModal.style.display = "flex";

});

closeHabitModal.addEventListener("click", function () {

    habitModal.style.display = "none";

});
// =========================================
// EXISTING HABITS
// =========================================

function attachHabitEvents(habitCard) {

    const editBtn = habitCard.querySelector(".ff-btn-edit");
    const deleteBtn = habitCard.querySelector(".ff-btn-delete");

    deleteBtn.addEventListener("click", function () {

        if (confirm("Delete this habit?")) {

            habitCard.remove();

        }

    });

    editBtn.addEventListener("click", function () {

        editingHabit = habitCard;

document.getElementById("habitName").value =
    habitCard.querySelector(".ff-habit-card-header-title").childNodes[0].textContent.trim();

document.getElementById("habitGoal").value =
    habitCard.querySelectorAll(".ff-s-val")[0].innerText;

document.getElementById("habitTarget").value =
    habitCard.querySelectorAll(".ff-s-val")[1].innerText;

document.getElementById("habitSuggestion").value =
    habitCard.querySelector(".ff-suggestion-italic").innerText;

saveHabitBtn.innerText = "UPDATE HABIT";

habitModal.style.display = "flex";

    });

}

const existingHabits = document.querySelectorAll(".ff-habit-tracking-card");

existingHabits.forEach(function (habit) {

    attachHabitEvents(habit);    

});
// =========================================
// SAVE HABIT
// =========================================
function resetHabitForm() {

    document.getElementById("habitName").value = "";
    document.getElementById("habitGoal").value = "";
    document.getElementById("habitTarget").value = "";
    document.getElementById("habitSuggestion").value = "";

}

// =========================================
// SAVE / UPDATE HABIT
// =========================================

saveHabitBtn.addEventListener("click", function () {

    const habitName = document.getElementById("habitName").value;
    const habitGoal = document.getElementById("habitGoal").value;
    const habitTarget = document.getElementById("habitTarget").value;
    const habitSuggestion = document.getElementById("habitSuggestion").value;

    // ============================
    // UPDATE EXISTING HABIT
    // ============================

    if (editingHabit !== null) {

        editingHabit.querySelector(".ff-habit-card-header-title").childNodes[0].textContent =
            habitName + " - ";

        editingHabit.querySelectorAll(".ff-s-val")[0].innerText = habitGoal;
        editingHabit.querySelectorAll(".ff-s-val")[1].innerText = habitTarget;
        editingHabit.querySelector(".ff-suggestion-italic").innerText = habitSuggestion;

        editingHabit = null;


        saveHabitBtn.innerText = "SAVE HABIT";

        habitModal.style.display = "none";

        resetHabitForm();

        return;

    }

    // =========================================
// CREATE NEW HABIT
// =========================================

const habitContainer = document.querySelector(".ff-habits-card-grid");

const newHabit = document.createElement("div");

newHabit.className = "ff-glass-card ff-habit-tracking-card";

newHabit.innerHTML = `

<h2 class="ff-habit-card-header-title">
    ${habitName}
</h2>

<div class="ff-habit-internal-sheet">

    <div class="ff-sheet-row">
        <span class="ff-s-lbl">Goal:</span>
        <span class="ff-s-val">${habitGoal}</span>
    </div>

    <div class="ff-sheet-row">
        <span class="ff-s-lbl">Today's Target:</span>
        <span class="ff-s-val">${habitTarget}</span>
    </div>

    <div class="ff-sheet-row">
        <span class="ff-s-lbl">Completion:</span>
        <span class="ff-s-val ff-completion-accent">0%</span>
    </div>

    <div class="ff-sheet-row ff-sheet-column-mode">
        <span class="ff-s-lbl">AI Suggestion:</span>
        <span class="ff-s-val ff-suggestion-italic">
            ${habitSuggestion}
        </span>
    </div>

</div>

<div class="ff-card-action-bar">

    <button class="ff-btn-subtle ff-btn-edit">
        EDIT
    </button>

    <button class="ff-btn-subtle ff-btn-delete">
        DELETE
    </button>

</div>

`;
habitContainer.appendChild(newHabit);

attachHabitEvents(newHabit);

habitModal.style.display = "none";

saveHabitBtn.innerText = "SAVE HABIT";

resetHabitForm();

});