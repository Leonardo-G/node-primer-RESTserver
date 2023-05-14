import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getAllCategories(limit: number, skip: number) {
    const [categories, total] = await Promise.all([
      this.categoryModel.find({ status: true }).limit(limit).skip(skip).exec(),
      this.countCategories(),
    ]);

    return {
      total,
      categories,
    };
  }

  async getOneCategoryById(id: string) {
    const category = await this.categoryModel
      .findById(id)
      .populate('User', ['name', 'email'])
      .exec();

    return category;
  }

  async newCategory(name: string, idUser: string) {
    const existCategory = await this.categoryModel.findOne({ name });

    if (existCategory) {
      throw new BadRequestException(`The category ${name} is already exists`);
    }

    const data = {
      name,
      user: idUser,
    };

    const category = new this.categoryModel(data);
    await category.save();

    return category;
  }

  async updateCategory(name: string, idCategory: string) {
    const category = await this.categoryModel.findByIdAndUpdate(
      idCategory,
      { name },
      { new: true },
    );

    return category;
  }

  async deleteCategory(idCategory: string) {
    const category = await this.categoryModel.findByIdAndUpdate(
      idCategory,
      { status: false },
      { new: true },
    );

    return category;
  }

  async countCategories() {
    const categories = await this.categoryModel
      .countDocuments({ status: true })
      .exec();

    return categories;
  }
}
