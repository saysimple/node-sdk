import { AuthorizationInterface } from "../types/base/authorization-interface";
import axios from "axios";

export class SaySimpleAuthorization implements AuthorizationInterface {
    private accessToken: string = '';
    private refreshToken: string = '';
    private accessTokenValidUntil: Date = new Date();

    private readonly applicationToken: string = '';
    private readonly applicationSecret: string = '';

    private readonly baseUrl: string = '';

    constructor(
        baseUrl: string,
        applicationToken: string,
        applicationSecret?: string
    ) {
        this.baseUrl = (baseUrl[baseUrl.length-1] === '/' ? baseUrl.substr(0, baseUrl.length - 1) : baseUrl);

        if (applicationSecret) {
            this.applicationToken = applicationToken;
            this.applicationSecret = applicationSecret;
        } else {
            this.accessToken = applicationToken;
            this.accessTokenValidUntil = new Date(Date.now() + 604800000) // 60*60*24*7: a week from now
        }
    }

    public async getAccessToken(): Promise<string> {
        if (this.accessToken.length < 1 && this.refreshToken.length < 1) {
            // No token ever requested
            await this.authenticate();
        } else if (! this.isAccessTokenValid()) {
            await this.refreshTokens();
        }

        return this.accessToken;
    }

    public isAccessTokenValid(): boolean {
        return (
            this.accessToken.length > 0
            && Date.now() < this.accessTokenValidUntil.getTime()
        );
    }

    public async refreshTokens(): Promise<void> {
        if (this.refreshToken.length < 1) {
            await this.authenticate();
        }
    }

    public async authenticate(): Promise<void> {
        if(this.applicationToken.length < 1 || this.applicationSecret.length < 1) {
            return Promise.reject(new Error("No token and/or secret given."));
        }

        const result = await axios.post(`${this.baseUrl}/v1/auth/authenticate`, {
            grant: "api_credentials",
            apiKey: this.applicationToken,
            apiSecret: this.applicationSecret
        });

        this.accessToken = result.data.accessToken;
        this.accessTokenValidUntil = new Date(result.data.expiresIn);
    }

    getAuthorizationType(): "Bearer" | "Basic" {
        return "Bearer";
    }

    needsAuthorizationHeader(): boolean {
        return true;
    }
}
