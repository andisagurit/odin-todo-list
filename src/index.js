// for testing to see if its connected to the main.js
// alert("This is a test!");

import controller from "./controller.js";

const initialpageLoad = (() => {
    function pageLoad() {
        addEvents();
        controller.showAllProjects();
        controller.showAllTasks();
    }

    function addEvents() {
        //project list dom
        const addProjectButton = document.querySelector(".add-project");
        const cancelProjectButton = document.querySelector(".cancel-project");

        const submitProjectButton = document.querySelector(".submit-project");
        submitProjectButton.addEventListener("click", controller.addProjects);

        addProjectButton.addEventListener("click", toggleProjectForm);
        cancelProjectButton.addEventListener("click", toggleProjectForm);

        //todo list dom
        const addTodoButton = document.querySelector(".add-todo");
        const cancelTodoButton = document.querySelector(".cancel-todo");

        const todoSubmitButton = document.querySelector(".sumbit-todo");
        todoSubmitButton.addEventListener("click", controller.addTodos);

        addTodoButton.addEventListener("click", toggleTodoForm);
        cancelTodoButton.addEventListener("click", toggleTodoForm);
    }

    function changeTaskTab(e) {
        const projectItems = document.querySelectorAll(".project-item");
        const addTodo = document.querySelector(".add-todo");
        addTodo.setAttribute("data-project-name", "");
    
        projectItems.forEach((item) => item.classList.remove("active"));
        e.target.classList.add("active");
        const heading = document.querySelector(".headline");

        if (e.target.classList.contains("project-item")) {
            heading.innerText = "Your Tasks from Project: " + e.target.querySelector("p").innerText;
            addTodo.classList.remove("hide");
            addTodo.setAttribute(
                "data-project-name",
                e.target.querySelector("p").innerText
            );
            controller.showProjects(e.target.querySelector("p").innerText);
        }
    }

    function toggleProjectForm(e) {
        if (e.target.classList.contains("add-project")) {
            e.target.classList.add("hide");

            const formProj = document.querySelector(".project-form");
            formProj.classList.remove("hide");

        } else if (e.target.classList.contains("cancel-project")) {
            const formProj = document.querySelector(".project-form");
            formProj.classList.add("hide");

            const input = document.querySelector(".project-name-input");
            input.value = "";

            const projectButton = document.querySelector(".add-project");
            projectButton.classList.remove("hide");
        }
    }

    function toggleTodoForm(e) {
        if (e.target.classList.contains("add-todo")) {
            e.target.classList.add("hide");

            const formTodo = document.querySelector(".todo-form");
            formTodo.classList.remove("hide");

        } else if (e.target.classList.contains("cancel-todo")) {
            const formTodo = document.querySelector(".todo-form");
            formTodo.classList.add("hide");
        
            const todoButton = document.querySelector(".add-todo");
            todoButton.classList.remove("hide");
        }
    }

    return { addEvents, pageLoad, changeTaskTab };
})();

initialpageLoad.pageLoad();
export default initialpageLoad;