import * as matrixOperationsRequest from '../@schemes/matrix-operations.request.json';
import * as matrixOperationsReponse from '../@schemes/matrix-operations.response.json';
import * as matrixOperationsError from '../@schemes/matrix-operations.error.json';
import * as heximalOperationsRequest from '../@schemes/heximal-operations.request.json';
import * as heximalOperationsReponse from '../@schemes/heximal-operations.response.json';
import * as heximalOperationsError from '../@schemes/heximal-operations.error.json';

import { JTDDataType } from 'ajv/dist/core';

export type MatrixOperationsRequestType = JTDDataType<
  typeof matrixOperationsRequest
>;

export type MatrixOperationsResponseType = JTDDataType<
  typeof matrixOperationsReponse
>;

export type MatrixOperationsErrorType = JTDDataType<
  typeof matrixOperationsError
>;

export type HeximalOperationsRequestType = JTDDataType<
  typeof heximalOperationsRequest
>;

export type HeximalOperationsResponseType = JTDDataType<
  typeof heximalOperationsReponse
>;

export type HeximalOperationsErrorType = JTDDataType<
  typeof heximalOperationsError
>;