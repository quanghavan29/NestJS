import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserService } from "../service/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Controller('/api/jwt/user')

export class UserController {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    // get all user
    @Get('/')
    async getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    // create new account
    @Post('/register')
    async register(@Body() user: User): Promise<void> {
        // find user in database by email request
        const userFind = await this.userService.findOne(user.email);
        // if user exist in database
        if (userFind) {
            throw new BadRequestException('Email already exist!');
        }
        // email does not exist => insert user to database (verify = false)
        user.verify = false;
        // send mail to verify account
        var fullName = user.lastname + " " + user.firstname
        var subject = 'Reelancer - Xác thực tài khoản! ' + fullName;
        this.userService.sendMailTemplate(user.email, "coosi29@gmail.com", subject, fullName);
        // insert account registed with verify = false to database
        // verify = true when user verify account in email
        user.password = await bcrypt.hash(user.password, 12);
        this.userService.register(user);
    }

    // find user by condition (email and password)
    @Post('/login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<any> {
        const user = await this.userService.findOne(email)
        if (!user) {
            throw new BadRequestException('Invalid email or password!');
        }
        if (!await bcrypt.compareSync(password, user.password)) {
            throw new BadRequestException('Invalid email or password!');
        }
        const payload = { id: user.id, email: user.email };
        const jwt = await this.jwtService.sign(payload);
        console.log(jwt);

        return user;
    }

    // verify send mail
    @Get('/send-mail')
    async sendMail(): Promise<void> {
        return this.userService.senmail();
    }

    @Get('/confirm-account/:email')
    async verifyAccount(@Param('email') email: string): Promise<any> {
        // find user by email request
        const user = await this.userService.findOne(email);
        // if user doesn't exist in database
        if (!user) {
            throw new BadRequestException('Email does not exist');
        }

        // email has registed (exist in database)
        // => update verify = true for that account
        user.verify = true;
        return this.userService.updateVerify(user);
    }

    // // verify send mail
    // @Get('/send-mail-template')
    // async sendMailTemplate(): Promise<void> {
    //     return this.userService.senMailTemplate();
    // }

}