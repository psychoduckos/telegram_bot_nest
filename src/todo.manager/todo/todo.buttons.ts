import {Markup} from "telegraf";

export const todoInitButtons = () => {
    return Markup.keyboard(
        [
            Markup.button.callback("Task list", "list"),
            Markup.button.callback("Complete task", "complete"),
            Markup.button.callback("Create new task", "create"),
            Markup.button.callback("Edit task", "edit"),
            Markup.button.callback("Delete task", "delete"),
            Markup.button.callback("Go back", "return"),
        ], { columns: 2, })
}

export const todoInitButtonsConf = {
    "list": "Task list",
    "create": "Create new task",
    "edit": "Edit task",
    "complete": "Complete task",
    "delete": "Delete task",
    "return": "Go back",
}