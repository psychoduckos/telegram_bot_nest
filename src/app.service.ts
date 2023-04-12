import { Injectable } from '@nestjs/common';
import {Context} from "telegraf";
import {todoInitButtons} from "./todo.manager/todo/todo.buttons";
import {initButtons} from "./init.buttons";
import {UserService} from "./user/user.service";

@Injectable()
export class AppService {

  constructor(
      private userService: UserService
  ) {
  }

  async startCommand(ctx: Context) {
    try {
        await this.userService.createUser(ctx)
    } catch (e) {
      console.log(e)
    }
    return ctx.reply(`Hello friend👋! What do you want?`, initButtons())
  }

  async todoController(ctx) {
    const message = `
    <b>Добро пожаловать в Todo App!</b>
    <i>Здесь вы можете управлять своими задачами и быть более продуктивным.</i>

    <b>Как использовать Todo App?</b>
    <i>1. Добавьте новую задачу, которую необходимо выполнить.</i>
    <i>2. Отметьте задачу, когда она будет выполнена.</i>
    <i>3. Просмотрите список выполненных задач и сделайте выводы о своей продуктивности.</i>

    <b>Какие возможности предоставляет Todo App?</b>
    <i>1. Добавление, изменение и удаление задач.</i>
    <i>2. Отметка задач как выполненных.</i>
    <i>3. Просмотр выполненных задач.</i>
    <i>4. Отслеживание своей продуктивности и выполнения задач.</i>

    <i>Для получения дополнительной информации и справки введите команду /help.</i>
  `;
    return ctx.replyWithHTML(message, todoInitButtons());
  }

  async convertorController(ctx) {
    return ctx.reply("In work! Now this functions is not available.")
  }

  async friendifyController(ctx) {
    return ctx.reply("In work! Now this functions is not available.")
  }

  async AIcontroller(ctx) {
    return ctx.reply("In work! Now this functions is not available.")
  }
}

// {
//   id: 1237707859,
//       is_bot: false,
//     first_name: 'Vladislav',
//     last_name: 'Verbitsky',
//     username: 'psychoducko',
//     language_code: 'ru'
// }

