import React, { useEffect } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { OrderData, OrderDataEnum } from "../../interfaces/Order";
import { CustomInput } from "./CustomInput";

interface Props {
    orderData: OrderData;
    setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
    setIsOrderDataReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const inputList: InputList[] = [
    {
        label: OrderDataEnum["orderNumber"],
        key: "orderNumber",
        md: 4,
        xs: 12,
    },
    {
        label: OrderDataEnum["folio"],
        key: "folio",
        isNumber: true,
        md: 4,
        xs: 12,
    },
    {
        label: OrderDataEnum["legalDescription"],
        key: "legalDescription",
        md: 4,
        xs: 12,
    },
    {
        label: OrderDataEnum["seller"],
        key: "seller",
        md: 3,
        xs: 12,
    },
    {
        label: OrderDataEnum["buyer"],
        key: "buyer",
        md: 3,
        xs: 12,
    },
    {
        label: OrderDataEnum["listingAgent"],
        key: "listingAgent",
        isNotRequired: true,
        md: 3,
        xs: 12,
    },
    {
        label: OrderDataEnum["listingAgentPhone"],
        key: "listingAgentPhone",
        isNotRequired: true,
        isNumber: true,
        md: 3,
        xs: 12,
    },
    {
        label: OrderDataEnum["specialInstructions"],
        key: "specialInstructions",
        isNotRequired: true,
        md: 12,
        xs: 12,
    },
];

interface InputList {
    label: string;
    key: keyof typeof OrderDataEnum;
    isNotRequired?: boolean;
    xs?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    md?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    isNumber?: boolean;
}

export const OrderInfoForm = ({
    orderData,
    setOrderData,
    setIsOrderDataReady,
}: Props) => {
    useEffect(() => {
        const isReady = inputList.some(
            (item) => !item.isNotRequired && !orderData[item.key]
        );
        setIsOrderDataReady(!isReady);
    }, [orderData, setIsOrderDataReady]);

    return (
        <Grid item container spacing={2}>
            {inputList.map((item, index) => (
                <Grid key={`data-${index}`} item xs={item.xs} md={item.md}>
                    <CustomInput
                        name={item.key}
                        isNotRequired={item.isNotRequired}
                        value={orderData[item.key] ?? ""}
                        setter={setOrderData}
                        label={item.label}
                    />
                </Grid>
            ))}
            <Grid item xs={12} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        fullWidth
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        inputVariant="outlined"
                        label={"Needed Date"}
                        size="small"
                        value={orderData.neededDate}
                        onChange={(e) => {
                            const newDate = e?.toLocaleDateString();
                            console.log(newDate);
                            setOrderData((c) => {
                                let n = { ...c };
                                n.neededDate = newDate ?? "";
                                return n;
                            });
                        }}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        fullWidth
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        size="small"
                        id="date-picker-inline"
                        inputVariant="outlined"
                        label={"Closing Date"}
                        value={orderData.closingDate}
                        onChange={(e) => {
                            const newDate = e?.toLocaleDateString();
                            console.log(newDate);
                            setOrderData((c) => {
                                let n = { ...c };
                                n.closingDate = newDate ?? "";
                                return n;
                            });
                        }}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
        </Grid>
    );
};
