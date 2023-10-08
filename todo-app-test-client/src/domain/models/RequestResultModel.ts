export type RequestResultModel<T> = {
    isSuccessful?: boolean;
    isError?: boolean;
    errorMessage?: string;
    status?: string;
    messages?: string[];
    result?: T;
}

export type AsyncApiResponse<T> = Promise<RequestResultModel<T>>

