import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Context} from "telegraf";

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService
    ) {}

    async createUser(ctx: Context) {

        let user = await this.getUserByID(ctx.from.id)
        if (user) throw new BadRequestException({Message: `These user already exist!`});

        try {
            return await this.prisma.user.create({
                data: {
                    username: ctx.from.username,
                    tg_id: ctx.from.id
                }
            });
        } catch (e) {
            console.log(e)
            throw new BadRequestException({message: `You cannot create new user! Try writing to the developer: https://t.me/psychoducko. Show him this error: ${e}`})
        }
    }

    async getUserByID(id: number) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    tg_id: id
                }
            });
        } catch (e) {
            console.log(e)
            throw new BadRequestException({message: `You cannot get task by his ID! Try writing to the developer: https://t.me/psychoducko. Show him this error: ${e}`})
        }
    }

}
