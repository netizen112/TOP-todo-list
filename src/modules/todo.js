class ToDo {
    constructor(title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
    }

    get title() {
        return this._title;
    }
    set title(input) {
        this._title = input;
    }

    get description() {
        return this._description;
    }
    set description(input) {
        this._description = input;
    }

    get dueDate() {
        return this._dueDate;
    }
    set description(input) {
        this._dueDate = input;
    }

    _priorityLevel = {
        0: "Low",
        1: "Medium",
        2: "High",
    };

    get priority() {
        if (this._priority == 0 || this._priority == 1 || this._priority == 2) {
            return this._priorityLevel[this._priority];
        } else {
            return "Error: Invalid priority value stored";
        }
    }
    set priority(level) {
        if (level == 0 || level == 1 || level == 2) {
            this._priority = level;
        } else {
            return "Error: Invalid priority level entered";
        }
    }

    logInfo() {
        return `Name: ${this.title}
Description: ${this.description}
Due Date: ${this.dueDate}
Priority: ${this.priority}`;
    }
}

function createToDo(title, description, dueDate, priority) {
    let todo = new ToDo(title, description, dueDate, priority);
    return todo;
}

export { createToDo };
