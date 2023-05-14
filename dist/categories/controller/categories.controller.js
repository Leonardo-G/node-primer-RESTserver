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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("../services/categories.service");
const validate_id_mongo_pipe_1 = require("../../common/pipes/validate-id-mongo.pipe");
const validate_jwt_guard_1 = require("../../common/guards/validate-jwt.guard");
const common_2 = require("@nestjs/common");
const category_dto_1 = require("../dto/category.dto");
const validate_rol_pipe_1 = require("../../common/pipes/validate-rol/validate-rol.pipe");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    getAll(limit, skip) {
        try {
            return this.categoriesService.getAllCategories(limit, skip);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    getOne(id) {
        try {
            return this.categoriesService.getOneCategoryById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    categoriesPost(createCategoryDTO, { user }) {
        try {
            return this.categoriesService.newCategory(createCategoryDTO.name, user.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    categoriesPut(createCategoryDTO, id) {
        try {
            return this.categoriesService.updateCategory(createCategoryDTO.name, id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    categoriesDelete(rol, id) {
        try {
            return this.categoriesService.deleteCategory(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(5), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', validate_id_mongo_pipe_1.ValidateIdMongoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(validate_jwt_guard_1.ValidateJwtGuard),
    (0, common_1.Post)(''),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryDTO, Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "categoriesPost", null);
__decorate([
    (0, common_1.UseGuards)(validate_jwt_guard_1.ValidateJwtGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_1.Param)('id', validate_id_mongo_pipe_1.ValidateIdMongoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryDTO, String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "categoriesPut", null);
__decorate([
    (0, common_1.UseGuards)(validate_jwt_guard_1.ValidateJwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_2.Body)('rol', validate_rol_pipe_1.ValidateRolPipe)),
    __param(1, (0, common_1.Param)('id', validate_id_mongo_pipe_1.ValidateIdMongoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "categoriesDelete", null);
CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map