import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMessage } from 'src/decorator/customize';

export interface Response<T> {
  statusCode: number;
  message?: string;
  data: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message:
          this.reflector.get<string>(ResponseMessage, context.getHandler()) ||
          '',
        data: {
          result: data.result,
          meta: {}, // if this is supposed to be the actual return then replace {} with data.result
        },
      })),
    );
  }
}
