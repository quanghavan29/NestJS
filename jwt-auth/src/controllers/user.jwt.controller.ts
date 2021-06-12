import { Body, Controller, Logger, Post, Req, Res } from "@nestjs/common";
import { Response, Request } from 'express';

@Controller('api/jwt')
export class UserJWTController {

    logger = new Logger('UserJWTController');

    constructor() {}

    @Post('/authenticate')
    async authorize(@Req() req: Request, @Body() user: any, @Res() res: Response): Promise<any> {
        const jwt =
    }

}