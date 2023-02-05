"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SampleModule = void 0;
var common_1 = require("@nestjs/common");
var sample_service_1 = require("./sample.service");
var sample_controller_1 = require("./sample.controller");
var axios_1 = require("@nestjs/axios");
var sample_repository_1 = require("./sample.repository");
var SampleModule = /** @class */ (function () {
    function SampleModule() {
    }
    SampleModule = __decorate([
        (0, common_1.Module)({
            controllers: [sample_controller_1.SampleController],
            imports: [axios_1.HttpModule],
            providers: [sample_service_1.SampleService, sample_repository_1.SampleRepository]
        })
    ], SampleModule);
    return SampleModule;
}());
exports.SampleModule = SampleModule;
