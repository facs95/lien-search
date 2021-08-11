import { Service } from "./Service";

export interface LandSurvey extends Service {
    lenderCertification: string;
    buyerCertification: string;
    underwriterCertification: string;
    titleCompany: string;
    hardCopy: boolean;
}

export enum LandSurveyEnum {
    lenderCertification = "Lender Certification",
    buyerCertification = "Buyer Certification",
    underwriterCertification = "Underwriter Certification",
    titleCompany = "Title Company",
    hardCopy = "Request Hard Copy",
}
