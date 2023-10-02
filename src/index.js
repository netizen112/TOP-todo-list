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

initializeEventListeners();
