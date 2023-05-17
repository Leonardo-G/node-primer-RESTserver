import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  ParseIntPipe,
  Post,
  Query,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';

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
}
