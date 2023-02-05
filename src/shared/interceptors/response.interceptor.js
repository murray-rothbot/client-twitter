"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.ResponseInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var ResponseInterceptor = /** @class */ (function () {
    function ResponseInterceptor() {
    }
    ResponseInterceptor.prototype.intercept = function (context, next) {
        return next.handle().pipe((0, operators_1.map)(function (data) {
            var _a, _b;
            var pages;
            if ((data === null || data === void 0 ? void 0 : data.data) && ((_a = data.meta) === null || _a === void 0 ? void 0 : _a.totalElements)) {
                pages = Array.isArray(data.page) ? __spreadArray([], data.page, true) : [data.page];
            }
            return data && ((_b = data.meta) === null || _b === void 0 ? void 0 : _b.totalElements) ? { data: { pages: pages }, meta: data.meta } : { data: data };
        }));
    };
    ResponseInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], ResponseInterceptor);
    return ResponseInterceptor;
}());
exports.ResponseInterceptor = ResponseInterceptor;
