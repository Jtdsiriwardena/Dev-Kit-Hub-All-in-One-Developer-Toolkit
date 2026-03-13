import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsString()
  @IsIn(['student', 'developer', 'freelancer', 'professional', 'hobbyist'])
  role: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
