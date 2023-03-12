import format from "date-fns/format";

export default class Task {
  constructor(title, dueDate, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.done = false;
    this.priority = priority;
  }

  static makeTaskLi(taskTitle, taskDate, taskPriority) {
    let date = format(new Date(taskDate), "MM/dd/yyyy");

    const li = document.createElement("li");
    li.classList.add("tasks-li");

    const taskCheckDiv = document.createElement("div");
    taskCheckDiv.classList.add("tasks-check");

    function makeSpan(spanClass, spanText) {
      let span = document.createElement("span");
      span.classList.add(spanClass);
      span.innerText = spanText;
      return span;
    }

    const taskTitleSpan = makeSpan("tasks-title", taskTitle);
    const taskDateSpan = makeSpan("tasks-date", date);
    const taskPrioritySpan = makeSpan("tasks-priority", taskPriority);
    li.append(taskCheckDiv, taskTitleSpan, taskDateSpan, taskPrioritySpan);
    return li;
  }

  static displayTasks(project, tasksUl = null, tasksTitleInputValue, tasksDateInputValue, tasksPrioritySelectValue) {
    tasksUl.innerHTML = "";
    for (let task of project.tasks) {
      tasksUl.append(Task.makeTaskLi(task.title, task.dueDate, task.priority));
    }
  }

  renameTask(newTitle) {
    this.title = newTitle;
  }

  markDone() {
    this.done = true;
  }

  changePriority(newPriority) {
    this.priority = newPriority;
  }
}
