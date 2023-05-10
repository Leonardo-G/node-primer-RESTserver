import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidateRolPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
