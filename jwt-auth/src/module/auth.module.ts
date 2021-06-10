import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../service/local.strategy";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../service/auth.service";
import { UserModule } from "./user.module";

@Module({
    imports: [UserModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
  })
  export class AuthModule { }
  