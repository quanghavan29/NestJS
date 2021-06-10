import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { UserDTO } from '../dtos/user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {

    users: User[] = [
        { id: 1, username: "coosi29", password: "123" },
        { id: 2, username: "quanghv7", password: "123" }
    ];

    // get all users
    getAll(): Promise<User[]> {
        return new Promise(resolve => {
            resolve(this.users);
        });
    }

    // get user by id
    getById(id: number): Promise<UserDTO> {
        return new Promise(resolve => {
            const user = this.users.find(user => user.id == id);
            if (!user) {
                throw new HttpException('User id does not exist', 404);
            }
            const userDTO = new UserDTO(user);
            resolve(userDTO);
        })
    }

    // create user
    create(user: User): Promise<User> {
        return new Promise(resolve => {
            this.users.push(user);
            resolve(user);
        })
    }

    // delete user by id
    delete(id: number): Promise<User> {
        return new Promise(resolve => {
            let index = this.users.findIndex(user => user.id == id);
            let user = this.users.find(user => user.id == id);
            if (index == -1) {
                throw new HttpException('User id does not exist!', 404);
            }
            this.users.splice(index, 1);
            resolve(user);
        });
    }
}
