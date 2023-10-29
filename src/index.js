import {
  Task as Task,
  Tasklist as Tasklist,
  openAddTaskModal as openAddTaskModal,
  closeAddTaskModal as closeAddTaskModal,
  addTaskTolist as addTaskTolist,
} from "./app-logic.js";
import "./style.css";

const dialog = document.querySelector(".add-todo-dialog");
const addTodo = document.querySelector(".add");
const task1 = Task(
  "Wash dishes",
  "Wash all dishes in the house",
  "25.10.2023",
  "Normal",
  "No notes needed",
  ["Dish1", "Dish2"]
);
const task2 = Task(
  "Clean House",
  "Clean the whole house, starting with the kitchen.",
  "23.10.2023",
  "High",
  "This is a very large ToDo, so use the checklist",
  ["Clean kitchen", "Clean bathroom", "Clean living room", "Clean bedroom"]
);
const tasklist = Tasklist();
tasklist.addTask(task1);
tasklist.addTask(task2);
tasklist.renderTasks();
const addBtn = document.querySelector("#add-btn");
const closeBtn = document.querySelector("#cancel-btn");
addBtn.addEventListener("click", () => addTaskTolist(tasklist));
closeBtn.addEventListener("click", closeAddTaskModal);
addTodo.addEventListener("click", () => openAddTaskModal());
