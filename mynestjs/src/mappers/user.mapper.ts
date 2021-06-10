import { UserDTO } from "../dtos/user.dto";
import { User } from "../entity/user.entity";

export class UserMapper {

    static fromEntityToDTO(user: User): UserDTO {
        if (!user) {
            return;
        }
        
        const userDTO = new UserDTO(user);

        return userDTO;

    }
}