import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';

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

  async getProductById(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('User', ['name', 'email'])
      .exec();

    return product;
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

  async findByIdAndUpdate(
    idProduct: string,
    updateProductDTO: UpdateProductDTO,
  ) {
    if (updateProductDTO.name) {
      updateProductDTO.name = updateProductDTO.name.toUpperCase();
    }

    const product = await this.productModel
      .findByIdAndUpdate(idProduct, updateProductDTO, { new: true })
      .exec();

    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );

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
