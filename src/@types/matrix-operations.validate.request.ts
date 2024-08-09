import { JsonSchemeException } from 'src/@exceptions/json-scheme.exception';
import { MatrixOperationsRequest } from './matrix-operations.request';
import { MatrixOperationsErrorType } from './types';

export function matrixOperationsValidateRequest(
  value: MatrixOperationsRequest,
  error: null | JsonSchemeException<MatrixOperationsErrorType>,
): JsonSchemeException<MatrixOperationsErrorType> | null {
  if (error) {
    return new JsonSchemeException<MatrixOperationsErrorType>({
      error: error.message,
      operation_type: value?.operation_type as string,
    } as MatrixOperationsErrorType);
  }

  if (!haveSameDimensions(value.matrix_1, value.matrix_2)) {
    return new JsonSchemeException<MatrixOperationsErrorType>({
      error: 'Matrix dimension mismatch',
      operation_type: value.operation_type,
    } as MatrixOperationsErrorType);
  }

  if (
    !(
      value.matrix_1.flat(Infinity).every(Number.isInteger) &&
      value.matrix_2.flat(Infinity).every(Number.isInteger)
    )
  ) {
    return new JsonSchemeException<MatrixOperationsErrorType>({
      error: 'Uncorrect datatype of elements: integers need',
      operation_type: value.operation_type,
    } as MatrixOperationsErrorType);
  }

  return null;
}

function haveSameDimensions(a: number[][], b: number[][]) {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) {
      return false;
    }
  }

  return true;
}
