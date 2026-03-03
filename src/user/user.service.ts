import { Injectable, BadRequestException, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { } // Inject PrismaService

    //Méthode create du UserService qui va être appelée par le UserService et qui va créer un nouvel utilisateur dans la base de données en utilisant Prisma
    async create(@Body() data: { email?: string; phone?: string; countryCode?: string; password?: string; name?: string }) {

        if (!data.email && !data.phone) {
            throw new BadRequestException('Email ou téléphone requis');
        }

        return this.prisma.user.create({
            data,
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findById(id: string) {
        const user = this.prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    update(id: string, user: {
        email?: string;
        phone?: string;
        countryCode?: string;
        password?: string;
        name?: string;
    }) {
        return this.prisma.user.update({
            where: {
                id: Number(id)
            },
            data: user
        });
    }

    delete(id: string): string {
        this.prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
        return `User with id ${id} has been deleted.`;
    }
}