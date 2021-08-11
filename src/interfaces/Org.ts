export interface Org extends OrgData {
    id: string;
}

export interface OrgData {
    name: string;
    users: string[];
    orderCount: number;
    phoneNumber: string;
    address: string;
}