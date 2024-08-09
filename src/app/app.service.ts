import { Injectable } from '@nestjs/common';
import { HeximalOperationsRequest } from 'src/@types/heximal-operations.request';
import { HeximalOperationsResponse } from 'src/@types/heximal-operations.response';
import { MatrixOperationsRequest } from 'src/@types/matrix-operations.request';
import { MatrixOperationsResponse } from 'src/@types/matrix-operations.response';

@Injectable()
export class AppService {
  matrixOperations(data: MatrixOperationsRequest): MatrixOperationsResponse {
    return {
      operation_type: data.operation_type,
      matrix: this[`${data.operation_type}Matrices`](
        data.matrix_1,
        data.matrix_2,
      ),
    } as MatrixOperationsResponse;
  }

  heximalOperations(data: HeximalOperationsRequest): HeximalOperationsResponse {
    return {
      operation_type: data.operation_type,
      heximal: this[`${data.operation_type}Heximal`](
        data.heximal_1,
        data.heximal_2,
      ),
    } as HeximalOperationsResponse;
  }

  private multiplyMatrices(a: number[][], b: number[][]): number[][] {
    if (a[0].length !== b.length) throw new Error('Матрицы нельзя перемножить');

    const resultMatrix: number[][] = new Array(a.length);

    for (let i = 0; i < a.length; i++)
      resultMatrix[i] = new Array(b[0].length).fill(0);

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < a[0].length; k++) {
          resultMatrix[i][j] += a[i][k] * b[k][j];
        }
      }
    }

    return resultMatrix;
  }

  private addMatrices(a: number[][], b: number[][]): number[][] {
    if (a.length !== b.length || a[0].length !== b[0].length)
      throw new Error('Матрицы должны быть одинакового размера');

    const resultMatrix: number[][] = new Array(a.length);

    for (let i = 0; i < a.length; i++) resultMatrix[i] = new Array(a[0].length);

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[0].length; j++) {
        resultMatrix[i][j] = a[i][j] + b[i][j];
      }
    }

    return resultMatrix;
  }

  private multiplyHeximal(a: string, b: string): string {
    const result = this.hexToDecimal(a) * this.hexToDecimal(b);
    return this.decimalToHex(result);
  }

  private addHeximal(a: string, b: string): string {
    const result = this.hexToDecimal(a) + this.hexToDecimal(b);
    return this.decimalToHex(result);
  }

  private hexToDecimal(hex: string): number {
    let decimal = 0;
    const hexDigits = '0123456789ABCDEF';

    for (let i = 0; i < hex.length; i++) {
      const digit = hex[i].toUpperCase();

      decimal = decimal * 16 + hexDigits.indexOf(digit);
    }

    return decimal;
  }

  private decimalToHex(decimal: number): string {
    if (decimal === 0) return '0';

    const hexDigits = '0123456789ABCDEF';
    let hex = '';

    while (decimal > 0) {
      const remainder = decimal % 16;

      hex = hexDigits[remainder] + hex;
      decimal = Math.floor(decimal / 16);
    }

    return hex;
  }
}
