import { Response } from "../../base/response";

export interface HttpClientInterface {
    get<T>(url: string, data?: unknown): Promise<Response<T>>;

    post<T>(url: string, data?: unknown): Promise<Response<T>>;

    request<T>(httpMethod: string, url: string, data?: unknown): Promise<Response<T>>;
}
