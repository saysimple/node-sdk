import { Domain } from "../domain";
import { HttpClientInterface } from "../../types/base/http-client-interface";
import { MetricDataResponseInterface } from "../../types/responses/intelligence/metric-data-response-interface";
import { Response } from "../../base/response";

export class Intelligence extends Domain {
    readonly VERSION: string  = "V1";

    constructor(
        httpClient: HttpClientInterface
    ) {
        super(httpClient);
    }

    public addMessage(opts?: AddMessageParametersInterface): Promise<Response<{ statusCode: 201, body: "" }>> {
        return this.httpClient.post("/messages", opts);
    }

    public getMessagesSummed(opts?: MetricMessageParametersInterface): Promise<Response<MetricDataResponseInterface>> {
        return this.httpClient.get("/metrics/messages/sum", opts);
    }

    public getMessagesAverage(opts?: MetricMessageParametersInterface): Promise<Response<MetricDataResponseInterface>> {
        return this.httpClient.get("/metrics/messages/average", opts);
    }

    public getConversationsSummed(opts?: metricConversationParametersInterface): Promise<Response<string>> {
        return this.isNotImplementedYet();
    }

    public getConversationsAverage(opts?: metricConversationParametersInterface): Promise<Response<string>> {
        return this.isNotImplementedYet();
    }

    public getFirstReplyTimeMedian(opts?: MetricDurationParametersInterface): Promise<Response<string>> {
        return this.isNotImplementedYet();
    }

    public getFirstReplyTimeAverage(opts?: MetricDurationParametersInterface): Promise<Response<string>> {
        return this.isNotImplementedYet();
    }

    public getConversationResolveTimeMedian(opts?: MetricDurationParametersInterface): Promise<Response<string>> {
        return this.isNotImplementedYet();
    }

    public getConversationResolveTimeAverage(opts?: MetricDurationParametersInterface): Promise<Response<string>> {
        return this.isNotImplementedYet();
    }
}

interface MetricParametersInterface {
    between?: Date | string;
    and?: Date | string;
    agent?: "*" | string[];
    channel?: "*" | string[];
    provider?: "*" | string[];
    channelIdentity?: "*" | string[];
}

interface MetricMessageParametersInterface extends MetricParametersInterface {
    direction?: "IN" | "in" | "OUT" | "out" | "ALL" | "all";
}

interface metricConversationParametersInterface extends MetricParametersInterface {
    unique?: boolean
}

interface MetricDurationParametersInterface extends MetricParametersInterface {
    withinBusinessHours?: boolean
}

interface mediaMessage {
    type: "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT" | "OTHER"
    url: string,

    [metaData: string]: any
}

export interface AddMessageParametersInterface {
    tenant: string,
    direction: "IN" | "OUT" | "in" | "out",
    channel: string,
    tenantChannelIdentifier: string,
    customerChannelIdentifier: string,
    message: {
        textContent?: string,
        media?: mediaMessage[]
        [metaData: string]: any
    },
    time?: Date | string,
    provider?: string,
    actor?: string,
    agent?: string,
    tags?: string[]
}
