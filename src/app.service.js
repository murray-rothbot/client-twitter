"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AppService = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var AppService = /** @class */ (function () {
    function AppService(req) {
        this.req = req;
    }
    AppService.prototype.getHello = function () {
        return this.req.t('hello-world');
    };
    AppService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)(core_1.REQUEST))
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
