import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AuthService {

    logger = new Logger('AuthService');

}