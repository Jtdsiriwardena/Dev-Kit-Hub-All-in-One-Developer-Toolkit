"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiTestsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_test_schema_1 = require("./schemas/api-test.schema");
let ApiTestsService = class ApiTestsService {
    apiTestModel;
    constructor(apiTestModel) {
        this.apiTestModel = apiTestModel;
    }
    async create(userId, data) {
        const apiTest = new this.apiTestModel({
            ...data,
            userId,
        });
        return apiTest.save();
    }
    async findRecent(userId, limit = 10) {
        return this.apiTestModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();
    }
};
exports.ApiTestsService = ApiTestsService;
exports.ApiTestsService = ApiTestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(api_test_schema_1.ApiTest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ApiTestsService);
//# sourceMappingURL=api-tests.service.js.map