import React from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface Props {
    content: JSX.Element;
    isLast?: boolean;
    isFirst?: boolean;
    onNext: () => void;
    onCancel?: () => void;
    disabled?: boolean;
    hideActions?: boolean;
}

export const CreateWrapper = ({
    content,
    isLast,
    isFirst,
    onNext,
    onCancel,
    disabled = false,
    hideActions,
}: Props) => {
    const classes = useStyles();
    const history = useHistory();

    const onBack = () => history.goBack();

    return (
        <Grid container direction="column" className={classes.container}>
            <Grid item>{content}</Grid>
            {!hideActions && (
                <Grid
                    item
                    container
                    justifyContent="flex-end"
                    className={classes.buttons}
                >
                    <Grid item>
                        <Button
                            onClick={onCancel || onBack}
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            {isFirst ? "Cancel" : "Back"}
                        </Button>
                    </Grid>
                    <Grid item style={{ marginLeft: "16px" }}>
                        <Button
                            onClick={onNext}
                            disabled={disabled}
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            {isLast ? "Finish" : "Next"}
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(0, 3),
    },
    buttons: {
        marginBottom: theme.spacing(2),
    },
}));
