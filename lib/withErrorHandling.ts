type Handler<T = any> = (req: Request, ctx: T) => Promise<Response> | Response;

export function withErrorHandling<T = any>(handler: Handler<T>) {
  return async (req: Request, ctx: T): Promise<Response> => {
    try {
      return await handler(req, ctx);
    } catch (err: any) {
      console.error('API Error:', err);
      const status = typeof err?.status === 'number' ? err.status : 500;
      const message = err?.message || 'Internal Server Error';
      return Response.json({ error: message }, { status });
    }
  };
}

