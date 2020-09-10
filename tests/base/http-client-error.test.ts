import { HttpClientError } from "../../src/base/http-client-error";

describe("HttpClientError", () => {
    it("should be defined", () => {
        expect(HttpClientError).toBeDefined();
    });

    it("should return the error string", () => {
        const result = new HttpClientError(1234, "This is an error", "https://more.info");

        expect(() => {
            throw result;
        }).toThrowError("This is an error");

    });

    it("should be named 'HttpClientError'", () => {
        const result = new HttpClientError(1000, "Error", "URL");
        expect(result.name).toEqual("HttpClientError");
    });

    it("should contain an more info link and custom error code", () => {
        const result = new HttpClientError(1234, "This is an error", "https://more.info");
        expect(result.moreInfo).toEqual("https://more.info");
        expect(result.code).toEqual(1234);
    });

    it("should contain be able to get the JSON notation", () => {
        const result = new HttpClientError(1234, "This is an error", "https://more.info");
        expect(result.toString())
            .toEqual("{\"code\":1234,\"message\":\"This is an error\",\"moreInfo\":\"https://more.info\"}");
    });

    it("could contain a stack", () => {
        const result = new HttpClientError(1234, "This is an error", "https://more.info");
        expect(typeof result.stack).toEqual("string");
    });

});
