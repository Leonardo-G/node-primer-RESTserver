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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_schema_1 = require("../schema/category.schema");
const mongoose_2 = require("mongoose");
let CategoriesService = class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async getAllCategories(limit, skip) {
        const [categories, total] = await Promise.all([
            this.categoryModel.find({ status: true }).limit(limit).skip(skip).exec(),
            this.countCategories(),
        ]);
        return {
            total,
            categories,
        };
    }
    async getOneCategoryById(id) {
        const category = await this.categoryModel
            .findById(id)
            .populate('User', ['name', 'email'])
            .exec();
        return category;
    }
    async newCategory(name, idUser) {
        const existCategory = await this.categoryModel.findOne({ name });
        if (existCategory) {
            throw new common_1.BadRequestException(`The category ${name} is already exists`);
        }
        const data = {
            name,
            user: idUser,
        };
        const category = new this.categoryModel(data);
        await category.save();
        return category;
    }
    async updateCategory(name, idCategory) {
        const category = await this.categoryModel.findByIdAndUpdate(idCategory, { name }, { new: true });
        return category;
    }
    async deleteCategory(idCategory) {
        const category = await this.categoryModel.findByIdAndUpdate(idCategory, { status: false }, { new: true });
        return category;
    }
    async countCategories() {
        const categories = await this.categoryModel
            .countDocuments({ status: true })
            .exec();
        return categories;
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map