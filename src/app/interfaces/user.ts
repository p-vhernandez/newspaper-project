export interface User {
    authorization: string;
    apikey: string;
    expires: Date;
    group: number;
    user: number;
    username: string;
}