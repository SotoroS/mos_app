import { PipeTransform, Injectable } from '@nestjs/common';
import Ajv, { JSONSchemaType } from 'ajv';
import { JsonSchemeException } from 'src/@exceptions/json-scheme.exception';

@Injectable()
export class AjvPipe<T, E> implements PipeTransform {
  constructor(
    public schema: object,
    public customValidate: (
      value: any,
      error: any,
    ) => JsonSchemeException<E> | null,
    private ajv: Ajv = new Ajv(),
  ) {}

  transform(value: JSONSchemaType<typeof this.schema>) {
    const validate = this.ajv.compile<T>(this.schema);

    validate(value);

    const resultValidate = this.customValidate(
      value,
      validate.errors?.length ? validate.errors[0] : null,
    );

    if (resultValidate) throw resultValidate;

    return value;
  }
}
