import { User } from "../entity/user.entity";

export class UserDTO {

    id: number;

    username: string;

    constructor (user: User) {
        this.id = user.id;
        this.username = user.username;
    }
}