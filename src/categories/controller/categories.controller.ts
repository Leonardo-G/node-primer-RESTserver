import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { ValidateIdMongoPipe } from 'src/common/pipes/validate-id-mongo.pipe';
import { ValidateJwtGuard } from 'src/common/guards/validate-jwt.guard';
import { Body } from '@nestjs/common';
import { ReqUser } from 'src/common/interfaces/req-jwt.interface';
import { CreateCategoryDTO } from '../dto/category.dto';
import { ValidateRolPipe } from 'src/common/pipes/validate-rol/validate-rol.pipe';

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

  @UseGuards(ValidateJwtGuard)
  @Post('')
  categoriesPost(
    @Body() createCategoryDTO: CreateCategoryDTO,
    @Req() { user }: ReqUser,
  ) {
    try {
      return this.categoriesService.newCategory(
        createCategoryDTO.name,
        user.id,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(ValidateJwtGuard)
  @Put(':id')
  categoriesPut(
    @Body() createCategoryDTO: CreateCategoryDTO,
    @Param('id', ValidateIdMongoPipe) id: string,
  ) {
    try {
      return this.categoriesService.updateCategory(createCategoryDTO.name, id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(ValidateJwtGuard)
  @Delete(':id')
  categoriesDelete(
    @Body('rol', ValidateRolPipe) rol: string,
    @Param('id', ValidateIdMongoPipe) id: string,
  ) {
    try {
      return this.categoriesService.deleteCategory(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
