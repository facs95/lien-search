export interface UserData {
    email: string;
    name: string;
    orgId: string;
    phoneNumber: string;
}

export interface User extends UserData {
    uid: string;
    admin: boolean;
}