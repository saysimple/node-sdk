import "jest-extended";
import { SaySimpleAuthorization } from "../../src/base/saysimple-authorization";
import axios from "axios";

jest.mock("axios");
jest.useFakeTimers("modern");

describe("SaySimple Authorizer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    })

    it("should be defined", () => {
        expect(SaySimpleAuthorization).toBeDefined();
    });

    it("should set an authorization header with a bearer token", () => {
        const ssa = new SaySimpleAuthorization("", "", "");

        expect(ssa.needsAuthorizationHeader()).toBeTrue();
        expect(ssa.getAuthorizationType()).toEqual("Bearer");
    })

    it("should raise an error when no token or secret is not given", () => {
        const ssa = new SaySimpleAuthorization("", "", "");

        expect(ssa.authenticate()).rejects.toEqual(new Error("No token and/or secret given."))
    });

    it("should be possible to set access token directly", () => {
        const accessToken = "accessToken123456";
        const ssa = new SaySimpleAuthorization("", accessToken);
        expect(ssa.getAccessToken()).resolves.toEqual(accessToken);
    });

    it("should fetch an access token", async () => {
        const expectedAccessToken = "accessTokenVeryC00l!156315";
        const expectedAxiosResponse = {
            data: {
                tokenType: "Bearer",
                accessToken: expectedAccessToken,
                expiresIn: new Date(Date.now() + 90000) // 15 minutes
            }
        }

        jest.spyOn(axios, "post").mockResolvedValue(expectedAxiosResponse);
        const ssa = new SaySimpleAuthorization(
            "https://authorize.me",
            "token",
            "supersecret"
        );

        const result = await ssa.getAccessToken();
        expect(result).toEqual(expectedAccessToken);
    });

    it("should re-authenticate if no refresh token is available", async () => {
        const expectedAccessToken = "accessTokenVeryC00l!156315";
        const fifteenMinutesFromNow = new Date(Date.now() + 90000);
        const expectedAxiosResponse = {
            data: {
                tokenType: "Bearer",
                accessToken: expectedAccessToken,
                expiresIn: fifteenMinutesFromNow // 15 minutes
            }
        }

        jest.spyOn(axios, "post").mockResolvedValue(expectedAxiosResponse);
        const ssa = new SaySimpleAuthorization(
            "https://authorize.me",
            "token",
            "supersecret"
        );
        jest.spyOn(ssa, "authenticate");
        jest.spyOn(ssa, "refreshTokens");
        jest.spyOn(ssa, "isAccessTokenValid");

        await ssa.getAccessToken();

        jest.setSystemTime(fifteenMinutesFromNow);

        await ssa.getAccessToken();

        expect(ssa.refreshTokens).toBeCalledTimes(1);
        expect(ssa.isAccessTokenValid).toBeCalledTimes(1);
        expect(ssa.authenticate).toBeCalledTimes(2);
    });
})
