import { AuthData } from "./authData";
import { AuthOptions } from "./authOptions";

export type AuthService = {
    generateAuth: (data: AuthData, options: AuthOptions) => string;
    verifyAuth: (credential: string, secret: string) => AuthData;
};
