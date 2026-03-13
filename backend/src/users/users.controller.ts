import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getProfile(@Req() req) {
    return this.usersService.findById(req.user.userId);
  }

  @Patch('role')
  updateRole(@Req() req, @Body('role') role: string) {
    return this.usersService.updateRole(req.user.userId, role);
  }

  @Patch('password')
  updatePassword(@Req() req, @Body('password') password: string) {
    return this.usersService.updatePassword(req.user.userId, password);
  }

  @Delete()
  deleteAccount(@Req() req) {
    return this.usersService.deleteUser(req.user.userId);
  }
}
