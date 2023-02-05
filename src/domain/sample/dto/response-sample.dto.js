"use strict";
exports.__esModule = true;
exports.SampleResponseDto = void 0;
var openapi = require("@nestjs/swagger");
var SampleResponseDto = /** @class */ (function () {
    function SampleResponseDto() {
    }
    SampleResponseDto._OPENAPI_METADATA_FACTORY = function () {
        return { lastPrice: { required: true, type: function () { return String; } }, symbol: { required: true, type: function () { return String; } } };
    };
    return SampleResponseDto;
}());
exports.SampleResponseDto = SampleResponseDto;
