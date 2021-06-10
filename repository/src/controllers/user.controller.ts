import { Controller, Get, Param } from "@nestjs/common";
import { UserModel } from "../models/user.model";
import { User } from "../entitys/user.entity";
import { UserService } from "../services/user.service";
import { UserDTO } from "../dtos/user.dto";

@Controller('/api/user')
export class UserController {
    
    constructor(private userService: UserService) {}

    // get all users
    @Get()
    async getAll(): Promise<User[]> {
        return await this.userService.getAll();
    }

    // get user by id
    @Get('/:id')
    async getById(@Param('id') id: number): Promise<UserModel> {
        return await this.userService.getById(id);
    }
}

