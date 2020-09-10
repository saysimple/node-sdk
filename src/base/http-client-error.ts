export class HttpClientError extends Error {
    public readonly code: number;
    public readonly moreInfo: string;

    constructor(code: number, message: string, moreInfo: string) {
        super(message);

        this.name     = "HttpClientError";
        this.code     = code;
        this.moreInfo = moreInfo;

        this.toString = () => JSON.stringify({
            code    : this.code,
            message : this.message,
            moreInfo: this.moreInfo
        });
    }
}
