import { AddMessageParametersInterface, Intelligence } from "../../../src/domains/v1/intelligence";
import { HttpClient } from "../../../src/base/http-client";
import { Response } from "../../../src/base/response";

jest.mock("../../../src/base/http-client");

describe("Intelligence V1", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(Intelligence).toBeDefined();
    });

    it("should return a not yet implemented response for functions not yet implemented", async () => {
        const intelligence = new Intelligence(new HttpClient());

        const results = await Promise.all([
            intelligence.getConversationsSummed(),
            intelligence.getConversationsAverage(),
            intelligence.getConversationResolveTimeAverage(),
            intelligence.getConversationResolveTimeMedian(),
            intelligence.getFirstReplyTimeAverage(),
            intelligence.getFirstReplyTimeMedian(),
        ]);

        const methodNotImplemented = "This method is not implemented yet."

        results.forEach(r => {
            expect(r.statusCode).toEqual(200);
            expect(r.body).toEqual(methodNotImplemented);
        });
    });

    it("should be possible to add a message", async () => {
        const mockedClient = new HttpClient();
        jest.spyOn(mockedClient, "post").mockResolvedValue(new Response(201, "\"\""));

        const options: AddMessageParametersInterface = {
            tenant                   : "teddies",
            direction                : "OUT",
            time                     : "2020-02-14T12:03:59Z",
            provider                 : "SAYSIMPLE",
            channel                  : "SMS",
            tenantChannelIdentifier  : "+31612345678",
            customerChannelIdentifier: "+31687654321",
            actor                    : "customer_care_manager@teddies.com",
            agent                    : "teddy_himself@teddies.com",
            message                  : {
                textContent: "Hi 👋 dear customer,\n\nThanks for reaching out to us!\nYou've requested a return label for your order #43323. I would like to send it to you,\nbut unfortunately I can't find your email address with your order data. Can you provide it to me, please?\nI'll will immidiately send the label afterwards.\n\nThanks and have a great day!\n🧸 Teddy from Bear Shop Inc. 🧸"
            }
        };

        const client = new Intelligence(mockedClient);
        const result = await client.addMessage(options);

        expect(mockedClient.post).toBeCalledWith("/messages", options);

        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual("");
    });
});
