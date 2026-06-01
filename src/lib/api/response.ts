import { NextResponse } from 'next/server';

/** Thrown anywhere in an API handler to short-circuit with a specific status. */
export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export const success = <T>(data: T, status = 200): NextResponse<ApiSuccess<T>> =>
  NextResponse.json({ success: true, data }, { status });

export const failure = (
  message: string,
  status = 400,
  errors?: Record<string, string>
): NextResponse<ApiFailure> =>
  NextResponse.json({ success: false, message, ...(errors ? { errors } : {}) }, { status });
