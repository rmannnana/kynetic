import { Controller, Get, Post, Patch, Put, Delete, HttpCode, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    // Injection du service UserService dans le constructeur du contrôleur
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(200)
    findAll() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    @HttpCode(200)
    findOneById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    // to avoid route ambiguity we put email under its own segment
    @Get('email/:email')
    @HttpCode(200)
    findOneByEmail(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @Post('/:create')
    @HttpCode(201)
    create(@Body() data) {
        return this.userService.createUser(data);
    }

    @Patch(':id')
    @HttpCode(200)
    updateUser(@Param('id') id: string, @Body() data: any) {
        return this.userService.updateUser(id, data);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
