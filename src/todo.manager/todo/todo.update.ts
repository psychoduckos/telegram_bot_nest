import {Hears, InjectBot, On, Start, Update} from "nestjs-telegraf";
import {Context, Telegraf} from "telegraf";
import {TodoService} from "./todo.service";
import {todoInitButtonsConf} from "./todo.buttons";

@Update()
export class TodoUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly todoService: TodoService
    ) {}

    @Hears(todoInitButtonsConf.list)
    async getAllTasks(ctx: Context) {
        await this.todoService.getAllTasks(ctx)
    }

    @Hears(todoInitButtonsConf.complete)
    async completeTask(ctx: Context) {
        await this.todoService.completeTask(ctx)
    }

    @Hears(todoInitButtonsConf.create)
    async createTaskInit(ctx: Context) {
        await this.todoService.createTaskInit(ctx)
    }

    @On('text')
    async createTask(ctx: Context) {
        await this.todoService.createTask(ctx)
    }

    @Hears(todoInitButtonsConf.edit)
    async editTask(ctx: Context) {
        await this.todoService.editTask(ctx)
    }

    @Hears(todoInitButtonsConf.delete)
    async deleteTask(ctx: Context) {
        await this.todoService.deleteTask(ctx)
    }

    @Hears(todoInitButtonsConf.return)
    async goBack(ctx: Context) {
        await this.todoService.goBack(ctx)
    }

}
