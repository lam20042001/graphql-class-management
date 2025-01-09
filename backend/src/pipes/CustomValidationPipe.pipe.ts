import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<unknown> {
    // Bỏ qua xác thực nếu không có metatype hoặc không cần xác thực
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Chuyển đổi dữ liệu thành instance của metatype
    const object = plainToClass(metatype, value);

    // Xác thực dữ liệu
    const errors = await validate(object);

    // Nếu có lỗi, ném lỗi với thông tin chi tiết
    if (errors.length > 0) {
      throw this.buildValidationErrors(errors);
    }

    return object;
  }

  private toValidate(metatype: Type<unknown>): boolean {
    const types: Type<unknown>[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private buildValidationErrors(errors: ValidationError[]): BadRequestException {
    const formattedErrors = errors.map((error) => ({
      field: error.property,
      messages: Object.values(error.constraints || {}),
      errorCode: 'BAD_REQUEST_INPUT', // Mã lỗi tùy chỉnh
    }));

    return new BadRequestException({
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
}
