import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { AuthService } from "../service/auth.service";
import { LocalAuthGuard } from "../service/local-auth.guard";

@Controller('/api/jwt/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body('email') email, @Body('password') password): Promise<User> {
        return this.authService.validateUser(email, password);
    }

    // protected api
    @Get('/protected')
    async protected() {
        return "this is api protected!";
    }
}