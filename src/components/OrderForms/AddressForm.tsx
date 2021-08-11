import React, { useEffect } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import MaterialAutoCompletePlaces from "../MaterialAutoCompletePlaces";
import { CustomInput } from "./CustomInput";
import { Address, AddressEnum } from "../../interfaces/Address";

interface Props {
    address: Address;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
    setIsAddressReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const inputList: InputList[] = [
    {
        label: AddressEnum["address1"],
        key: "address1",
        title: "street-address",
        xs: 12,
    },
    {
        label: AddressEnum["unit"],
        key: "unit",
        title: "unit",
        isNotRequired: true,
        md: 6,
        xs: 12,
    },
    {
        label: AddressEnum["city"],
        key: "city",
        title: "address-level2",
        md: 6,
        xs: 12,
    },
    {
        label: AddressEnum["state"],
        key: "state",
        title: "address-level1",
        md: 6,
        xs: 12,
    },
    {
        label: AddressEnum["zipCode"],
        key: "zipCode",
        title: "postal-code",
        md: 6,
        xs: 12,
    },
];

interface InputList {
    label: string;
    key: keyof Address;
    isNotRequired?: boolean;
    title?: string;
    xs?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    md?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    isNumber?: boolean;
}

export const AddressForm = ({
    address,
    setAddress,
    setIsAddressReady,
}: Props) => {
    useEffect(() => {
        const isReady = inputList.some(
            (item) => !item.isNotRequired && !address[item.key]
        );
        setIsAddressReady(!isReady);
    }, [address, setIsAddressReady]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <MaterialAutoCompletePlaces {...{ setAddress }} />
            </Grid>
            <Grid item container spacing={2}>
                {inputList.map((item, index) => (
                    <Grid key={`data-${index}`} item xs={item.xs} md={item.md}>
                        <CustomInput
                            name={item.key}
                            isNotRequired={item.isNotRequired}
                            value={address[item.key] ?? ""}
                            setter={setAddress}
                            label={item.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
