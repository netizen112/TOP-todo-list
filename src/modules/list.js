class List {
    constructor(listName) {
        this.listName = listName; // List name
    }

    _items = []; // Array that stores the todo objects

    get items() {
        return [...this._items];
    }

    addItem(item) {
        this._items.push(item);
    }
}

function createList(listName){
    let list = new List(listName);
    return list;
}

export { List, createList };
