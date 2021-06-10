import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
        private readonly mailerService: MailerService) { }


    // get all user
    async getAll(): Promise<User[]> {
        const result = await this.userRepository.find();
        return result;
    }

    // register account
    async register(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    // find user by email and password
    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({ email: email });
    }

    //verify send mail
    async senmail(): Promise<void> {
        this.mailerService
            .sendMail({
                to: 'quanghavan29@gmail.com', // List of receivers email address
                from: 'coosi29@gmail.com', // Senders email address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<a href=\'localhost:3000\'>Click here to verify</b>', // HTML body content
            })
            .then((success) => {
                console.log(success)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // verify send mail with template
    async sendMailTemplate(emailTo, emailFrom, subject, fullName): Promise<void> {
        this
            .mailerService
            .sendMail({
                to: emailTo, // List of receivers email address
                from: emailFrom, // Senders email address
                subject: subject,
                context: {  // Data to be sent to template engine.
                    email: emailTo,
                    fullName: fullName, 
                },
                template: './index', // The `.pug` or `.hbs` extension is appended automatically.
            })
            .then((success) => {
                console.log(success)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // update verify for account
    async updateVerify(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

}