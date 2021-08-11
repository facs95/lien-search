import React, { useState } from "react";
import { Redirect, useParams } from "react-router";
import { FullScreenModal } from "../../components/FullScreenModal";
import { Address, blankAddress } from "../../interfaces/Address";
import { blankOrderData, OrderData } from "../../interfaces/Order";
import { serviceEnumKeys } from "../../interfaces/Services/Service";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";

export type ServicesRequested = {
    [key in serviceEnumKeys]: boolean;
};

export const CreateOrder = () => {
    const [address, setAddress] = useState<Address>(blankAddress);
    const [orderData, setOrderData] = useState<OrderData>(blankOrderData);

    const { step, id } = useParams<{ step: string; id: string }>();

    const [services, setServices] = useState<ServicesRequested>({
        lienSearch: false,
        estoppelLetter: false,
        permitResolution: false,
        landSurvey: false,
    });

    const basePath = id ? `/update/${id}` : "/create-order";
    const cancelPath = id ? `/order/${id}` : "/";

    if (!step) return <Redirect to="/" />;

    const stepComponents = [
        {
            label: "Type of Order",
            component: (
                <Step1
                    {...{ services }}
                    {...{ setServices }}
                    {...{ basePath }}
                />
            ),
        },
        {
            label: "Property Information",
            component: (
                <Step2
                    {...{ services }}
                    {...{ setAddress }}
                    {...{ address }}
                    {...{ orderData }}
                    {...{ setOrderData }}
                />
            ),
        },
    ];

    return (
        <FullScreenModal
            activeStep={step}
            toolbarHeader="Create New Order"
            {...{ cancelPath }}
            {...{ stepComponents }}
        />
    );
};
