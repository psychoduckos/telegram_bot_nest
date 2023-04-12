import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import {TaskModule} from "../task/task.module";
import {Telegraf} from "telegraf";
import {TaskService} from "../task/task.service";
import {TodoUpdate} from "./todo.update";
import {UserModule} from "../../user/user.module";

@Module({
    imports: [TaskModule, UserModule],
    providers: [TodoService, TodoUpdate, Telegraf],
    exports: [
        TodoService
    ]
})
export class TodoModule {}

