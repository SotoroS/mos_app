import { HttpException } from '@nestjs/common';

export class JsonSchemeException<T> extends HttpException {
  constructor(error: T) {
    super(error as Record<string, any>, 400);
  }
}
