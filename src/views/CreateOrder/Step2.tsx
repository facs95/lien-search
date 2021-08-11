import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { AddressForm } from "../../components/OrderForms/AddressForm";
import { OrderInfoForm } from "../../components/OrderForms/OrderInfoForm";
import { Address } from "../../interfaces/Address";
import { OrderData } from "../../interfaces/Order";
import { CreateWrapper } from "../../wrappers/CreateWrapper";
import { ServicesRequested } from "./CreateOrder";

interface Props {
    services: ServicesRequested;
    address: Address;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
    orderData: OrderData;
    setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
}

export const Step2 = ({
    services,
    address,
    setAddress,
    orderData,
    setOrderData,
}: Props) => {
    const [isAddressReady, setIsAddressReady] = useState(false);
    const [isOrderDataReady, setIsOrderDataReady] = useState(false);
    const classes = useStyles();

    const onSubmit = () => {
        console.log("here");
    };

    const isReady = isAddressReady;
    const content = (
        <Grid container className={classes.marginBottom} spacing={2}>
            <Grid item container direction="column" md={12} lg={6}>
                <Grid item className={classes.marginBottom}>
                    <Typography variant="h5">Property Address</Typography>
                    <Divider />
                </Grid>
                <Grid item>
                    <AddressForm
                        {...{ setIsAddressReady }}
                        {...{ address }}
                        {...{ setAddress }}
                    />
                </Grid>
            </Grid>
            <Grid item container direction="column" md={12} lg={6}>
                <Grid item className={classes.marginBottom}>
                    <Typography variant="h5">Order Information</Typography>
                    <Divider />
                </Grid>
                <Grid item>
                    <OrderInfoForm
                        {...{ orderData }}
                        {...{ setOrderData }}
                        {...{ setIsOrderDataReady }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
    return (
        <CreateWrapper {...{ content }} onNext={onSubmit} disabled={!isReady} />
    );
};

const useStyles = makeStyles((theme) => ({
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
}));
