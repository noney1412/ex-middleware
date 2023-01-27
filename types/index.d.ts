import type { AzureFunction, Context } from '@azure/functions';
export declare function error(status: ErrorMessage['status'], response: ErrorMessage['response'], message?: ErrorMessage['message']): void;
/**
 * @type TData is the type of the payload
 * @type T1-7 are the bindings for the middleware functions
 * */
export type ExMiddleware<TPayload, T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any> = [Context, TPayload, T1, T2, T3, T4, T5, T6, T7];
export type ExFlow<TMiddleware, TPayload> = {
    middleware: TMiddleware | Promise<TMiddleware>;
    payload: TPayload;
};
type ErrorMessage = {
    status: number;
    response: string;
    message?: string;
};
declare function exFlow<TFlow extends ExFlow<TFlow['middleware'], TFlow['payload']>>(middlewares: ((middleware: TFlow['middleware']) => TFlow['middleware'])[], initialPayload: TFlow['payload']): AzureFunction;
export default exFlow;
