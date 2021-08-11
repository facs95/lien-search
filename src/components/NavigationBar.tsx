import { Breadcrumbs, Grid, Link, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { RouterParams } from "../Routes";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

export const NavigationBar = () => {
    const { id } = useParams<RouterParams>();

    const classes = useStyles();

    const history = useHistory();

    return (
        <Grid container justify="space-between" alignItems="center">
            <Grid item>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        color="inherit"
                        onClick={() => history.push("/")}
                        className={classes.pointer}
                    >
                        All
                    </Link>
                    {id && (
                        <Link color="inherit" className={classes.link}>
                            <LibraryBooksIcon className={classes.icon} />
                        </Link>
                    )}
                </Breadcrumbs>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    pointer: {
        cursor: "pointer",
    },
    link: {
        display: "flex",
    },
    icon: {
        marginRight: theme.spacing(1),
    },
}));
