import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma.service";
import {Cron} from "@nestjs/schedule";
import {UserService} from "../../user/user.service";

@Injectable()
export class TaskService {

    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) {}

    async createTask(data: {
        title: string;
        userId: number;
    }) {
        try {
            let user = await this.userService.getUserByID(data.userId);
            console.log(user);
            if (!user)
                throw new BadRequestException({ message: `User does not exist!` });

            return await this.prisma.task.create({
                data: {
                    title: data.title,
                    User: {
                        connect: {
                            tg_id: data.userId,
                        },
                    },
                },
            });
        } catch (e) {
            console.log(e);
            throw new BadRequestException({
                message: `You cannot create a new task now! Try writing to the developer: https://t.me/psychoducko. Show him this error: ${e}`,
            });
        }
    }

    async getTaskByID(id: number) {
        try {
            return await this.prisma.task.findUnique({
                where: {
                    id: id
                }
            });
        } catch (e) {
            console.log(e)
            throw new BadRequestException({message: `You cannot get task by his ID! Try writing to the developer: https://t.me/psychoducko. Show him this error: ${e}`})
        }
    }

    async getAllTasks(id: number) {
        try {
            return await this.prisma.task.findMany({
                where: {
                    userId: id
                }
            });
        } catch (e) {
            console.log(e)
            throw new BadRequestException({Message: `You cannot get all user tasks! Try writing to the developer: https://t.me/psychoducko. Show him this error: ${e}`})
        }
    }

    async editTaskTitle(id: number, newTaskTitle: string) {

        let task = await this.getTaskByID(id)
        if (!task) throw new BadRequestException({Message: `These task does not exist!`});

        try {
            const updateTaskTitle = await this.prisma.task.update({
                where: {
                    id: id
                },
                data: { title: newTaskTitle },
            });
            return updateTaskTitle;
        } catch (e) {
            console.log(e)
            throw new BadRequestException({Message: `There is error in edit task method! Try writing to the developer: https://t.me/psychoducko. Show him this error: ${e}`})
        }
    }

    async completeTask(id: number) {

        let task = await this.getTaskByID(id)
        if (!task) throw new BadRequestException({Message: `These task does not exist!`});

        try {
            const taskComplete = await this.prisma.task.update({
                where: {
                    id: id
                },
                data: {
                    status: true,
                    completedAt: new Date()
                },
            });
            return taskComplete;
        } catch (e) {
            console.log(e)
            throw new BadRequestException({Message: `There is error while we trying to complete task! Try writing to the developer: https://t.me/psychoducko. Show him this error: ${e}`})
        }
    }

    async deleteTask(id: number) {

        let task = await this.getTaskByID(id)
        if (!task) throw new BadRequestException({Message: `These task does not exist!`});

        try {
            await this.prisma.task.delete({
                where: {
                    id: id
                },
            });
        } catch (e) {
            console.log(e)
            throw new BadRequestException({Message: `There is error while we trying to delete task! Try writing to the developer: https://t.me/psychoducko. Show him this error: ${e}`})
        }
    }

    @Cron('*/5 * * * *')
    async deleteCompletedTasks() {
        console.log("5 minutes CRON checked!")
        await this.prisma.task.deleteMany({
            where: {
                status: true
            }
        });

    }


}

