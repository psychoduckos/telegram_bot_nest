import { Module } from '@nestjs/common';
import {TaskService} from "./task.service";
import {PrismaService} from "../../prisma.service";
import {UserModule} from "../../user/user.module";

@Module({
    imports: [UserModule],
    providers: [TaskService, PrismaService],
    exports: [TaskService]
})
export class TaskModule {}






