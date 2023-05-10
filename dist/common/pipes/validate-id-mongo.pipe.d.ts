import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidateIdMongoPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): string;
}
