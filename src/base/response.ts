import { HttpClientError } from "./error/http-client-error";

export class Response<T> {
    readonly statusCode: number;
    readonly bodyRaw: T | string;
    readonly body: T;

    constructor(statusCode: number, body: string | T) {
        this.statusCode = statusCode;
        this.bodyRaw    = body;
        if (typeof body === "string" && body.length > 0) {
            try {
                this.body = JSON.parse(body) as T;
            } catch (e) {
                throw new HttpClientError(1003, "Trouble parsing response", "TBD");
            }
        } else {
            this.body = body as T;
        }
    }
}
