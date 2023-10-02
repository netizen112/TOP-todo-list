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

function getListItems(index) {
    return listCollection[index].items;
}

function deleteList(index) {
    //TODO add error checking
    listCollection.splice(index, 1);
}

function editListName(index, newName) {
    listCollection[index].listName = newName;
    return "SUCCESS";
}

function editTodoItem(
    listIndex,
    itemIndex,
    newTitle,
    newDesc,
    newDate,
    newPriority
) {
    let status = listCollection[listIndex].editItem(
        itemIndex,
        newTitle,
        newDesc,
        newDate,
        newPriority
    );
    if (status == "SUCCESS") {
        return status;
    } else {
        return "ERROR";
    }
}

function getList(index) {
    return listCollection[index];
}

export {
    listCollection,
    addList,
    deleteList,
    addItemToList,
    deleteItemFromList,
    getListCollection,
    getListItems,
    editListName,
    editTodoItem,
    getList,
};
