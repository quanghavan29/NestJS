import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import { User } from "../entities/user.entity";

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {}

    async validateUser(email: string, password: string): Promise<User> {
        
        const user = await this.userService.findOne(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new HttpException("Invalid email or password!", HttpStatus.FOUND);
        }

        return user;
    }
}