import { AuthorizationInterface } from "../types/base/authorization-interface";
import axios from "axios";
import * as jwt from "jsonwebtoken";

export class SaySimpleAuthorization implements AuthorizationInterface {
    private accessToken: string = "";
    private accessTokenValidUntil: Date = new Date();

    private readonly apiKey: string = "";
    private bearerToken = "";


    constructor(
        private readonly authenticationUrl: string,
        apiToken: string,
        private readonly privateKey: string = ""
    ) {
        this.authenticationUrl = (authenticationUrl[authenticationUrl.length-1] === "/" ? authenticationUrl.substr(0, authenticationUrl.length - 1) : authenticationUrl);

        if (privateKey) {
            this.apiKey = apiToken;
            this.privateKey = privateKey;
        } else {
            this.accessToken = apiToken;
            this.accessTokenValidUntil = new Date(Date.now() + 300000); // 5*60: five minutes from now
        }
    }

    public async getAccessToken(): Promise<string> {
        if (this.accessToken.length < 1 || ! this.isAccessTokenValid()) {
            // No token ever requested
            this.generateJWT();
            await this.authenticate();
        } else if(this.accessToken.length < 1) {
            throw new Error("Unable to authenticate");
        }

        return this.accessToken;
    }

    public isAccessTokenValid(): boolean {
        return (
            this.accessToken.length > 0
            && Date.now() < this.accessTokenValidUntil.getTime()
        );
    }

    public async authenticate(): Promise<void> {
        if(this.apiKey.length < 1 || this.privateKey.length < 1) {
            return Promise.reject(new Error("No api key and/or private key given."));
        }

        const result = await axios.post(this.authenticationUrl, null, {
            headers: {
                Authorization: `Bearer ${this.bearerToken}`
            }
        });

        this.accessToken = result.data.accessToken;
        this.accessTokenValidUntil = new Date(result.data.expiresIn);
    }

    private generateJWT(): any {
        this.bearerToken = jwt.sign({
            key      : this.apiKey,
            apiToken : true
        }, this.privateKey, {
            algorithm : "RS256",
            expiresIn : 300,
            notBefore : 0
        });
    }

    getAuthorizationType(): "Bearer" | "Basic" {
        return "Bearer";
    }

    needsAuthorizationHeader(): boolean {
        return true;
    }
}
