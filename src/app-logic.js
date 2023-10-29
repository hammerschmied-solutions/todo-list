import icon from "./arrow-down-bold.svg";

const Task = function (
  title,
  description = "",
  dueDate = new Date(),
  priority = "Normal",
  notes = "",
  checklist = []
) {
  const getTitle = () => title;
  const setTitle = (_title) => (title = _title);
  const getDescription = () => description;
  const setDescription = (_description) => (description = _description);
  const getDueDate = () => dueDate;
  const setDueDate = (_dueDate) => (dueDate = _dueDate);
  const getPriorioty = () => priority;
  const setPriority = (_priority) => (priority = _priority);
  const getNotes = () => notes;
  const setNotes = () => (_notes) => (notes = _notes);
  const getChecklist = () => checklist;
  const setChecklist = (_checklist) => (checklist = _checklist);
  const addItemToChecklist = (item) => checklist.append(item);
  const deleteItemFromChecklist = (item) => checklist.splice(checklist.indexOf(item), 1);
  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriorioty,
    setPriority,
    getNotes,
    setNotes,
    getChecklist,
    setChecklist,
    addItemToChecklist,
    deleteItemFromChecklist,
  };
};

const Tasklist = function () {
  const tasklist = [];
  const addTask = (task) => tasklist.push(task);
  const removeTask = (tasktitle) =>
    tasklist.splice(tasklist.map((task) => task.getTitle()).indexOf(tasktitle), 1);
  const getTask = (tasktitle) =>
    tasklist[tasklist.map((task) => task.getTitle()).indexOf(tasktitle)];
  const getAllTasks = () => {
    let tasks = "";
    tasklist.forEach((task) => (tasks += " " + task.getTitle()));
    return tasks;
  };
  const renderTasks = () => {
    const todoTable = document.querySelector(".todos");
    todoTable.innerHTML = "";
    tasklist.forEach((task) => {
      const newTask = document.createElement("tr");
      const title = document.createElement("td");
      const priority = document.createElement("td");
      const dueDate = document.createElement("td");
      const description = document.createElement("td");
      const extend = document.createElement("td");
      title.textContent = task.getTitle();
      priority.textContent = task.getPriorioty();
      dueDate.textContent = task.getDueDate();
      description.textContent = task.getDescription();
      const extendIcon = new Image();
      extendIcon.src = icon;
      extendIcon.classList.add("extend-icon");
      extendIcon.addEventListener("click", (event) => expandTask(event));
      extend.appendChild(extendIcon);
      newTask.appendChild(title);
      newTask.appendChild(priority);
      newTask.appendChild(dueDate);
      newTask.appendChild(description);
      newTask.appendChild(extend);
      newTask.classList.add("todo");
      switch (task.getPriorioty()) {
        case "Normal":
          newTask.classList.add("priority1");
          break;
        case "High":
          newTask.classList.add("priority2");
          break;
      }
      todoTable.append(newTask);
    });
  };
  function expandTask(event) {
    const clickedRow = event.target.parentNode.parentNode;
    if (clickedRow.nextSibling && clickedRow.nextSibling.classList.contains("dropdown-heading")) {
      clickedRow.nextElementSibling.nextElementSibling.remove();
      clickedRow.nextElementSibling.remove();
    } else {
      const taskTitle = event.target.parentNode.parentNode.children.item(0).textContent;
      const task = getTask(taskTitle);
      const checklistHeading = document.createElement("th");
      checklistHeading.textContent = "Checklist:";
      checklistHeading.colSpan = 2;
      const checklistCell = document.createElement("td");
      checklistCell.colSpan = 2;
      task.getChecklist().forEach((checkPoint) => (checklistCell.innerHTML += checkPoint + "<br>"));
      const notesHeading = document.createElement("th");
      notesHeading.textContent = "Notes:";
      notesHeading.colSpan = 3;
      const notesCell = document.createElement("td");
      notesCell.colSpan = 3;
      notesCell.textContent = task.getNotes();
      const headingRow = document.createElement("tr");
      headingRow.classList.add("dropdown-heading");
      const contentRow = document.createElement("tr");
      headingRow.append(checklistHeading, notesHeading);
      contentRow.append(checklistCell, notesCell);
      clickedRow.classList.add(".expanded-todo");
      contentRow.classList.add("dropdown-content");
      clickedRow.parentNode.insertBefore(contentRow, clickedRow.nextSibling);
      clickedRow.parentNode.insertBefore(headingRow, clickedRow.nextSibling);
    }
  }

  return { addTask, removeTask, getTask, getAllTasks, renderTasks, expandTask };
};

function openAddTaskModal() {
  document.querySelector(".add-todo-form").reset();
  document.querySelector(".add-todo-dialog").showModal();
}
function closeAddTaskModal() {
  document.querySelector(".add-todo-dialog").close();
}

function addTaskTolist(tasklist) {
  const newTask = Task(
    document.querySelector("#title").value,
    document.querySelector("#description").value,
    document.querySelector("#due-date").value,
    document.querySelector("#priority").value
  );
  tasklist.addTask(newTask);
  closeAddTaskModal();
  tasklist.renderTasks();
}

const Storage = function () {
  const isPopulated = function () {
    if (localStorage.length != 0) {
      getValuesFromStorage();
    }
  };
  const getValuesFromStorage = function () {
    for (i = 0; i++; i < localStorage.length) {
      localStorage.getItem(localStorage.key(i));
    }
  };
};

export { Task, Tasklist, openAddTaskModal, closeAddTaskModal, addTaskTolist };
