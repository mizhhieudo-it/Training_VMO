import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before reaching the handler');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`Response Lag...${Date.now() - now}ms`)));
  }
}
