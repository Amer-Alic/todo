export default class Project {
  constructor(title) {
    (this.title = title), (this.tasks = []);
  }

  static makeProjectLi(title) {
    // create li element
    const li = document.createElement("li");
    li.classList.add("projects-li");
    li.innerText = title;
    // create button that will wrap the img delete icon
    const button = document.createElement("button");
    button.classList.add("projects-li-delete-button");
    // create img delete icon
    const img = document.createElement("img");
    img.src = "assets/close-svgrepo-com.svg";
    img.classList.add("projects-li-delete-icon");
    button.append(img);
    li.append(button);
    return li;
    // <li>asds<button><img /></button></li>
  }

  static displayProjects(projectsUl, toDo, projectsDeleteButtons = null) {
    projectsUl.innerHTML = "";
    for (let project of toDo.projectsStorage) {
      if (project.title !== "ALL" && project.title !== "WEEK" && project.title !== "TODAY") {
        projectsUl.append(Project.makeProjectLi(project.title));
      }
    }
  }

  static removeTask(selectedProject, taskTitle, toDo) {
    let p = toDo.projectsStorage.find((e) => e.title === selectedProject);

    let taskIndex = p.tasks.findIndex((task) => task.title === taskTitle);

    if (taskIndex !== -1) {
      p.tasks.splice(taskIndex, 1);
    }
  }

  addTask(NewTask) {
    this.tasks.push(NewTask);
  }
}
