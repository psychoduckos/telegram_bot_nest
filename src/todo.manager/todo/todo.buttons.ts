import {Markup} from "telegraf";

export const todoButtons = () => {
    return Markup.keyboard(
        [
            Markup.button.callback("Task list", "list"),
            Markup.button.callback("Edit task", "edit"),
            Markup.button.callback("Complete task", "complete"),
            Markup.button.callback("Delete task", "delete"),
            Markup.button.callback("Go back", "return"),
        ], { columns: 2, })
}
export const todoButtonsConf = {
    "list": "Task list",
    "edit": "Edit task",
    "complete": "Complete task",
    "delete": "Delete task",
    "return": "Go back",
}