import { JsonSchemeException } from 'src/@exceptions/json-scheme.exception';
import { HeximalOperationsErrorType } from './types';
import { HeximalOperationsRequest } from './heximal-operations.request';
import { DefinedError } from 'ajv';

export function heximalOperationsValidateRequest(
  value: HeximalOperationsRequest,
  error: null | DefinedError,
): JsonSchemeException<HeximalOperationsErrorType> | null {
  if (error && error.keyword === 'pattern') {
    return new JsonSchemeException<HeximalOperationsErrorType>({
      error: 'Not a heximal number',
      operation_type: value.operation_type,
    } as HeximalOperationsErrorType);
  }

  if (error && error.params['type'] && error.params['type'] === 'string') {
    return new JsonSchemeException<HeximalOperationsErrorType>({
      error: 'Uncorrect input datatype: str need',
      operation_type: value.operation_type,
    } as HeximalOperationsErrorType);
  }

  if (error) {
    return new JsonSchemeException<HeximalOperationsErrorType>({
      error: error.message,
      operation_type: value?.operation_type as string,
    } as HeximalOperationsErrorType);
  }

  return null;
}
