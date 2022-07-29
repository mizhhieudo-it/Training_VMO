import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTCONFIG } from '../../configs/app/app.const';
import { Response, NextFunction } from 'express';

@Injectable()
export class DecodeTokenMiddleware implements NestMiddleware {
    use(request: any, response: Response, next: NextFunction): void {
        const token: string = <string>request.headers.authorization;
        if (token) {
            const jwtService = new JwtService({
                secret: JWTCONFIG.token_secret,
                signOptions: {
                    expiresIn: JWTCONFIG.expiresIn,
                },
            });
            request.user = jwtService.decode(token.substring(7)) as any;
        }
        next();
    }
}
