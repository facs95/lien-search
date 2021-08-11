import { Address } from "./Address";
import { ServiceTypes } from "./Services/Service";

export interface OrdersStats {
    count: number;
}

export interface OrderData {
    orderNumber: string;
    specialInstructions: string;
    folio: number;
    legalDescription: string;
    requestedBy?: string;
    orgName: string
    requestedByEmail?: string;
    closingDate: string;
    neededDate: string;
    seller: string;
    buyer: string;
    listingAgent?: string;
    listingAgentPhone?: number;
}

export interface CreateOrder extends OrderData {
    orgId: string;
    services: ServiceTypes;
    created_on: number;
    address: Address;
}

export interface Order extends CreateOrder {
    id: string;
    objectID: string; //for algolia
    orderCount: number;
}

export enum OrderDataEnum {
    orderNumber = "Order # / File Name",
    folio = "Folio",
    legalDescription = "Legal Description",
    seller = "Seller",
    buyer = "Buyer",
    listingAgent = "Listing Agent",
    listingAgentPhone = "Listing Agent Phone",
    specialInstructions = "Special Instructions",
}

export enum OrderStatusEnum {
    inProgress = "In Progress",
    finalized = "Finalized",
    cancelled = "Cancelled",
    hold = "Hold",
}

export type orderStatusEnumKeys = keyof typeof OrderStatusEnum;

export const blankOrderData: OrderData = {
    orderNumber: "",
    specialInstructions: "",
    folio: 0,
    orgName: "",
    legalDescription: "",
    closingDate: new Date().toLocaleDateString(),
    neededDate: new Date().toLocaleDateString(),
    seller: "",
    buyer: "",
    listingAgent: "",
    listingAgentPhone: 0,
};
