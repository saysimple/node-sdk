export interface AuthorizationInterface {
    getAuthorizationType(): "Bearer" | "Basic";
    needsAuthorizationHeader(): boolean;
    getAccessToken(): Promise<string> | string
}
