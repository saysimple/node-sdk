import "jest-extended";
import { SaySimpleAuthorization } from "../../src/base/saysimple-authorization";
import axios from "axios";

jest.mock("axios");
jest.useFakeTimers("modern");

const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIEpAIBAAKCAQEAsFuA6xd3FcGsDCu8hfYe3Kej8RUyoRdWA+rUQeTL9xfBtTMR\n" +
    "kWUuTBG4qEMW/iNg83XNWexaLNuX/v/drJKtID39PvjKsMRKIoZOASGiCwjAxAK8\n" +
    "6Ce8WImJU3i0DVMGBtDvjw/aOIr2KXKUmdvpmAcyxfHn7p+UJOz/wyXgDxFyOeLe\n" +
    "bhSpxmfZnRt/0hyaVTBQ0VqpzolNMdjlbdnRRxUIy528koVIJWgv2IAhbwp/8NgG\n" +
    "W4HM+uTWo4akVDD1ueT8LXG7agAZudxB3934hWvpLKj5qQxI2HHLM1TJL3y2RDbY\n" +
    "bnPJVVRAK+Ga+Q+Ca7F3QxGS8zlzdR0y23xZFQIDAQABAoIBAHdhuedqvwZPUHP8\n" +
    "t2XHsiSUpvnv65H5BhUoxf7FLv1Za5uJsn7GC40bAfGFWO84a8zjFdulj3WGQWIx\n" +
    "OpIzyFZnICOcrzjx521vlSZW6iamCjel0tMk8u7MS9Xhg6Dxbsb2cPRbOtHD39c2\n" +
    "5TkyEPMFDG3Kz8JM7DAC7y/fV8laWVn9JaB3B8Mk6vObacc1+LQq6kF6ZEFnzO1J\n" +
    "VNphoj//svo77opuKOxOToDJxDKgQQD8Y/7dA1BSKCB+J+qG/TiRI29mC2saFJfI\n" +
    "8WqTsbBIZZSnqe+BD4WzTCxbmPocbZl8TgoX0mTCMQ+TqaihDQw68s6mVCUkF4i7\n" +
    "DdrO+4ECgYEA5uZCAWPWA3FUGzmCvVRvGzXTFrjLbmn8HbVYyJ9TFsjC9KhZScsR\n" +
    "xywddVN7aoYzE0XPY938an1PVtr9ATbkrPWuXSe5wEvKGL/JgEIob54kCWBIgT57\n" +
    "4hOf+BONB052D44puM/mHn8ZcV6ylIeZq79PoyNr8GPb/5R8n5lrVlkCgYEAw4di\n" +
    "6gaYETYkxBZUD3QZqITVeBF4O4hOCxpptfqk8FtdEk2bC/WQhXXkTGy8Hdoc20q6\n" +
    "f0t/O39sCqyYdAv4SoXyvNdFBHWi1g6bcI486Gp9FwzQYQQiB63WRMfi3ufxQY5F\n" +
    "NwiUkOO6q51apIFq0aJXcoZO5o/fGV56LOEv+R0CgYAUSyiB9sRYiR1bRzK2cTVS\n" +
    "ruhelt9KVQZTlhy3hUlIN1zrI+C1G6P0XWw5Y5z1P9Y9W2Ve4aPNuDXA7H5QHQL8\n" +
    "MJuilFs/C2o3wqNzIl1rcfq42D2HHnbE5/SnWRCME9lMhLImDB+tjn4t+KS5aTGY\n" +
    "ZrgZHoPeHOi5DdPmMxW8AQKBgQCjUzitkVp+rgJiBOCsk+dG28ZQaA9Ncxr1rVd1\n" +
    "2erilv6UZlzHzZSt1n8f04gDS4jlKHPGFvMtaM9/zxH9hW4eGetcEFknU3f0Y/k1\n" +
    "OKrp3OGmWl7JWyFt1qhvhaQdXBMrFkL8qF8o9ACej28CkNQATiHLmSLY9n59+2wE\n" +
    "hwmChQKBgQCimTReHLRCiLyRQ9/xD+eFkiwEFv2AxkzTBh/BFtpNZYytZ0P9q1xf\n" +
    "J4DLJRGA9oXTZIYCQNXvLX2Yuasu3RgWbUxHx4JcaVyJvsjql105+tHcM/lcp0SD\n" +
    "g7ZKhBOXvCfNJIrTzbM9g73L1MksJqE42+nuuEdwkA2NUY6vSYa65A==\n" +
    "-----END RSA PRIVATE KEY-----";

describe("SaySimple Authorizer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it("should be defined", () => {
        expect(SaySimpleAuthorization).toBeDefined();
    });

    it("should set an authorization header with a bearer token", () => {
        const ssa = new SaySimpleAuthorization("", "", "");

        expect(ssa.needsAuthorizationHeader()).toBeTrue();
        expect(ssa.getAuthorizationType()).toEqual("Bearer");
    });

    it("should raise an error when no token or secret is not given", () => {
        const ssa = new SaySimpleAuthorization("", "", "");

        expect(ssa.authenticate()).rejects.toEqual(new Error("No api key and/or private key given."));
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
                tokenType   : "Bearer",
                accessToken : expectedAccessToken,
                expiresIn   : new Date(Date.now() + 90000) // 15 minutes
            }
        };

        jest.spyOn(axios, "post").mockResolvedValue(expectedAxiosResponse);
        const ssa = new SaySimpleAuthorization(
            "https://authorize.me",
            "apikey",
            privateKey
        );

        const result = await ssa.getAccessToken();
        expect(result).toEqual(expectedAccessToken);
    });

    it("should re-authenticate if no refresh token is available", async () => {
        const expectedAccessToken = "accessTokenVeryC00l!156315";
        const fifteenMinutesFromNow = new Date(Date.now() + 90000);
        const expectedAxiosResponse = {
            data: {
                tokenType   : "Bearer",
                accessToken : expectedAccessToken,
                expiresIn   : fifteenMinutesFromNow // 15 minutes
            }
        };

        jest.spyOn(axios, "post").mockResolvedValue(expectedAxiosResponse);
        const ssa = new SaySimpleAuthorization(
            "https://authorize.me",
            "apiKey",
            privateKey
        );
        jest.spyOn(ssa, "authenticate");
        jest.spyOn(ssa, "isAccessTokenValid");

        await ssa.getAccessToken();

        jest.setSystemTime(fifteenMinutesFromNow);

        await ssa.getAccessToken();

        expect(ssa.isAccessTokenValid).toBeCalledTimes(1);
        expect(ssa.authenticate).toBeCalledTimes(2);
    });
});
