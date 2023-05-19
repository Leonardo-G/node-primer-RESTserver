import {
  Body,
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
import { ProductsService } from '../services/products.service';
import { ValidateJwtGuard } from 'src/common/guards/validate-jwt.guard';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';
import { ReqUser } from 'src/common/interfaces/req-jwt.interface';
import { Request } from 'express';
import { ValidateIdMongoPipe } from 'src/common/pipes/validate-id-mongo.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsServices: ProductsService) {}

  @Get()
  async getProducts(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ) {
    try {
      const [total, products] = await Promise.all([
        this.productsServices.countDocuments,
        this.productsServices.getProductsAll(limit, skip),
      ]);

      return { total, products };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  getIdProduct(@Param('id', ValidateIdMongoPipe) id: string){
    try {
      return this.productsServices.getProductById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @UseGuards(ValidateJwtGuard)
  postProducts(
    @Body() createProductsDTO: CreateProductDTO,
    @Req() { user }: ReqUser & Request,
  ) {
    try {
      return this.productsServices.newProduct(createProductsDTO, user.id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id')
  @UseGuards(ValidateJwtGuard)
  putProduct(
    @Body() updadteProductDTO: UpdateProductDTO,
    @Param('id', ValidateIdMongoPipe) id: string,
  ) {
    try {
      return this.productsServices.findByIdAndUpdate(id, updadteProductDTO);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id', ValidateIdMongoPipe) id: string) {
    try {
      return this.productsServices.deleteProduct(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
