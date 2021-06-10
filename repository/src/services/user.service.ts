import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserMapper } from "../mappers/user.mapper";
import { User } from "../entitys/user.entity";
import { UserRepository } from "../repositorys/user.repository";
import { UserModel } from "../models/user.model";
import { UserDTO } from "../dtos/user.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) { }

    // get all users from database
    async getAll(): Promise<User[]> {
        const result = await this.userRepository.find({ relations: ['role']});
        return result;
    }

    // get user by id
    async getById(id: number): Promise<UserModel> {
        const user = await this.userRepository.findOne(id, { relations: ['role']});
        const userDTO = UserMapper.fromEntityToDTO(user);
        return UserMapper.fromDTOToModel(userDTO);
        // return userDTO;
    }
}