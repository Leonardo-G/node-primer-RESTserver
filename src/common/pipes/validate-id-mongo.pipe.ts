import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateIdMongoPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const isValidIdMongo = Types.ObjectId.isValid(value);

    if (!isValidIdMongo) {
      throw new BadRequestException(`The ID: ${value} is not valid id Mongo`);
    }

    return value;
  }
}
