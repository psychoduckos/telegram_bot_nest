import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import {TelegrafModule} from "nestjs-telegraf";
import * as LocalSession from 'telegraf-session-local';
import {ConfigModule} from "@nestjs/config";
import { TodoModule } from './todo.manager/todo/todo.module';
import { TaskModule } from './todo.manager/task/task.module';
import {PrismaService} from "./prisma.service";
import { UserModule } from './user/user.module';


// const sessions = new LocalSession({
//   database: 'session_db.json'
// })

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      TelegrafModule.forRoot({
        // middlewares: [sessions.middleware()],
        token: process.env.TELEGRAM_API_KEY,
      }),
      UserModule,
      TaskModule,
      TodoModule,
  ],
  providers: [AppService, AppUpdate, PrismaService],
})
export class AppModule {}

