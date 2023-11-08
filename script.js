// formos objektai surandami ir idedami i kintamuosius
const taskInput = document.getElementById("inputField");
const addBtn = document.getElementById("add-btn");
const tasksList = document.getElementById("tasks-list");
const buttons = document.querySelector(".button-row");
const clearList = document.getElementById("erase-btn");
const updateBtn = document.getElementById("update-btn");
const validationMessage = document.querySelector(".validation-message");

let tasks = []; //sukuriamas tuscias masyvas "tasks"

drawTaskList();

//mygtuko paspaudimo funkcija
addBtn.addEventListener("click", () => {
	if (taskInput.value.length <= 3) {
		validationMessage.style.display = "block";
	} else {
		validationMessage.style.display = "none";
		tasks.push({
			task: taskInput.value,
			isDone: false,
		});
		storeTasks();
		drawTaskList();
	}
});
//
clearList.addEventListener("click", () => {
	localStorage.removeItem("tasks");
	drawTaskList();
});

function drawTaskList() {
	if (localStorage.getItem("tasks") === null) {
		buttons.style.display = "none"; // hide buttons
		tasks = []; // empty array to prevent error
	} else {
		buttons.style.display = "flex"; // show buttons
		readTasks();
	}
	tasksList.innerHTML = ""; // remove everything in taskList before redraw

	tasks.forEach((t, i) => {
		//create task card
		const card = document.createElement("div");
		card.setAttribute("class", "task");
		//create checkbox
		const checkbox = document.createElement("input");
		checkbox.setAttribute("class", "task-status");
		checkbox.setAttribute("type", "checkbox");
		checkbox.checked = t.isDone;
		checkbox.addEventListener("input", () => {
			tasks[i].isDone = !tasks[i].isDone;
			storeTasks();
			drawTaskList();
		});
		//ceate task name
		const taskName = document.createElement("p");
		taskName.setAttribute("class", "task-name");
		taskName.textContent = t.task;
		//create remove button
		const removeBtn = document.createElement("button");
		removeBtn.setAttribute("class", "remove-btn");
		removeBtn.textContent = "X";
		removeBtn.addEventListener("click", () => {
			if (tasks.length === 1) {
				localStorage.removeItem("tasks");
				drawTaskList();
			} else {
				tasks.splice(i, 1);
				storeTasks();
				drawTaskList();
			}
		});

		//add elements in the card
		card.append(checkbox);
		card.append(taskName);
		card.append(removeBtn);

		tasksList.append(card); //append created card to the tasksList
		taskInput.value = ""; // clear input field
	});
}
function storeTasks() {
	tasks = tasks.sort((a, b) => a.isDone - b.isDone); // sort done tasks before store
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function readTasks() {
	tasks = JSON.parse(localStorage.getItem("tasks"));
}
