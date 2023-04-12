import { AppService } from './app.service';
import {Hears, InjectBot, Start, Update} from "nestjs-telegraf";
import {Context, Telegraf} from "telegraf";
import {initButtonsConf} from "./init.buttons";

@Update()
export class AppUpdate {
  constructor(
      @InjectBot() private readonly bot: Telegraf<Context>,
      private readonly appService: AppService
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await this.appService.startCommand(ctx);
  }

  @Hears(initButtonsConf.todo)
  async todoController(ctx: Context) {
    await this.appService.todoController(ctx)
  }

  @Hears(initButtonsConf.convertor)
  async convertorController(ctx: Context) {
    await this.appService.convertorController(ctx)
  }

  @Hears(initButtonsConf.friendify)
  async friendifyController(ctx: Context) {
    await this.appService.friendifyController(ctx)
  }

  @Hears(initButtonsConf.AIbot)
  async getAllTasks(ctx: Context) {
    await this.appService.AIcontroller(ctx)
  }

}
