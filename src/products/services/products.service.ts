import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDTO } from '../dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getProductsAll(limit: number, skip: number) {
    try {
      const products = await this.productModel
        .find({ status: true })
        .populate('User', ['name', 'email'])
        .populate('Category', ['nombre'])
        .skip(skip)
        .limit(limit)
        .exec();

      return products;
    } catch (error) {
      throw new ServiceUnavailableException(
        'Error in server: service Products',
      );
    }
  }

  async newProduct(createProductDTO: CreateProductDTO, idUser: string) {
    const { name, ...data } = createProductDTO;

    const isExist = await this.productModel.findOne({
      name: createProductDTO.name,
    });

    if (isExist) {
      throw new BadRequestException('The product is already exists');
    }

    const dataObj = {
      ...data,
      name: name.toUpperCase(),
      user: idUser,
    };

    const product = new this.productModel(dataObj);
    await product.save();

    return product;
  }

  async countDocuments() {
    try {
      const documents = await this.productModel.find({ status: true });
      return documents;
    } catch (error) {
      throw new ServiceUnavailableException(
        'Error in server: service Products',
      );
    }
  }
}
