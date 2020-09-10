import { DomainInterface } from "../types/domain-interface";
import { HttpClientInterface } from "../types/base/http-client-interface";
import { Response } from "../base/response";

export abstract class Domain implements DomainInterface {
    readonly abstract VERSION: string;

    protected readonly httpClient: HttpClientInterface;

    protected constructor(
        httpClient: HttpClientInterface
    ) {
        this.httpClient = httpClient;
    }

    protected isNotImplementedYet(): Promise<Response<string>> {
        return Promise.resolve(new Response<string>(200, "\"This method is not implemented yet.\""));
    }
}
