import { NextResponse } from 'next/server';
import { ZodError, type ZodType } from 'zod';
import { ApiError, failure } from './response';

type Handler<Ctx = unknown> = (req: Request, ctx: Ctx) => Promise<NextResponse> | NextResponse;

/**
 * Wraps an API route handler with consistent error handling so individual
 * routes stay focused on business logic (DRY).
 */
export const withApi =
  <Ctx = unknown>(handler: Handler<Ctx>) =>
  async (req: Request, ctx: Ctx): Promise<NextResponse> => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      if (error instanceof ApiError) {
        return failure(error.message, error.statusCode);
      }
      if (error instanceof ZodError) {
        return failure('Validation failed', 422, zodFieldErrors(error));
      }
      console.error('[api] Unhandled error:', error);
      return failure('Something went wrong. Please try again.', 500);
    }
  };

const zodFieldErrors = (error: ZodError): Record<string, string> => {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'form';
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
};

/** Parses + validates a JSON body, throwing a ZodError that `withApi` formats. */
export const parseBody = async <T>(req: Request, schema: ZodType<T>): Promise<T> => {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw new ApiError('Invalid request body', 400);
  }
  return schema.parse(raw);
};
