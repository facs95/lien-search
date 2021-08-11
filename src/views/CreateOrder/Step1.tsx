import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Grid,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import {
    ServiceEnum,
    serviceEnumKeys,
} from "../../interfaces/Services/Service";
import { CreateWrapper } from "../../wrappers/CreateWrapper";
import { ServicesRequested } from "./CreateOrder";

interface Props {
    services: ServicesRequested;
    setServices: React.Dispatch<React.SetStateAction<ServicesRequested>>;
    basePath: string;
}

export const Step1 = ({ services, setServices, basePath }: Props) => {
    const history = useHistory();

    const handleDataChange = (type: keyof ServicesRequested) => {
        setServices((c) => {
            let curr = { ...c };
            curr[type] = !c[type];
            return curr;
        });
    };

    const getServiceBullets = (services: ServicesRequested) => {
        const serviceList: JSX.Element[] = [];
        for (const [service, value] of Object.entries(services)) {
            const label = ServiceEnum[service as serviceEnumKeys];
            serviceList.push(
                <FormControlLabel
                    key={service}
                    control={
                        <Checkbox
                            checked={value}
                            onChange={() =>
                                handleDataChange(service as serviceEnumKeys)
                            }
                            name={label}
                        />
                    }
                    label={label}
                />
            );
        }
        return serviceList;
    };

    const content = (
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item>
                <Typography variant="h6">Select Type of Order</Typography>
            </Grid>
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        You can select multiple order types for the same
                        property:
                    </FormLabel>
                    <FormGroup>{getServiceBullets(services)}</FormGroup>
                    <FormHelperText>
                        This can be updated after the order is created
                    </FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    );

    const onNext = () => {
        history.push(`${basePath}/2`);
    };

    return (
        <CreateWrapper
            disabled={!Object.keys(services).find((service) => service)}
            isFirst
            {...{ content }}
            {...{ onNext }}
        />
    );
};
