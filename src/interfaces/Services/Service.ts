export enum ServiceEnum {
    lienSearch = "Lien Search",
    estoppelLetter = "Estoppel Letter",
    landSurvey = "Land Survey",
    permitResolution = "Permit Resolution",
}

export enum ServiceStatusEnum {
    newOrder = "New Order",
    hold = "Hold",
    informationRequested = "Information Requested",
    informationReceived = "Information Received", // Esto deberia sobrar
    pendingPayment = "Pending Payment",
    cancelled = "Cancelled",
    finalized = "Finalized",
}

export type serviceStatusKeys = keyof typeof ServiceStatusEnum;
export type serviceEnumKeys = keyof typeof ServiceEnum;

export interface Service {
    id: string
    orderId: string
    isActive: boolean;
    status: serviceStatusKeys;
    assignee: string;
    estimatedDelivery: string;
    taskList: Task[];
}

//ServiceTypes
export type ServiceTypes = {
    [key in serviceEnumKeys]: string
}

//Tasks
export type taskStatusTypes = "complete" | "incomplete";

export interface Task {
    description: string;
    status: taskStatusTypes;
}
