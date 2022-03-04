import { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import * as qs from "qs";
import { Response } from "./response";
import { HttpClientError } from "./error/http-client-error";
import { HttpClientInterface } from "../types/base/http-client-interface";
import { AuthorizationInterface } from "../types/base/authorization-interface";
import axios from "axios";

export class HttpClient implements HttpClientInterface {
    private client: AxiosInstance;
    private readonly authorizer?: AuthorizationInterface;

    constructor(
        options: HttpClientOptions = {},
        authorizer?: AuthorizationInterface
    ) {
        const axiosOptions: AxiosRequestConfig = {
            baseURL : options.baseUrl ?? "https://api.saysimple.io/",
            headers : {
                ...defaultHeaders,
                ...options.headers ?? {}
            }
        };

        if (authorizer) {
            this.authorizer = authorizer;
        }

        this.client = axios.create(axiosOptions);
    }

    get<T>(url: string, data?: unknown): Promise<Response<T>> {
        return this.request("get", url, data);
    }

    post<T>(url: string, data?: unknown): Promise<Response<T>> {
        return this.request("post", url, data);
    }

    async request<T>(httpMethod: Method, url: string, data?: unknown): Promise<Response<T>> {
        const dataAsQueryString = (httpMethod.toLowerCase() === "get" ? this.dataAsQueryString(data) : "");
        const dataOrNot         = httpMethod.toLowerCase() === "post" ? data : undefined;
        const headers: any        = {};

        if (this.authorizer && this.authorizer.needsAuthorizationHeader()) {
            headers.authorization = `${this.authorizer.getAuthorizationType()} ${await this.authorizer.getAccessToken()}`;
        }

        return new Promise((resolve, reject) => {

            this.client.request({
                method : httpMethod,
                url    : `${url}${dataAsQueryString}`,
                data   : dataOrNot,
                headers
            })
                .then((response: AxiosResponse) => {
                    resolve(new Response<T>(response.status, response.data));
                })
                .catch((reason) => {
                    reject(new HttpClientError(1002, reason.message, "TBD"));
                })
            ;
        });
    }

    private dataAsQueryString(data: unknown, prefix = "?"): string {
        return prefix + qs.stringify(data, { arrayFormat: "repeat" });
    }
}

const defaultHeaders: { [name: string]: string } = {
    "content-type": "application/json",
};

interface HttpClientOptions {
    baseUrl?: string,
    headers?: { [name: string]: string | undefined }
}
