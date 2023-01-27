import type { AzureFunction, Context } from '@azure/functions';
import { flow } from 'lodash/fp';

export function error(status: ErrorMessage['status'], response: ErrorMessage['response'], message?: ErrorMessage['message']) {
  throw new Error(JSON.stringify({ status, response, message }));
}

/**
 * @type TData is the type of the payload
 * @type T1-7 are the bindings for the middleware functions
 * */
export type ExMiddleware<
  TPayload,
  T1 = any,
  T2 = any,
  T3 = any,
  T4 = any,
  T5 = any,
  T6 = any,
  T7 = any
> = [Context, TPayload, T1, T2, T3, T4, T5, T6, T7];

export type ExFlow<TMiddleware, TPayload> = {
  middleware: TMiddleware;
  payload: TPayload;
};

type ErrorMessage = {
  status: number;
  response: string;
  message?: string;
};

function exFlow<TFlow extends ExFlow<TFlow['middleware'], TFlow['payload']>>(
  middlewares: ((middleware: TFlow['middleware']) => TFlow['middleware'])[],
  initialPayload: TFlow['payload']
): AzureFunction {
  return async function (context: Context, ...agrs): Promise<void> {
    const payload = initialPayload;
    const args = [context, payload, ...agrs];

    try {
      await flow(middlewares)(args as TFlow['middleware']);
    } catch (e: any) {
      const { status, response, message } = JSON.parse(e.message) as ErrorMessage;
      context.res = {
        status,
        body: response,
      };
      context.log.error(message);
    }
  };
}

export default exFlow;
