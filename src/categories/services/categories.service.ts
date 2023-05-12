import { Injectable } from '@nestjs/common';
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

  async countCategories() {
    const categories = await this.categoryModel
      .countDocuments({ status: true })
      .exec();

    return categories;
  }
}
