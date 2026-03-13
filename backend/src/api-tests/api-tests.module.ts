import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiTestsController } from './api-tests.controller';
import { ApiTestsService } from './api-tests.service';
import { ApiTest, ApiTestSchema } from './schemas/api-test.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiTest.name, schema: ApiTestSchema }]),
  ],
  controllers: [ApiTestsController],
  providers: [ApiTestsService],
})
export class ApiTestsModule {}
