import "jest-extended";
import SaySimple from "../src";
import { Intelligence } from "../src/domains/v1/intelligence";
import { HttpClient } from "../src/base/http-client";
import { SaySimpleAuthorization } from "../src/base/saysimple-authorization";

jest.mock("../src/base/http-client");
jest.mock("../src/base/saysimple-authorization");

describe("SaySimple API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(SaySimple).toBeDefined();
    });

    it("should be able to get a Intelligence client", () => {
        const result = SaySimple.Intelligence.V1();
        expect(result).toBeInstanceOf(Intelligence);

        const resultLatest = SaySimple.Intelligence.Latest();
        expect(resultLatest).toBeInstanceOf(Intelligence);
    });

    it("should be able to set the config for the httpclient", () => {

        const expectedHttpClientConfig = {
            baseUrl: "https://secret-url.com/"
        }

        SaySimple.Intelligence.V1(
            "applicationToken",
            "applicationSecret",
            {
                baseUrl: "https://secret-url.com"
            }
        );
        expect(HttpClient).toBeCalledWith(
            expectedHttpClientConfig,
            expect.toBeObject() // <-- this is not really what we want, but there is no reflector expectation available (expect.toBeInstanceOf(...))
        );

        expect(SaySimpleAuthorization).toBeCalledWith(
            "https://apigateway.saysimple.io/",
            "applicationToken",
            "applicationSecret"
        )
    });
});
