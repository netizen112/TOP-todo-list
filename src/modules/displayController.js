import "../styles/style.css";
import {
    addList,
    deleteList,
    getListCollection,
    getListItems,
    addItemToList,
    deleteItemFromList,
    editTodoItem,
    editListName,
    getList,
} from "./listCollection";
import expandArrow from "../assets/chevron-down-circle-outline.svg";
import collapseArrow from "../assets/chevron-up-circle-outline.svg";
import deleteCircle from "../assets/delete-circle-outline.svg";
import editPencil from "../assets/pencil.svg";

import { format } from "date-fns";

let currentListIndex = 0;

// Controls display of todo list items
let displayControlSubmodule = (function () {
    function initializeTodoItem(listIndex, itemIndex, priority) {
        let todoItem = document.createElement("li");
        todoItem.setAttribute("data-listindex", listIndex);
        todoItem.setAttribute("data-itemindex", itemIndex);
        todoItem.classList.add("todoItem");

        // Set border color based on priority
        switch (priority) {
            case "Low":
                todoItem.classList.add("lowPriority");
                break;
            case "Medium":
                todoItem.classList.add("mediumPriority");
                break;
            case "High":
                todoItem.classList.add("highPriority");
                break;
            default:
                break;
        }

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

    function editTodo(listIndex, itemIndex) {
        let title = document.getElementById("edit-todo-title").value;
        let description = document.getElementById(
            "edit-todo-description"
        ).value;
        let date = document.getElementById("edit-due-date").valueAsNumber;
        let priority = parseInt(document.getElementById("edit-priority").value);

        editTodoItem(listIndex, itemIndex, title, description, date, priority);
        displayListItems(listIndex);
    }

    function createEditDialog(e) {
        let listIndex = e.target.dataset.listindex;
        let itemIndex = e.target.dataset.itemindex;

        let list = getListItems(listIndex);
        let item = list[itemIndex];

        document.getElementById("edit-todo-title").value = item.title;
        document.getElementById("edit-todo-description").value =
            item.description;

        let date = format(new Date(item.dueDate), "yyyy-LL-dd");
        document.getElementById("edit-due-date").value = date;

        let value;
        switch (item.priority) {
            case "Low":
                value = "0";
                break;
            case "Medium":
                value = "1";
                break;
            case "High":
                value = "2";
                break;
            default:
                break;
        }
        document.getElementById("edit-priority").value = value;
        document.getElementById("btn-submit-edit-todo").onclick = () => {
            editTodo(listIndex, itemIndex);
        };

        document.getElementById("dialog-edit-todo").showModal();
    }

    function expandTodoItem(e) {
        // Works by having a hidden element inside the <li>
        // which we display when expand button is clicked
        // nextEleemntSibling is that hidden element
        // Specific CSS styling is important for this to work
        let content = e.target.parentElement.nextElementSibling;

        if (content.style.maxHeight != 0) {
            content.style.maxHeight = null;
            e.target.src = expandArrow;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            e.target.src = collapseArrow;
        }
    }

    function createTodoExpandButton(listIndex, itemIndex) {
        let expandButton = document.createElement("input");
        expandButton.setAttribute("type", "image");
        expandButton.setAttribute("src", expandArrow);
        expandButton.classList.add("btnExpand");
        expandButton.setAttribute("data-listindex", listIndex);
        expandButton.setAttribute("data-itemindex", itemIndex);
        expandButton.onclick = expandTodoItem;

        return expandButton;
    }

    function createDateItem(dueDate) {
        let item = document.createElement("span");
        item.innerText = format(new Date(dueDate), "dd LLL yyyy");
        item.classList.add("date");

        return item;
    }

    function createPriorityItem(priority) {
        let item = document.createElement("div");
        item.classList.add("priorityContainer");

        let priorityHeading = document.createElement("span");
        priorityHeading.innerText = "Priority: ";
        priorityHeading.classList.add("priorityHeading");
        item.appendChild(priorityHeading);

        let prioritySpan = document.createElement("span");
        prioritySpan.innerText = priority;
        prioritySpan.classList.add("priority");
        item.appendChild(prioritySpan);

        return item;
    }

    function createTodoItemExpandContent() {
        let content = document.createElement("div");

        content.classList.add("expandedContent");

        return content;
    }

    function createDescriptionItem(description) {
        let item = document.createElement("div");
        item.classList.add("descContainer");

        let descHeading = document.createElement("span");
        descHeading.innerText = "Description: ";
        descHeading.classList.add("descHeading");
        item.appendChild(descHeading);

        let descSpan = document.createElement("span");
        descSpan.innerText = description;
        descSpan.classList.add("description");
        item.appendChild(descSpan);

        return item;
    }

    function createButtons(listIndex, itemIndex) {
        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "image");
        deleteButton.setAttribute("src", deleteCircle);
        deleteButton.classList.add("btnDeleteTodo");
        deleteButton.setAttribute("data-listindex", listIndex);
        deleteButton.setAttribute("data-itemindex", itemIndex);
        deleteButton.onclick = deleteTodoItem;

        let editButton = document.createElement("input");
        editButton.setAttribute("type", "image");
        editButton.setAttribute("src", editPencil);
        editButton.classList.add("btnEditTodo");
        editButton.setAttribute("data-listindex", listIndex);
        editButton.setAttribute("data-itemindex", itemIndex);
        editButton.onclick = createEditDialog;

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("editDeleteButtons");
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(editButton);

        return buttonContainer;
    }

    // Main function
    function displayListItems(listIndex) {
        const ulTodoList = document.getElementById("todo-items");
        ulTodoList.innerHTML = "";
        const todoList = getListItems(listIndex);

        todoList.forEach((item, itemIndex) => {
            let todoItem = initializeTodoItem(
                listIndex,
                itemIndex,
                item.priority
            );
            let todoItemName = initializeTodoItemName(item.title);

            let date = createDateItem(item.dueDate);
            let priority = createPriorityItem(item.priority);
            let description = createDescriptionItem(item.description);
            let expandButton = createTodoExpandButton(listIndex, itemIndex);
            let editDeleteButtons = createButtons(listIndex, itemIndex);

            let collapsedDisplay = document.createElement("div");
            collapsedDisplay.classList.add("collapsedDisplay");

            collapsedDisplay.appendChild(todoItemName);
            collapsedDisplay.appendChild(date);
            collapsedDisplay.appendChild(expandButton);

            let todoItemExpandContent = createTodoItemExpandContent();
            todoItemExpandContent.appendChild(priority);
            todoItemExpandContent.appendChild(description);
            todoItemExpandContent.appendChild(editDeleteButtons);

            todoItem.appendChild(collapsedDisplay);
            todoItem.appendChild(todoItemExpandContent);

            ulTodoList.appendChild(todoItem);
        });
    }

    return { displayListItems };
})();

// Called when a list is selected
function eventSelectList(e) {
    let listIndex = this.dataset.index;
    console.log(`List ${listIndex} selected`);
    currentListIndex = listIndex; // Sets global variable
    updateListsDisplay();
    displayControlSubmodule.displayListItems(listIndex);
}

function expandList(e) {
    e.stopPropagation(); // Important so that eventSelectList() is not triggered

    let content = e.target.parentElement.nextElementSibling;
    if (content.style.maxHeight != 0) {
        content.style.maxHeight = null;
        e.target.src = expandArrow;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        e.target.src = collapseArrow;
    }
}

function createListExpandButton(listIndex) {
    let listExpandButton = document.createElement("input");
    listExpandButton.setAttribute("type", "image");
    listExpandButton.setAttribute("src", expandArrow);
    listExpandButton.classList.add("btnExpandList");
    listExpandButton.setAttribute("data-listindex", listIndex);
    listExpandButton.onclick = expandList;

    return listExpandButton;
}

function handleDeleteList(e) {
    e.stopPropagation();
    if (e.target.dataset.listindex == 0) {
        alert("Cannot delete default list");
        return;
    } // Unnecessary now since we are not adding the delete button to default list
    deleteList(e.target.dataset.listindex);
    currentListIndex--;
    updateListsDisplay();
}

function handleEditList(index) {
    let listName = document.getElementById("edit-list-name").value;
    editListName(index, listName);
    updateListsDisplay();
}

function createEditDialog(e) {
    e.stopPropagation();
    let dialog = document.getElementById("dialog-edit-list");
    dialog.showModal();

    let index = this.dataset.listindex;
    let listName = document.getElementById("edit-list-name");
    listName.value = getList(index).listName;
    document.getElementById("btn-submit-edit-list").onclick = () => {
        handleEditList(index);
    };
}

function createListButtons(listIndex) {
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("listEditDeleteButtons");

    if (listIndex != 0) {
        let listDeleteButton = document.createElement("input");
        listDeleteButton.setAttribute("type", "image");
        listDeleteButton.setAttribute("src", deleteCircle);
        listDeleteButton.classList.add("btnDeleteList");
        listDeleteButton.setAttribute("data-listindex", listIndex);
        listDeleteButton.onclick = handleDeleteList;
        buttonContainer.appendChild(listDeleteButton);
    }

    let listEditButton = document.createElement("input");
    listEditButton.setAttribute("type", "image");
    listEditButton.setAttribute("src", editPencil);
    listEditButton.classList.add("btnEditList");
    listEditButton.setAttribute("data-listindex", listIndex);
    listEditButton.onclick = createEditDialog;

    buttonContainer.appendChild(listEditButton);

    return buttonContainer;
}

// Updates display of all lists
function updateListsDisplay() {
    let ul = document.getElementById("list-items");
    ul.innerHTML = "";

    let listCollection = getListCollection();
    listCollection.forEach((list, index) => {
        let displayListItem = document.createElement("li");
        displayListItem.setAttribute("data-index", index);
        displayListItem.classList.add("list");
        displayListItem.addEventListener("click", eventSelectList);

        // Sets the active list
        if (index == currentListIndex) {
            displayListItem.classList.add("activeList");
        }

        let collapsedList = document.createElement("div");
        collapsedList.classList.add("collapsedList");
        let spanListName = document.createElement("span");
        spanListName.innerText = list.listName;
        collapsedList.appendChild(spanListName);

        let listExpandButton = createListExpandButton();
        collapsedList.appendChild(listExpandButton);

        let expandedList = document.createElement("div");
        expandedList.classList.add("expandedList");
        let listButtons = createListButtons(index);
        expandedList.appendChild(listButtons);

        displayListItem.appendChild(collapsedList);
        displayListItem.appendChild(expandedList);
        ul.appendChild(displayListItem);
    });
    displayControlSubmodule.displayListItems(currentListIndex);
}

// Create list - open a dialog, get inputs, call function to create list, update display
function handleCreateList() {
    let listName = document.getElementById("list-name").value;
    addList(listName);
    currentListIndex = getListCollection().length - 1;
    updateListsDisplay();
}

// Create a todo - opens a dialog, gets input, calls function to create list, calls function to update display
function handleCreateTodo() {
    let title = document.getElementById("input-todo-title").value;
    let description = document.getElementById("input-todo-description").value;
    let date = document.getElementById("input-due-date").valueAsNumber;
    let priority = parseInt(document.getElementById("select-priority").value);
    addItemToList(title, description, date, priority, currentListIndex);
    displayControlSubmodule.displayListItems(currentListIndex);
}

// Called in index.js to initialize buttons
function initializeEventListeners() {
    addList("Default");
    updateListsDisplay();

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
