import Project from "./projects";
import TodoList from "./Todolist";
import Task from "./tasks";

export default toDo;
let selectedProject = "ALL";
const projectsUl = document.querySelector("[data-projects-ul]");

// initialize toDo
const toDo = new TodoList();
// add default projects when entering the page for the first time
if (localStorage.length == 0) {
  toDo.addProjects([new Project("ALL")]);
  toDo.addProjects([new Project("TODAY")]);
  toDo.addProjects([new Project("WEEK")]);
  toDo.save();
  // if it is not the first time, get previous toDo and load it
} else {
  toDo.addProjects(TodoList.get());
  Project.displayProjects(projectsUl, toDo);
  let p = toDo.projectsStorage.find((e) => e.title === selectedProject);
  const tasksUl = document.querySelector("[data-tasks-ul]");

  Task.displayTasks(p, tasksUl);
}

// DOM PART FOR PROJECTS
const projectsCancelButton = document.querySelector("[data-projects-popup-cancle]");
const projectsAddButton = document.querySelector("[data-projects-add-button]");
const projectsPopup = document.querySelector("[data-projects-popup]");
const projectsSubmitButton = document.querySelector("[data-projects-popup-submit]");

function toggleProjectsPopup() {
  projectsPopup.classList.toggle("active");
}

function submitProjectsPopup() {
  const projectsTitleInput = document.querySelector("[data-projects-title]");
  if (projectsTitleInput.value === "") {
    alert("Title can't be empty");
    return;
  }
  const projectsTitle = projectsTitleInput.value;
  toDo.addProjects([new Project(`${projectsTitle}`)]);
  toDo.save();
  toggleProjectsPopup();
  Project.displayProjects(projectsUl, toDo);
  // refresh delete buttons upon adding new project
  addListenersOnProjectButtons();
}

function DOMremoveProject(projectsDeleteButton) {
  // select text of project
  let liText = projectsDeleteButton.parentNode.textContent;
  toDo.removeProject(liText);
  // refresh projects
  Project.displayProjects(projectsUl, toDo);
  toDo.save();
}

function selectProject() {
  const tasksH2 = document.querySelector("[data-tasks-h2]");
  const title = this.innerText;
  selectedProject = title;
  tasksH2.innerText = title;

  let p = toDo.projectsStorage.find((e) => e.title === selectedProject);
  const tasksUl = document.querySelector("[data-tasks-ul]");
  Task.displayTasks(p, tasksUl);
  addListenersOnTaskButtons();
}

function addListenersOnProjectButtons() {
  let projectsDeleteButtons = document.querySelectorAll(".projects-li-delete-button");
  let projectsLi = document.querySelectorAll(".projects-li");
  for (let projectLi of projectsLi) {
    projectLi.addEventListener("click", selectProject);
  }
  for (let projectsDeleteButton of projectsDeleteButtons) {
    projectsDeleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      DOMremoveProject(projectsDeleteButton);
    });
  }
}

projectsAddButton.addEventListener("click", toggleProjectsPopup);

projectsCancelButton.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleProjectsPopup();
});

projectsPopup.addEventListener("click", (e) => {
  // checks if you clicked on something else besides overlay
  if (e.target !== projectsPopup) return;
  toggleProjectsPopup();
});

projectsSubmitButton.addEventListener("click", submitProjectsPopup);

// DOM PART FOR TASKS //////////////

const tasksAddButton = document.querySelector("[data-tasks-add]");
const tasksPopup = document.querySelector("[data-tasks-popup]");
const tasksCancleButton = document.querySelector("[data-tasks-popup-cancle]");
const tasksSubmitButton = document.querySelector("[data-tasks-popup-submit]");
let checkBoxes = document.querySelectorAll(".tasks-check");
function toggleTasksPopup() {
  tasksPopup.classList.toggle("active");
}

function addListenersOnTaskButtons() {
  checkBoxes = document.querySelectorAll(".tasks-check");
  for (let checkBox of checkBoxes) {
    checkBox.addEventListener("click", tasksRemove);
  }
}

function submitTasksPopup() {
  let p = toDo.projectsStorage.find((e) => e.title === selectedProject);

  const tasksUl = document.querySelector("[data-tasks-ul]");
  const tasksDateInput = document.querySelector("[data-tasks-popup-date]");
  const tasksTitleInput = document.querySelector("[data-tasks-popup-title]");
  const tasksPrioritySelect = document.querySelector("[data-tasks-popup-priority]");

  if (tasksTitleInput.value === "" || tasksDateInput.value === "" || tasksPrioritySelect.value === "") {
    alert("Fill out all fields");
    return;
  }

  p.tasks.push(new Task(`${tasksTitleInput.value}`, `${tasksDateInput.value}`, `${tasksPrioritySelect.value}`));
  toDo.save();
  Task.displayTasks(p, tasksUl);
  toggleTasksPopup();
  addListenersOnTaskButtons();
}

function tasksRemove() {
  let p = toDo.projectsStorage.find((e) => e.title === selectedProject);
  let taskTitle = this.parentElement.querySelector(".tasks-title").innerText;
  const tasksUl = document.querySelector("[data-tasks-ul]");

  Project.removeTask(selectedProject, taskTitle, toDo);
  toDo.save();
  addListenersOnProjectButtons();
  Task.displayTasks(p, tasksUl);
}

// ADD EVENT LISTENERS
tasksAddButton.addEventListener("click", toggleTasksPopup);

tasksPopup.addEventListener("click", (e) => {
  // checks if you clicked on something else besides overlay
  if (e.target !== tasksPopup) return;
  toggleTasksPopup();
});
tasksCancleButton.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleTasksPopup();
});

tasksSubmitButton.addEventListener("click", submitTasksPopup);

window.onload = function () {
  addListenersOnProjectButtons();
  addListenersOnTaskButtons();
};
