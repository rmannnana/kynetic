import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<any>;
    getUserById(id: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    createUser(data: any): Promise<any>;
    updateUser(id: string, data: any): Promise<any>;
    deleteUser(id: string): Promise<any>;
}
