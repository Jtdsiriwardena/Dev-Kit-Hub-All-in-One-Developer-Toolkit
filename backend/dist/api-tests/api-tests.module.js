"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiTestsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const api_tests_controller_1 = require("./api-tests.controller");
const api_tests_service_1 = require("./api-tests.service");
const api_test_schema_1 = require("./schemas/api-test.schema");
let ApiTestsModule = class ApiTestsModule {
};
exports.ApiTestsModule = ApiTestsModule;
exports.ApiTestsModule = ApiTestsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: api_test_schema_1.ApiTest.name, schema: api_test_schema_1.ApiTestSchema }]),
        ],
        controllers: [api_tests_controller_1.ApiTestsController],
        providers: [api_tests_service_1.ApiTestsService],
    })
], ApiTestsModule);
//# sourceMappingURL=api-tests.module.js.map