import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
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
    findOneById(id: string): Promise<{
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
    findOneByEmail(email: string): Promise<{
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
    create(data: CreateUserDto): Promise<{
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
    updateUser(id: string, data: UpdateUserDto): Promise<{
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
