export interface Address {
    address1: string;
    address2?: string;
    unit?: string;
    city: string;
    state: string;
    zipCode: string;
}

export enum AddressEnum {
    address1 = "Address 1",
    address2 = "Address 2",
    unit = "Unit",
    city = "City",
    state = "State",
    zipCode = "Zip Code",
}

export const blankAddress: Address = {
    address1: "",
    address2: "",
    unit: "",
    city: "",
    state: "",
    zipCode: "",
};