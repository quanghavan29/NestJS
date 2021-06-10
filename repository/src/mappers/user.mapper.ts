import { UserModel } from "../models/user.model";
import { UserDTO } from "../dtos/user.dto";
import { User } from "../entitys/user.entity";
import { RoleModel } from "src/models/role.model";

export class UserMapper {

    static fromEntityToDTO(user: User): UserDTO {

        if (!user) {
            return;
        }

        const userDTO = new UserDTO();

        const fields = Object.getOwnPropertyNames(user);

        fields.forEach(field => {
            userDTO[field] = user[field];
        });

        return userDTO;
    }

    static fromDTOToModel(userDTO: UserDTO): UserModel {
        
        if (!UserDTO) {
            return;
        }

        const {id, username, role} = userDTO;
        const roleModel = new RoleModel(role.name, role.code);
        const userModel = new UserModel(id, username, roleModel);

        return userModel;
    }
}