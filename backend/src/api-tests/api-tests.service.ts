import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTest, ApiTestDocument } from './schemas/api-test.schema';

@Injectable()
export class ApiTestsService {
  constructor(
    @InjectModel(ApiTest.name)
    private apiTestModel: Model<ApiTestDocument>,
  ) {}

  async create(userId: string, data: Partial<ApiTest>) {
    const apiTest = new this.apiTestModel({
      ...data,
      userId,
    });

    return apiTest.save();
  }

  async findRecent(userId: string, limit = 10) {
    return this.apiTestModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }
}
