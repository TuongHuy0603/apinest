import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {

    //model : code
    return 'Hello World! & Hỏi Dân IT';
  }
}
