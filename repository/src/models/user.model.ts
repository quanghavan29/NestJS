export class UserModel {

    id: number;

    username: string;

    role: any;

    constructor (id, username, role) {
        this.id = id,
        this.username = username;
        this.role = role;
    }

}