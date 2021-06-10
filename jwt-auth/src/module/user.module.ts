import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../repository/user.repository";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../service/user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '360s' },
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
  })
  export class UserModule { }
  