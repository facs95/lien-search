import { Service } from "./Service";

export interface EstoppelLetter extends Service {
    associations: Associations
}

export type Associations = Array<{ name: string; number: string }>;