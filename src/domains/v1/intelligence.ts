import { Domain } from "../domain";
import { HttpClientInterface } from "../../types/base/http-client-interface";
import { MetricDataResponseInterface } from "../../types/responses/intelligence/metric-data-response-interface";
import { Response } from "../../base/response";
import { AgentList } from "../../types/responses/intelligence/list-agents-response";
import { ListChannelsResponseInterface } from "../../types/responses/intelligence/list-channels-response";

export class Intelligence extends Domain {
    readonly VERSION: string  = "V1";

    constructor(
        httpClient: HttpClientInterface
    ) {
        super(httpClient);
    }

    public async addMessage(opts?: AddMessageParametersInterface): Promise<Response<{ statusCode: 201, body: "" }>> {
        return await this.httpClient.post("/messages", opts);
    }

    private getData<T, O = undefined>(url: string, opts?: O): Promise<T> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(url, opts)
                .then(response => {
                    resolve(response.body as T);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public getMessagesSummed(opts?: MetricMessageParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricMessageParametersInterface>("/metrics/messages/sum", opts);
    }

    public getActiveContactsSummed(opts?: MetricConversationParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricConversationParametersInterface>("/metrics/active-contacts/sum", opts);
    }

    public getSentPaidTemplatesSummed(opts?: MetricParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricParametersInterface>("/metrics/messages/sent-paid-templates/sum", opts);
    }

    public getAgents(): Promise<Response<AgentList>> {
        return this.getData<Response<AgentList>>("/agents");
    }

    public getChannels(): Promise<Response<ListChannelsResponseInterface[]>> {
        return this.getData<Response<ListChannelsResponseInterface[]>>("/channels");
    }

    public getMessageDistribution(opts?: MetricMessageParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricMessageParametersInterface>("/metrics/messages/distribution", opts);
    }

    public getConversationsResolved(opts?: MetricMessageParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricMessageParametersInterface>("/metrics/conversations/resolved", opts);
    }

    public getConversationsResolveTimesAverage(opts?: MetricMessageParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricMessageParametersInterface>("/metrics/conversations/resolve-times/average", opts);
    }

    public getConversationsResolveTimesMedian(opts?: MetricMessageParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricMessageParametersInterface>("/metrics/conversations/resolve-times/median", opts);
    }

    public async resolveConversation(opts?: ResolveConversationInterface): Promise<Response<{ statusCode: 201, body: "" }>> {
        return await this.httpClient.post("/events/conversations/resolve", opts);
    }

    public getConversationsFirstReplyTimesAverage(opts?: MetricMessageParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricMessageParametersInterface>("/metrics/conversations/first-reply-times/average", opts);
    }

    public getConversationsFirstReplyTimesMedian(opts?: MetricMessageParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricMessageParametersInterface>("/metrics/conversations/first-reply-times/median", opts);
    }

    public getConversationsMessagesAverage(opts?: MetricMessageParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricMessageParametersInterface>("/metrics/conversations/messages/average", opts);
    }

    public getMessagesResponseTimesAverage(opts?: MetricMessageParametersInterface): Promise<MetricDataResponseInterface> {
        return this.getData<MetricDataResponseInterface, MetricMessageParametersInterface>("/metrics/messages/response-times/average", opts);
    }
}

interface MetricParametersInterface {
    between?    : Date | string;
    and?        : Date | string;
    agent?      : "*" | string[];
    channel?    : "*" | string[];
    provider?   : "*" | string[];
    identifier? : "*" | string[];
}

export interface MetricMessageParametersInterface extends MetricParametersInterface {
    direction?: "IN" | "in" | "OUT" | "out" | "ALL" | "all";
}

export interface MetricConversationParametersInterface extends MetricParametersInterface {
    unique?: boolean
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
    provider: string,
    actor?: string,
    agent?: string,
    tags?: string[],
    conversation?: string
}

export interface ResolveConversationInterface {
    channel: string,
    tenantChannelIdentifier: string,
    provider: string,
    agent?: string,
    time: Date | string,
    conversation: string
}
