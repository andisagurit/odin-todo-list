import controller from "./controller.js";

// module for the todo array
export default class Todo {
    constructor(title, desc, date, project, checked) {
        this.title = title;
        this.desc = desc;
        this.date = new Date(date).toLocaleDateString();
        this.project = project;
        this.checked = checked;
    }
  
    addTodosDOM() {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-item");
        todoDiv.setAttribute("data-project-title", this.project);
    
        const left = document.createElement("div");
        left.classList.add("left");
    
        const box = document.createElement("div");
        box.classList.add("unchecked");
        box.addEventListener("click", controller.toggleTaskCheck);
    
        const texts = document.createElement("div");
        texts.classList.add("text");
  
        if (this.checked) {
            box.classList.add("checked");
            texts.classList.add("item-checked");
        }
  
        const p1 = document.createElement("p");
        p1.innerHTML = `<b>Title:</b> ` + this.title;
        const p2 = document.createElement("p");
        p2.innerHTML = `<b>Description:</b> ` + this.desc;
    
        texts.appendChild(p1);
        texts.appendChild(p2);
    
        left.appendChild(box);
        left.appendChild(texts);
    
        todoDiv.appendChild(left);
    
        const right = document.createElement("div");
        right.classList.add("right");
    
        const date = document.createElement("p");
        date.classList.add("date");
        date.innerHTML = `<b>Due Date:</b> ` + this.date;
    
        const deleteButton = document.createElement("img");
        deleteButton.setAttribute('id', 'btn-delete');
        deleteButton.src = '../dist/images/delete.png';
        deleteButton.width = '25';
        deleteButton.addEventListener("click", controller.deleteTodo);
    
        right.appendChild(date);
        right.appendChild(deleteButton);
    
        todoDiv.appendChild(right);
    
        return todoDiv;
    }
}