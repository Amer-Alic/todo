class TodoList {
  constructor() {
    this.projectsStorage = [];
  }

  save() {
    localStorage.setItem("todo", JSON.stringify(this.projectsStorage));
  }

  static get() {
    return JSON.parse(localStorage.getItem("todo"));
  }

  // this function loops thrugh all Projects you passed in and pushes them to projectsStorage
  addProjects(NewProjects) {
    for (let NewProject of NewProjects) {
      this.projectsStorage.push(NewProject);
    }
  }

  removeProject(projectTitle) {
    // find an index of project
    let projectIndex = this.projectsStorage.findIndex((project) => project.title === projectTitle);
    // if it exsits delete it
    if (projectIndex !== -1) {
      this.projectsStorage.splice(projectIndex, 1);
    }
  }
}
// make default toDoList
export default TodoList;
