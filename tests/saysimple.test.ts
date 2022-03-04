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
            baseUrl : "https://secret-url.com/",
            headers : {
                "x-client-ip": "192.168.1337.45",
            },
        };

        SaySimple.Intelligence.V1(
            "apiKey",
            "privateKey",
            {
                baseUrl   : "https://secret-url.com",
                xClientIp : "192.168.1337.45"
            }
        );
        expect(HttpClient).toBeCalledWith(
            expectedHttpClientConfig,
            expect.toBeObject() // <-- this is not really what we want, but there is no reflector expectation available (expect.toBeInstanceOf(...))
        );

        expect(SaySimpleAuthorization).toBeCalledWith(
            "https://api.saysimple.io/v1/auth/authenticate",
            "apiKey",
            "privateKey"
        );
    });

    it("should be able to use custom authentication url", () => {
        SaySimple.Intelligence.V1(
            "apiKey",
            "privateKey",{
                authenticationUrl : "www.saysimple.com/auth",
                baseUrl           : "www.saysimple.com/",
                xClientIp         : "192.168.1337.45",
            }
        );

        expect(SaySimpleAuthorization).toBeCalledWith(
            "www.saysimple.com/auth",
            "apiKey",
            "privateKey"
        );
    });
});
