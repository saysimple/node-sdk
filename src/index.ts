import { HttpClient } from "./base/http-client";
import { Intelligence as IntelligenceV1 } from "./domains/v1/intelligence";
import * as _ from "lodash";
import { SaySimpleAuthorization } from "./base/saysimple-authorization";
import { IntelligenceV1FactoryMethodConfig } from "./types/domains/intelligence-v1-factory-method-config";

function IntelligenceV1FactoryMethod(
    applicationToken: string = '',
    applicationSecret: string = '',
    config: Partial<IntelligenceV1FactoryMethodConfig> = {
        baseUrl: "https://intelligence.apis.saysimple.io/v1/",
    }
): IntelligenceV1 {
    if (! _.endsWith("/", config.baseUrl)) {
        config.baseUrl += "/";
    }

    return new IntelligenceV1(
        new HttpClient(
            { baseUrl: config.baseUrl },
            new SaySimpleAuthorization(
                config.authorizationBaseUrl ?? 'https://apigateway.saysimple.io/',
                applicationToken,
                applicationSecret
            )
        )
    );
}

const SaySimple = {
    Intelligence: {
        V1    : IntelligenceV1FactoryMethod,
        Latest: IntelligenceV1FactoryMethod
    }
};

export default SaySimple;
