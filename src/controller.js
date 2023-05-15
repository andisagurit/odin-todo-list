import Project from "./projects.js";
import Todo from "./todo.js";
import initialpageLoad from "./index.js";

const displayController = (() => {
    let projectArrays = [];

    function addProjects(e) {
        e.preventDefault();
        const input = document.querySelector(".project-name-input");

        if (input.value == "") {
            return;
        }

        let newProject = new Project(e.target.parentNode.parentNode[0].value);
        projectArrays.push(newProject);
    
        const projectList = document.querySelector(".project-items");
        const item = newProject.addProjectsDOM();
        item.addEventListener("click", initialpageLoad.changeTaskTab);
        projectList.appendChild(item);
    
        const form = document.querySelector(".project-form");
        form.classList.add("hide");
        input.value = "";

        const addProjectButton = document.querySelector(".add-project");
        addProjectButton.classList.remove("hide");
    }

    function addTodos(e) {
        let form = e.target.parentNode.parentNode;
        if (form[0].value == "" || form[2].value == "") {
            return;
        }
    
        const addTodoButton = document.querySelector(".add-todo");
        const projectName = addTodoButton.getAttribute("data-project-name");

        let todo = new Todo(
            form[0].value,
            form[1].value,
            form[2].value,
            projectName,
            false
        );
    
        projectArrays.forEach((project) => {
            if (project.name === projectName) {
                project.addTodo(todo);
            }
        });
    
        form[0].value = "";
        form[1].value = "";
        form[2].value = "";
        form.parentNode.classList.add("hide");
    
        addTodoButton.classList.remove("hide");
    
        const task = todo.addTodosDOM();
        const todoList = document.querySelector(".todos");
        todoList.appendChild(task);
    }

    function toggleTaskCheck(e) {
        e.target.classList.toggle("checked");
        e.target.nextSibling.classList.toggle("item-checked");
    
        const title = e.target.nextSibling.querySelector("p").innerText;
    
        projectArrays.forEach((project) => {
            project.todos.forEach((todo) => {
                if (todo.title == title) {
                    todo.checked = !todo.checked;
                }
            });
        });
    }

    function showProjects(name) {
        const todoList = document.querySelector(".todos");
        todoList.innerHTML = "";
    
        projectArrays.forEach((project) => {
            if (project.name == name) {
                project.todos.forEach((todo) =>
                todoList.appendChild(todo.addTodosDOM())
                );
            }
        });
    }

    function showAllTasks() {
        const todoList = document.querySelector(".todos");
        todoList.innerHTML = "";

        projectArrays.forEach((project) => {
            project.todos.forEach((todo) =>
                todoList.appendChild(todo.addTodosDOM())
            );
        });
    }

    function deleteProject(e) {
        const projectName = e.target.parentNode.querySelector("p").innerText;
        e.target.parentNode.classList.remove("active");
        let proj;

        projectArrays.forEach((project) => {
            if (project.name == projectName) {
                proj = project;
            }
        });

        projectArrays.splice(proj, 1);
    
        const heading = document.querySelector(".headline");
        const addTodo = document.querySelector(".add-todo");
    
        heading.innerText = "Yours Tasks";
        addTodo.classList.add("hide");
    
        showAllProjects();
    }

    function deleteTodo(e) {
        const projectName = e.target.parentNode.parentNode.getAttribute("data-project-title");
        const taskTitle = e.target.parentNode.parentNode.querySelector("p").innerText;
        let todoItem;

        projectArrays.forEach((project) => {
            if (project.name == projectName) {
                    project.todos.forEach((todo) => {
                    if (todo.title == taskTitle) {
                        todoItem = todo;
                    }
                });
                project.todos.splice(todoItem, 1);
            }
        });

        const page = document.querySelector(".headline").textContent;
        if (page === "Your Tasks") {
            showAllTasks();
        } else {
            showProjects(projectName);
        }
    }


    function showAllProjects() {
        const projectItems = document.querySelector(".project-items");
        projectItems.innerHTML = "";
    
        projectArrays.forEach((project) => {
          let item = project.addProjectsDOM();
          item.addEventListener("click", initialpageLoad.changeTaskTab);
    
          projectItems.appendChild(item);
        });
    }
    
    return { addProjects, addTodos, toggleTaskCheck, showProjects, showAllTasks, deleteProject, deleteTodo, showAllProjects };
})();

export default displayController;