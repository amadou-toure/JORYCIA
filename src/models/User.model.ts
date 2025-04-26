export interface loginModel {
    email: string;
    password: string;
}
export type UserContextType = {
    user: User | null;
    isLoading: boolean,
    lastFetched: Date | null;
}
export interface User {
    ID :       string,
    FirstName: string,
    LastName:  string,
    Email:     string,
    Password:  string,
    Phone:     string,
    Address:   string,
}