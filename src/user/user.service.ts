import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    // Injection de PrismaService pour interagir avec la base de données
    constructor(private readonly prisma: PrismaService) { }

    // Fonction pour récupérer tous les utilisateurs
    async getAllUsers() {
        return this.prisma.user.findMany();
    }

    // Fonction pour récupérer un utilisateur par son ID
    async getUserById(id: string) {
        const userById = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!userById) {
            throw new NotFoundException('Cet utilisateur n\'est pas encore inscrit');
        }
        return userById;
    }

    // Fonction pour récupérer un utilisateur par son mail
    async getUserByEmail(email: string) {
        const userByMail = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!userByMail) {
            throw new NotFoundException('Cet utilisateur n\'est pas encore inscrit');
        }
        return userByMail;

    }

    // Fonction pour créer un nouvel utilisateur
    async createUser(data) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userExists) {
            throw new ConflictException('Cet utilisateur est déjà inscrit');
        }

        return this.prisma.user.create({
            data,
        });
    }

    // Fonction pour modifier un utilisateur existant
    async updateUser(id: string, data) {
        const userExists = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!userExists) {
            throw new NotFoundException('Cet utilisateur n\'est pas encore inscrit');
        }

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    // Fonction pour supprimer un utilisateur
    async deleteUser(id: string) {
        const userExists = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!userExists) {
            throw new NotFoundException('Cet utilisateur n\'est pas encore inscrit');
        }
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
