import {BadRequestException, Injectable} from '@nestjs/common';
import {todoInitButtons} from "./todo.buttons";
import {initButtons} from "../../init.buttons";
import {TaskService} from "../task/task.service";
import {Context, Telegraf} from "telegraf";
import {UserService} from "../../user/user.service";

@Injectable()
export class TodoService {
    private bot: Telegraf

    private userCreateTaskStates: Map<number, string>
    private userCompleteTaskStates: Map<number, string>

    constructor(
        private taskService: TaskService,
        private userService: UserService,
    ) {
        this.bot = new Telegraf(process.env.TELEGRAM_API_KEY)

        this.userCreateTaskStates = new Map();
        this.userCompleteTaskStates = new Map();
    }

    //ready
    async getAllTasks(ctx) {
        const userId = ctx.from.id;
        let tasks = await this.taskService.getAllTasks(userId)

        const message = `
<b>Вот полный список твоих задач:</b>
${tasks.map((element, index) => {
            const statusIcon = element.status ? '✅' : '❌';
            return `
${index + 1}. ${element.title} ${statusIcon}
`;
        }).join('')}
`;
        await ctx.replyWithHTML(message, todoInitButtons());
    }

    async completeTaskInit(ctx) {
        this.userCompleteTaskStates.set(ctx.from.id, 'listen');
        return ctx.reply("Complete task: ", todoInitButtons())
    }

    async completeTask(ctx) {
        try {
            const userId = ctx.from.id;
            const state = this.userCompleteTaskStates.get(userId);

            if (state === 'listen') {

                let id = ctx.message?.text
                this.userCreateTaskStates.delete(userId);

                let tasks = await this.taskService.getAllTasks(userId)
                if (id - 1 < tasks.length || id - 1 > tasks.length) throw new BadRequestException({Message: `These user already exist!`});

                await this.taskService.completeTask(id)
            }
        } catch (e) {
            console.log(e)
            await ctx.reply(`This is an error in complete-task method!`);
        }
        return ctx.reply("Complete task: ", todoInitButtons())
    }

    //ready
    async createTaskInit(ctx: Context) {
        this.userCreateTaskStates.set(ctx.from.id, 'listen');
        await ctx.reply('Опиши свою задачу. Мы запишем её в блокнот');
    }

    //ready
    async createTask(ctx: Context) {
        try {
            const userId = ctx.from.id;
            const state = this.userCreateTaskStates.get(userId);

            if (state === 'listen') {
                // @ts-ignore
                let task = ctx.message?.text
                this.userCreateTaskStates.delete(userId);

                await this.taskService.createTask({title: task, userId: userId})
                let tasks = await this.taskService.getAllTasks(userId)
                const message = `
<i>Задача "${task}" была записана!</i>
<b>Вот полный список твоих задач:</b>
${tasks.map((element, index) => {
                    const statusIcon = element.status ? '✅' : '❌';
                    return `
${index + 1}. ${element.title} ${statusIcon}
`;
                }).join('')}
`;
                await ctx.replyWithHTML(message, todoInitButtons());
            }
        } catch (e) {
            console.log(e)
            await ctx.reply(`This is an error in create-task method!`);
        }
    }

    async editTask(ctx) {
        return ctx.reply("EDIT TASK : ", todoInitButtons())
    }

    async deleteTask(ctx) {
        return ctx.reply("Delete task.", todoInitButtons())
    }

    async goBack(ctx) {
        return ctx.reply("Go back", initButtons())
    }

}
