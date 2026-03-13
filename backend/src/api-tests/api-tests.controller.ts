import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTestsService } from './api-tests.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api-tests')
export class ApiTestsController {
  constructor(private readonly apiTestsService: ApiTestsService) {}

  @Post()
  async saveApiTest(@Req() req, @Body() body) {
    return this.apiTestsService.create(req.user.userId, body);
  }

  @Get('recent')
  async getRecentApiTests(@Req() req) {
    return this.apiTestsService.findRecent(req.user.userId);
  }
}
