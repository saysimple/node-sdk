import { HttpClient } from "./base/http-client";
import { Intelligence as IntelligenceV1 } from "./domains/v1/intelligence";
import * as _ from "lodash";
import { SaySimpleAuthorization } from "./base/saysimple-authorization";
import { IntelligenceV1FactoryMethodConfig } from "./types/domains/intelligence-v1-factory-method-config";

function IntelligenceV1FactoryMethod(
    apiToken: string  = "",
    privateKey: string = "",
    config: Partial<IntelligenceV1FactoryMethodConfig> = {
        baseUrl: "https://intelligence.apis.saysimple.io/v1/",
    }
): IntelligenceV1 {
    if (! _.endsWith(config.baseUrl, "/")) {
        config.baseUrl += "/";
    }

    return new IntelligenceV1(
        new HttpClient(
            config.xClientIp
                ? { baseUrl: config.baseUrl, headers: { [ "x-client-ip" ]: config.xClientIp } }
                : { baseUrl: config.baseUrl },
            new SaySimpleAuthorization(
                config.authenticationUrl ?? "https://api.saysimple.io/v1/auth/authenticate",
                apiToken,
                privateKey
            )
        )
    );
}

export = {
    Intelligence: {
        V1     : IntelligenceV1FactoryMethod,
        Latest : IntelligenceV1FactoryMethod
    }
};
