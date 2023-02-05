"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GenericExceptionsFilter = void 0;
var common_1 = require("@nestjs/common");
var GenericExceptionsFilter = /** @class */ (function () {
    function GenericExceptionsFilter(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    GenericExceptionsFilter.prototype["catch"] = function (exception, host) {
        var httpAdapter = this.httpAdapterHost.httpAdapter;
        var ctx = host.switchToHttp();
        if (exception instanceof common_1.HttpException)
            return;
        var message = exception.toString() || 'Internal Server Error';
        var statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        var errorResponse = {
            error: {
                statusCode: statusCode,
                messages: [message],
                timestamp: new Date().toISOString(),
                path: httpAdapter.getRequestUrl(ctx.getRequest())
            }
        };
        common_1.Logger.error(JSON.stringify(errorResponse));
        httpAdapter.reply(ctx.getResponse(), errorResponse, statusCode);
    };
    GenericExceptionsFilter = __decorate([
        (0, common_1.Catch)()
    ], GenericExceptionsFilter);
    return GenericExceptionsFilter;
}());
exports.GenericExceptionsFilter = GenericExceptionsFilter;
