import { Model } from 'mongoose';
import { ApiTest, ApiTestDocument } from './schemas/api-test.schema';
export declare class ApiTestsService {
    private apiTestModel;
    constructor(apiTestModel: Model<ApiTestDocument>);
    create(userId: string, data: Partial<ApiTest>): Promise<import("mongoose").Document<unknown, {}, ApiTestDocument, {}, import("mongoose").DefaultSchemaOptions> & ApiTest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findRecent(userId: string, limit?: number): Promise<(ApiTest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
