import {
    AddMessageParametersInterface,
    Intelligence,
    MetricConversationParametersInterface,
    MetricMessageParametersInterface, ResolveConversationInterface
} from "../../../src/domains/v1/intelligence";
import { HttpClient } from "../../../src/base/http-client";
import { Response } from "../../../src/base/response";

jest.mock("../../../src/base/http-client");

const expectedBody = {
    aggregatedBy        : "DAY",
    firstDataOccurrence : "2020-05-21T00:00:00.000Z",
    lastDataOccurrence  : "2020-06-20T00:00:00.000Z",
    data                : {
        "2020-05-21T00:00:00.000Z" : 0,
        "2020-05-22T00:00:00.000Z" : 0,
        "2020-05-23T00:00:00.000Z" : 0,
        "2020-05-24T00:00:00.000Z" : 0,
        "2020-05-25T00:00:00.000Z" : 0,
        "2020-05-26T00:00:00.000Z" : 0,
        "2020-05-27T00:00:00.000Z" : 0,
        "2020-05-28T00:00:00.000Z" : 0,
        "2020-05-29T00:00:00.000Z" : 0,
        "2020-05-30T00:00:00.000Z" : 0,
        "2020-05-31T00:00:00.000Z" : 0,
        "2020-06-01T00:00:00.000Z" : 254,
        "2020-06-02T00:00:00.000Z" : 198,
        "2020-06-03T00:00:00.000Z" : 57,
        "2020-06-04T00:00:00.000Z" : 45,
        "2020-06-05T00:00:00.000Z" : 320,
        "2020-06-06T00:00:00.000Z" : 298,
        "2020-06-07T00:00:00.000Z" : 150,
        "2020-06-08T00:00:00.000Z" : 215,
        "2020-06-09T00:00:00.000Z" : 0,
        "2020-06-10T00:00:00.000Z" : 0,
        "2020-06-11T00:00:00.000Z" : 0,
        "2020-06-12T00:00:00.000Z" : 0,
        "2020-06-13T00:00:00.000Z" : 0,
        "2020-06-14T00:00:00.000Z" : 0,
        "2020-06-15T00:00:00.000Z" : 0,
        "2020-06-16T00:00:00.000Z" : 0,
        "2020-06-17T00:00:00.000Z" : 0,
        "2020-06-18T00:00:00.000Z" : 0,
        "2020-06-19T00:00:00.000Z" : 0,
        "2020-06-20T00:00:00.000Z" : 0
    },
    aggregatedValue         : 1537,
    previousAggregatedValue : 1502
};

const expectedBodyTags = {
    aggregatedBy        : "DAY",
    firstDataOccurrence : "2020-05-21T00:00:00.000Z",
    lastDataOccurrence  : "2020-06-20T00:00:00.000Z",
    data                : {
        "test"     : 5,
        "develop"  : 8,
        "support"  : 2,
        "test1"    : 5,
        "develop1" : 8,
        "support1" : 2,
        "test2"    : 5,
        "develop2" : 8,
        "support2" : 2,
        "test3"    : 5,
        "develop3" : 8,
        "support3" : 2,
    },
    aggregatedValue         : 110,
    previousAggregatedValue : 40
};

describe("Intelligence V1", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(Intelligence).toBeDefined();
    });

    it("should be possible to add a message", async () => {
        const mockedClient = new HttpClient();
        jest.spyOn(mockedClient, "post").mockResolvedValue(new Response(201, "\"\""));

        const options: AddMessageParametersInterface = {
            tenant                    : "teddies",
            direction                 : "OUT",
            time                      : "2020-02-14T12:03:59Z",
            provider                  : "SAYSIMPLE",
            channel                   : "SMS",
            tenantChannelIdentifier   : "+31612345678",
            customerChannelIdentifier : "+31687654321",
            actor                     : "customer_care_manager@teddies.com",
            agent                     : "teddy_himself@teddies.com",
            message                   : {
                textContent: "Hi 👋 dear customer,\n\nThanks for reaching out to us!\nYou've requested a return label for your order #43323. I would like to send it to you,\nbut unfortunately I can't find your email address with your order data. Can you provide it to me, please?\nI'll will immidiately send the label afterwards.\n\nThanks and have a great day!\n🧸 Teddy from Bear Shop Inc. 🧸"
            }
        };

        const client = new Intelligence(mockedClient);
        const result = await client.addMessage(options);

        expect(mockedClient.post).toBeCalledWith("/messages", options);

        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual("");
    });

    it("should be possible to resolve a conversation", async () => {
        const mockedClient = new HttpClient();
        jest.spyOn(mockedClient, "post").mockResolvedValue(new Response(201, "\"\""));

        const options: ResolveConversationInterface = {
            provider                : "SAYSIMPLE",
            channel                 : "SMS",
            tenantChannelIdentifier : "+31612345678",
            agent                   : "teddy_himself@teddies.com",
            time                    : "2020-02-14T12:03:59Z",
            conversation            : "14"
        };

        const client = new Intelligence(mockedClient);
        const result = await client.resolveConversation(options);

        expect(mockedClient.post).toBeCalledWith("/events/conversations/resolve", options);

        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual("");
    });

    it("should be able to get total messaged summed", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between    : "2020-05-21T20:25:10+02:00",
            and        : "2020-06-20T20:25:10+02:00",
            direction  : "in",
            channel    : [ "faceBOOK_Messenger" ],
            identifier : "*",
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getMessagesSummed(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/messages/sum", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get active contacts summed", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricConversationParametersInterface = {
            between    : "2020-05-21T20:25:10+02:00",
            and        : "2020-06-20T20:25:10+02:00",
            channel    : [ "WHATSAPP" ],
            identifier : "*",
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getActiveContactsSummed(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/active-contacts/sum", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get active contacts distributions", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricConversationParametersInterface = {
            between    : "2020-05-21T20:25:10+02:00",
            and        : "2020-06-20T20:25:10+02:00",
            channel    : [ "WHATSAPP" ],
            identifier : "*",
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getActiveContactsDistribution(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/active-contacts/distribution", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get agents", async () => {
        const mockedClient = new HttpClient();
        jest.spyOn(mockedClient, "get")
            .mockResolvedValue(new Response(200, "[\"agent@saysimple.nl\", \"teddies@saysimple.nl\"]"));

        const client = new Intelligence(mockedClient);
        const result = await client.getAgents();

        expect(mockedClient.get).toBeCalledWith("/agents", undefined);

        expect(result).toEqual([ "agent@saysimple.nl", "teddies@saysimple.nl" ]);
    });

    it("should be able to get channels", async () => {
        const mockedClient = new HttpClient();

        const expectedBody = [ { channel: "WHATSAPP", tenantChannelIdentifier: "+31 625948164" }, {
            channel: "SMS", tenantChannelIdentifier: "+31 625948164"
        } ];

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const client = new Intelligence(mockedClient);
        const result = await client.getChannels();

        expect(mockedClient.get).toBeCalledWith("/channels", undefined);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get paid templates sent", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between    : "2020-05-21T20:25:10+02:00",
            and        : "2020-06-20T20:25:10+02:00",
            channel    : [ "WHATSAPP" ],
            identifier : "*",
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getSentPaidTemplatesSummed(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/messages/sent-paid-templates/sum", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get message distribution", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between    : "2020-05-21T20:25:10+02:00",
            and        : "2020-06-20T20:25:10+02:00",
            direction  : "in",
            channel    : [ "WHATSAPP" ],
            identifier : "*",
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getMessageDistribution(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/messages/distribution", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get resolved conversations", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between    : "2020-05-21T20:25:10+02:00",
            and        : "2020-06-20T20:25:10+02:00",
            channel    : [ "WHATSAPP" ],
            identifier : "*",
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getConversationsResolved(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/conversations/resolved", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get average resolve time", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between : "2020-05-21T20:25:10+02:00",
            and     : "2020-06-20T20:25:10+02:00",
            agent   : [ "teddy@gmail.com" ]
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getConversationsResolveTimesAverage(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/conversations/resolve-times/average", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get median resolve time", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between : "2020-01-21T20:25:10+02:00",
            and     : "2020-02-20T20:25:10+02:00",
            channel : [ "FACEBOOK_MESSENGER" ],
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getConversationsResolveTimesMedian(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/conversations/resolve-times/median", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get average first reply time", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between : "2020-05-21T20:25:10+02:00",
            and     : "2020-06-20T20:25:10+02:00",
            agent   : [ "teddy@gmail.com" ]
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getConversationsFirstReplyTimesAverage(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/conversations/first-reply-times/average", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get median first reply time", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between : "2020-01-21T20:25:10+02:00",
            and     : "2020-02-20T20:25:10+02:00",
            channel : [ "FACEBOOK_MESSENGER" ],
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getConversationsFirstReplyTimesMedian(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/conversations/first-reply-times/median", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get average messages per conversation", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between   : "2020-05-21T20:25:10+02:00",
            and       : "2020-06-20T20:25:10+02:00",
            direction : "OUT"
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getConversationsMessagesAverage(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/conversations/messages/average", options);

        expect(result).toEqual(expectedBody);
    });

    it("should be able to get tags used", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBodyTags));

        const options: MetricMessageParametersInterface = {
            between      : "2020-05-21T20:25:10+02:00",
            and          : "2020-06-20T20:25:10+02:00",
            conversation : [ "8" ],
            identifier   : "*",
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getConversationsTagsUsed(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/conversations/tags", options);

        expect(result).toEqual(expectedBodyTags);
    });

    it("should be able to get average response time of messages", async () => {
        const mockedClient = new HttpClient();

        jest.spyOn(mockedClient, "get").mockResolvedValue(new Response(200, expectedBody));

        const options: MetricMessageParametersInterface = {
            between : "2020-05-21T20:25:10+02:00",
            and     : "2020-06-20T20:25:10+02:00"
        };

        const client = new Intelligence(mockedClient);
        const result = await client.getMessagesResponseTimesAverage(options);

        expect(mockedClient.get).toBeCalledWith("/metrics/messages/response-times/average", options);

        expect(result).toEqual(expectedBody);
    });
});
