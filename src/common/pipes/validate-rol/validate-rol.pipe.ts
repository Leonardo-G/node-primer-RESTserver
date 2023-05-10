import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateRolPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== 'ADMIN_ROLE') {
      throw new BadRequestException('rol not supported');
    }

    return value;
  }
}
