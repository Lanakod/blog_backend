import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { green, yellow } from 'colors';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const { method, url } = context.switchToHttp().getRequest();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            yellow(`[${method}]`),
            green(`${url} -`),
            yellow(`${Date.now() - now}ms`),
          ),
        ),
      );
  }
}
