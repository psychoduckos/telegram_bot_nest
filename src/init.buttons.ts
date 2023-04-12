import {Markup} from "telegraf";

export const initButtons = () => {
    return Markup.keyboard(
        [
            Markup.button.callback("ToDo Manager", "todo"),
            Markup.button.callback("Currency convertor", "convertor"),
            Markup.button.callback("Random friend app", "friendify"),
            Markup.button.callback("AI-bot", "AIbot"),
        ]
    )
}
export const initButtonsConf = {
    "todo": "ToDo Manager",
    "convertor": "Currency convertor",
    "friendify": "Random friend app",
    "AIbot": "AI-bot",
}