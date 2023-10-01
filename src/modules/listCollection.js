import { createToDo } from "./todo";
import { createList } from "./list";

const listCollection = [];

function checkExistingList(listName) {
    for (let index = 0; index < listCollection.length; index++) {
        const element = listCollection[index];
        if (element["listName"] == listName) return true;
    }
}

function addList(listName) {
    if (checkExistingList(listName)) {
        return "ERROR";
    }

    let newList = createList(listName);
    listCollection.push(newList);
    return listCollection.length - 1;
}

function addItemToList(title, description, dueDate, priority, index) {
    // Add error checking for priority, duedate

    if (!listCollection[index])
        return "ERROR: List selected does not exist in memory";

    let todoItem = createToDo(title, description, dueDate, priority);
    listCollection[index].addItem(todoItem);
    return "SUCCESS";
}

function deleteItemFromList(listIndex, itemIndex) {
    listCollection[listIndex].removeItem(itemIndex);
}

function getListCollection() {
    return [...listCollection];
}

function getList(index) {
    return listCollection[index].items;
}

function deleteList(index) {
    //TODO add error checking
    listCollection.splice(index, 1);
}

function editListName(newName, index) {
    listCollection[index].listName = newName;
    return "SUCCESS";
}

function editTodoItemTitle(newTitle, listIndex, itemIndex) {
    listCollection[listIndex].setItemTitle(newTitle, itemIndex);
}

export {
    listCollection,
    addList,
    addItemToList,
    deleteItemFromList,
    getListCollection,
    getList,
    editListName,
    editTodoItemTitle,
};
