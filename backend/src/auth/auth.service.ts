import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //UPDATED REGISTER
  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.usersService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
      email: dto.email,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // ✅ Include firstName in the token
    return this.signToken(user.id, user.email, user.firstName);
  }

  private signToken(userId: string, email: string, firstName: string) {
    return {
      access_token: this.jwtService.sign({
        sub: userId,
        email,
        firstName,
      }),
    };
  }
}
