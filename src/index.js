import { List } from "./modules/list";
import {
    listCollection,
    addList,
    addItemToList,
} from "./modules/listCollection";
import "./styles/style.css";
import logo from "./assets/list-box-outline.svg";
import { initializeEventListeners } from "./modules/displayController";

document.getElementById("logo").src = logo;
//
// Function checks if the list name given already exists, and if not,
// adds the list to lists[] and returns the index of the new list item

// console.log(`Adding list 1: ${addList("list1")}`);
// console.log(`Adding list 2: ${addList("list2")}`);
// console.log(`Adding list 1 again: ${addList("list1")}`);

// console.log(addItemToList("Todo1", "First todo", "duedate1", 1, 0));
// console.log(listCollection);

// console.log(new List("test1"));
//

initializeEventListeners();
