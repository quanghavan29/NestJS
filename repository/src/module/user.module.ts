import { Module } from "@nestjs/common";
import { UserRepository } from "../repositorys/user.repository";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {}