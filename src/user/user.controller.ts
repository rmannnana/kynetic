import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Get()
    @HttpCode(200)
    findAll() {
        return this.UserService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id') id: string) {
        return this.UserService.findById(id);
    }

    @Post()
    @HttpCode(201)
    create(@Body() data) {
        return this.UserService.create(data);
    }

    @Patch(':id')
    @HttpCode(200)
    updateUser(@Param('id') id: string, @Body() user) {
        return this.UserService.update(id, user);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id') id: string): void {
        this.UserService.delete(id);
    }
}