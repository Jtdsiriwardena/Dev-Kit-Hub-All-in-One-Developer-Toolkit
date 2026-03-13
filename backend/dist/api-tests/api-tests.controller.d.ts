import { ApiTestsService } from './api-tests.service';
export declare class ApiTestsController {
    private readonly apiTestsService;
    constructor(apiTestsService: ApiTestsService);
    saveApiTest(req: any, body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/api-test.schema").ApiTestDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/api-test.schema").ApiTest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getRecentApiTests(req: any): Promise<(import("./schemas/api-test.schema").ApiTest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
