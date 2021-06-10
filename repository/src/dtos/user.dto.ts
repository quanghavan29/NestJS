import { RoleDTO } from "./role.dto";

export class UserDTO {

    id: number;
    
    username: string;

    firstname: string;

    lastname: string;

    password: string;
    
    role: RoleDTO;

}