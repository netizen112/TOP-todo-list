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

    removeItem(index) {
        //TODO add error checking
        this._items.splice(index, 1);
    }

    setItemTitle(newTitle, index) {
        this._items[index].title = newTitle;
    }
}

function createList(listName) {
    let list = new List(listName);
    return list;
}

export { List, createList };
