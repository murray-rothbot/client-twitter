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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SampleController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var response_sample_dto_1 = require("./dto/response-sample.dto");
var SampleController = /** @class */ (function () {
    function SampleController(sampleService) {
        this.sampleService = sampleService;
    }
    SampleController.prototype.create = function (createSampleDto) {
        return this.sampleService.create(createSampleDto);
    };
    SampleController.prototype.findAll = function () {
        return this.sampleService.findAll();
    };
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.sampleService.findOne(+id)
    // }
    SampleController.prototype.update = function (id, updateSampleDto) {
        return this.sampleService.update(+id, updateSampleDto);
    };
    SampleController.prototype.remove = function (id) {
        return this.sampleService.remove(+id);
    };
    SampleController.prototype.getTicker = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sampleService.getTicker(params)];
            });
        });
    };
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Post)(),
        openapi.ApiResponse({ status: 201, type: String }),
        __param(0, (0, common_1.Body)())
    ], SampleController.prototype, "create");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Get)(),
        openapi.ApiResponse({ status: 200, type: String })
    ], SampleController.prototype, "findAll");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Patch)(':id'),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], SampleController.prototype, "update");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Delete)(':id'),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Param)('id'))
    ], SampleController.prototype, "remove");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, swagger_1.ApiQuery)({
            name: 'symbol',
            example: 'BTCBRL'
        }),
        (0, swagger_1.ApiOkResponse)({ type: response_sample_dto_1.SampleResponseDto }),
        (0, common_1.Get)('/ticker'),
        openapi.ApiResponse({ status: 200, type: require("./dto/response-sample.dto").SampleResponseDto }),
        __param(0, (0, common_1.Query)())
    ], SampleController.prototype, "getTicker");
    SampleController = __decorate([
        (0, common_1.Controller)('sample'),
        (0, swagger_1.ApiTags)('sample')
    ], SampleController);
    return SampleController;
}());
exports.SampleController = SampleController;
