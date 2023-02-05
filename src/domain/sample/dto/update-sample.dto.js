"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UpdateSampleDto = void 0;
var openapi = require("@nestjs/swagger");
var swagger_1 = require("@nestjs/swagger");
var create_sample_dto_1 = require("./create-sample.dto");
var UpdateSampleDto = /** @class */ (function (_super) {
    __extends(UpdateSampleDto, _super);
    function UpdateSampleDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateSampleDto._OPENAPI_METADATA_FACTORY = function () {
        return {};
    };
    return UpdateSampleDto;
}((0, swagger_1.PartialType)(create_sample_dto_1.CreateSampleDto)));
exports.UpdateSampleDto = UpdateSampleDto;
