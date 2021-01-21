import "jest-extended";
import { HttpClient } from "../../src/base/http-client";
import { SaySimpleAuthorization } from "../../src/base/saysimple-authorization";
import axios from "axios";

jest.mock("../../src/base/error/http-client-error");

describe("HttpClient", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(HttpClient).toBeDefined();
    });

    it("should have sane defaults", () => {
        jest.spyOn(axios, "create");
        new HttpClient();

        expect(axios.create).toBeCalledWith({
            baseURL : "https://api.saysimple.io/",
            headers : {
                "content-type": "application/json"
            }
        });
    });

    it("should be possible to add default config", () => {
        jest.spyOn(axios, "create");
        new HttpClient({
            baseUrl : "https://other.url.com",
            headers : {
                "Authorization": "Bearer 123456789"
            }
        });

        expect(axios.create).toBeCalledWith({
            baseURL : "https://other.url.com",
            headers : {
                "content-type"  : "application/json",
                "Authorization" : "Bearer 123456789"
            }
        });
    });

    it("should be possible to do a GET request", async () => {
        const http   = new HttpClient();
        const result = await http.get<unknown>("https://jsonplaceholder.typicode.com/posts/1");

        expect(result.statusCode).toEqual(200);
        expect(result.body).toContainAllKeys([ "userId", "id", "title", "body" ]);
    });

    it("should be possible to do a POST request", async () => {
        const http   = new HttpClient();
        const result = await http.post<unknown>(
            "https://jsonplaceholder.typicode.com/posts",
            { title: "Test", body: "Test body" }
        );

        expect(result.statusCode).toEqual(201);
        expect(result.body).toContainAllEntries([ [ "title", "Test" ], [ "body", "Test body" ], [ "id", 101 ] ]);
    });

    it("should be possible to do a POST request", async () => {
        const http   = new HttpClient({}, new SaySimpleAuthorization(
            "//api.saysimple.io/v1/auth/authenticate",
            "token"
        ));
        const result = await http.post<unknown>(
            "https://jsonplaceholder.typicode.com/posts",
            { title: "Test", body: "Test body" }
        );

        expect(result.statusCode).toEqual(201);
        expect(result.body).toContainAllEntries([ [ "title", "Test" ], [ "body", "Test body" ], [ "id", 101 ] ]);
    });
});
