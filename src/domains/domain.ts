import { DomainInterface } from "../types/domain-interface";
import { HttpClientInterface } from "../types/base/http-client-interface";

export abstract class Domain implements DomainInterface {
    readonly abstract VERSION: string;

    protected readonly httpClient: HttpClientInterface;

    protected constructor(
        httpClient: HttpClientInterface
    ) {
        this.httpClient = httpClient;
    }
}
