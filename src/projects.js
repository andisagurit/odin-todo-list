import controller from "./controller.js";

// module for the project array
export default class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    addProjectsDOM() {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-item");

        const projectName = document.createElement("p");
        projectName.textContent = this.name;

        const deleteButton = document.createElement("img");
        deleteButton.setAttribute('id', 'btn-delete');
        deleteButton.src = '../dist/images/delete.png';
        deleteButton.width = '25';
        deleteButton.addEventListener("click", controller.deleteProject);

        projectDiv.appendChild(projectName);
        projectDiv.appendChild(deleteButton);

        return projectDiv;
    }
}