import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserDTO } from "../dtos/user.dto";
import { User } from "../entity/user.entity";
import { UserService } from "../services/user.service";

@Controller('/api/user')
export class UserController {

    constructor(private userService: UserService) {}

    // get all user
    @Get()
    async getAll(): Promise<User[]> {
        return await this.userService.getAll();
    }

    // get user by id
    @Get('/:id')
    async getById(@Param('id') id: number): Promise<UserDTO> {
        return await this.userService.getById(id);
    }

    // create user
    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.userService.create(user);
    }

    // delete user
    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<User> {
        return await this.userService.delete(id);
    }
}

