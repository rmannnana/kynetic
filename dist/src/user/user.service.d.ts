import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        id: string;
        email: string;
        countryCode: string | null;
        phone: string | null;
        password: string;
        name: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUserById(id: string): Promise<{
        id: string;
        email: string;
        countryCode: string | null;
        phone: string | null;
        password: string;
        name: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        countryCode: string | null;
        phone: string | null;
        password: string;
        name: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createUser(data: any): Promise<{
        id: string;
        email: string;
        countryCode: string | null;
        phone: string | null;
        password: string;
        name: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: string, data: any): Promise<{
        id: string;
        email: string;
        countryCode: string | null;
        phone: string | null;
        password: string;
        name: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        email: string;
        countryCode: string | null;
        phone: string | null;
        password: string;
        name: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
