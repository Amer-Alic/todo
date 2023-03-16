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
      if (spanText === "high") {
        span.style.color = "red";
        spanText = "H";
      } else if (spanText === "medium") {
        span.style.color = "orange";
        spanText = "M";
      } else if (spanText === "low") {
        span.style.color = "green";
        spanText = "L";
      }
      span.innerText = spanText;
      return span;
    }

    const taskTitleSpan = makeSpan("tasks-title", taskTitle);
    const taskDateSpan = makeSpan("tasks-date", date);
    const taskPrioritySpan = makeSpan("tasks-priority", taskPriority);

    const editSpan = document.createElement("span");
    editSpan.classList.add("tasks-edit-span");
    const editImg = document.createElement("img");
    editImg.classList.add("tasks-edit-img");
    editImg.src = "assets/edit-4-svgrepo-com.svg";
    editSpan.append(editImg);

    li.append(taskCheckDiv, taskTitleSpan, taskDateSpan, taskPrioritySpan, editSpan);
    return li;
  }

  static displayTasks(project, tasksUl = null, tasksTitleInputValue, tasksDateInputValue, tasksPrioritySelectValue) {
    tasksUl.innerHTML = "";
    for (let task of project.tasks) {
      tasksUl.append(Task.makeTaskLi(task.title, task.dueDate, task.priority));
    }
  }
}
