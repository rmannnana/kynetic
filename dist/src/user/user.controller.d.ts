import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<any>;
    findOneById(id: string): Promise<any>;
    findOneByEmail(email: string): Promise<any>;
    create(data: any): Promise<any>;
    updateUser(id: string, data: any): Promise<any>;
    deleteUser(id: string): Promise<any>;
}
