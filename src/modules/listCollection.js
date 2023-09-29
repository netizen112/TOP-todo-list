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

export { listCollection, addList, addItemToList };
