import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthDto } from './dtos/health.dto';

import { AjvPipe } from '../@pipes/ajv.pipe';
import {
  HeximalOperationsErrorType,
  HeximalOperationsRequestType,
  MatrixOperationsRequestType,
} from 'src/@types/types';

import * as matrixOperationsRequest from '../@schemes/matrix-operations.request.json';
import * as heximalOperationsRequest from '../@schemes/heximal-operations.request.json';

import { MatrixOperationsRequest } from 'src/@types/matrix-operations.request';
import { MatrixOperationsResponse } from 'src/@types/matrix-operations.response';
import { HeximalOperationsRequest } from 'src/@types/heximal-operations.request';
import { HeximalOperationsResponse } from 'src/@types/heximal-operations.response';
import { MatrixOperationsError } from 'src/@types/matrix-operations.error';
import { matrixOperationsValidateRequest } from 'src/@types/matrix-operations.validate.request';
import { heximalOperationsValidateRequest } from 'src/@types/heximal-operations.validate.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('check_health')
  checkHealth(): HealthDto {
    return { status: 'OK' } as HealthDto;
  }

  @Post('matrix_operations')
  @UsePipes(
    new AjvPipe<MatrixOperationsRequestType, MatrixOperationsError>(
      matrixOperationsRequest,
      matrixOperationsValidateRequest,
    ),
  )
  matrixOperations(
    @Body() data: MatrixOperationsRequest,
  ): MatrixOperationsResponse {
    return this.appService.matrixOperations(data);
  }

  @Post('heximal_operations')
  @UsePipes(
    new AjvPipe<HeximalOperationsRequestType, HeximalOperationsErrorType>(
      heximalOperationsRequest,
      heximalOperationsValidateRequest,
    ),
  )
  heximalOperations(
    @Body() data: HeximalOperationsRequest,
  ): HeximalOperationsResponse {
    return this.appService.heximalOperations(data);
  }
}
