import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);

      if (isValid) {
        return user;
      }
    }

    return null;
  }

  async login(user: IUser) {
    const { _id, email, name, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      _id,
      name,
      email,
      role,
    };
  }
}
