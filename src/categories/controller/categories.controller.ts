import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { ValidateIdMongoPipe } from 'src/common/pipes/validate-id-mongo.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('')
  getAll(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ) {
    try {
      return this.categoriesService.getAllCategories(limit, skip);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  getOne(@Param('id', ValidateIdMongoPipe) id: string) {
    try {
      return this.categoriesService.getOneCategoryById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
