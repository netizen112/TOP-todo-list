import {
    addList,
    getListCollection,
    getList,
    addItemToList,
    deleteItemFromList,
    // editTodoItemTitle,
} from "./listCollection";

import deleteCircle from "../assets/delete-circle-outline.svg";
// import pencil from "../assets/pencil.svg";

let currentListIndex = 0;

let displayControlSubmodule = (function () {
    function initializeTodoItem(listIndex, itemIndex) {
        let todoItem = document.createElement("li");
        todoItem.setAttribute("data-listindex", listIndex);
        todoItem.setAttribute("data-itemindex", itemIndex);
        todoItem.classList.add("todoItem");

        return todoItem;
    }

    function initializeTodoItemName(title) {
        let todoItemName = document.createElement("span");
        todoItemName.classList.add("todoItemName");
        todoItemName.innerText = title;

        return todoItemName;
    }

    function deleteTodoItem(e) {
        let listIndex = e.originalTarget.dataset.listindex;
        let itemIndex = e.originalTarget.dataset.itemindex;
    
        deleteItemFromList(listIndex, itemIndex);
        displayListItems(listIndex);
    }

    function createDeleteButton(listIndex, itemIndex) {
        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "image");
        deleteButton.setAttribute("src", deleteCircle);
        deleteButton.classList.add("btnDeleteTodo");
        deleteButton.setAttribute("data-listindex", listIndex);
        deleteButton.setAttribute("data-itemindex", itemIndex);
        deleteButton.onclick = deleteTodoItem;

        return deleteButton;
    }

    function displayListItems(listIndex) {
        const ulTodoList = document.getElementById("todo-items");
        ulTodoList.innerHTML = "";
        const todoList = getList(listIndex);

        todoList.forEach((item, itemIndex) => {
            let todoItem = initializeTodoItem(listIndex, itemIndex);
            let todoItemName = initializeTodoItemName(item.title);

            let todoButtons = document.createElement("div");
            todoButtons.classList.add("todoButtons");

            let deleteButton = createDeleteButton(listIndex, itemIndex);

            todoItem.appendChild(todoItemName);
            todoButtons.appendChild(deleteButton);
            todoItem.appendChild(todoButtons);
            ulTodoList.appendChild(todoItem);
        });
    }

    return { displayListItems };
})();

// This function displays all todo items in a list
// function displayList(listIndex) {
//     const ulTodoList = document.getElementById("todo-items");
//     ulTodoList.innerHTML = "";

//     const todoList = getList(listIndex);

//     // Create the todo item display
//     todoList.forEach((item, itemIndex) => {
//         let todoItem = document.createElement("li");
//         todoItem.setAttribute("data-listindex", listIndex);
//         todoItem.setAttribute("data-itemindex", itemIndex);
//         todoItem.classList.add("todoItem");

//         let todoItemName = document.createElement("span");
//         todoItemName.classList.add("todoItemName");
//         todoItemName.innerText = item.title;

//         todoItem.appendChild(todoItemName); //

//         let todoButtons = document.createElement("div");
//         todoButtons.classList.add("todoButtons");

//         let deleteButton = document.createElement("input");
//         deleteButton.setAttribute("type", "image");
//         deleteButton.setAttribute("src", deleteCircle);
//         deleteButton.classList.add("btnDeleteTodo");
//         deleteButton.setAttribute("data-listindex", listIndex);
//         deleteButton.setAttribute("data-itemindex", itemIndex);
//         deleteButton.onclick = deleteTodoItem;

//         todoButtons.appendChild(deleteButton);

//         // let editButton = document.createElement("input");
//         // editButton.setAttribute("type", "image");
//         // editButton.setAttribute("src", pencil);
//         // editButton.classList.add("btnEditTodo");
//         // editButton.setAttribute("data-listindex", listIndex);
//         // editButton.setAttribute("data-itemindex", itemIndex);
//         // editButton.onclick = editTodoItem;

//         todoItem.appendChild(todoButtons);
//         ulTodoList.appendChild(todoItem);
//     });
// }

function eventSelectList(e) {
    let listIndex = e.target.dataset.index;
    console.log(`List ${listIndex} selected`);
    currentListIndex = listIndex; // Sets global variable
    displayControlSubmodule.displayListItems(listIndex);
}

function updateListsDisplay() {
    let ul = document.getElementById("list-items");
    ul.innerHTML = "";

    let listCollection = getListCollection();
    listCollection.forEach((list, index) => {
        let displayListItem = document.createElement("li");
        displayListItem.setAttribute("data-index", index);
        displayListItem.classList.add("list");
        displayListItem.innerText = list.listName;
        displayListItem.addEventListener("click", eventSelectList);
        ul.appendChild(displayListItem);
    });
}

// Create list - open a dialog, get inputs, call function to create list, update display
function handleCreateList() {
    let listName = document.getElementById("list-name").value;
    addList(listName);
    updateListsDisplay();
}

function handleCreateTodo() {
    let title = document.getElementById("input-todo-title").value;
    let description = document.getElementById("input-todo-description").value;
    let date = document.getElementById("input-due-date").valueAsNumber;
    let priority = parseInt(document.getElementById("select-priority").value);
    addItemToList(title, description, date, priority, currentListIndex);
    displayControlSubmodule.displayListItems(currentListIndex);
}

function initializeEventListeners() {
    // For the create list button
    document.getElementById("btn-create-list").onclick = () => {
        document.getElementById("dialog-create-list").showModal();
    };
    // For the submit create list button
    document.getElementById("btn-submit-create-list").onclick =
        handleCreateList;

    // For the create todo button
    document.getElementById("btn-create-todo").onclick = () => {
        document.getElementById("dialog-create-todo").showModal();
    };
    // For the submit create todo button
    document.getElementById("btn-submit-create-todo").onclick =
        handleCreateTodo;
}

export { initializeEventListeners };
