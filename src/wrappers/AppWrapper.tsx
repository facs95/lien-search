import React, { useState } from "react";
import { makeStyles, CssBaseline } from "@material-ui/core";

import { LeftNav } from "../components/LeftNav";
import { AppHeader } from "../components/AppHeader/AppHeader";

interface Props {
    children: JSX.Element;
}

export const DRAWER_WIDTH = 240;

export const AppWrapper: React.FC<Props> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <LeftNav {...{ drawerOpen }} {...{ setDrawerOpen }} />
            <div className={classes.container}>
                <AppHeader {...{ setDrawerOpen }} />
                <main className={classes.content}>{children}</main>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
    },
    root: {
        display: "flex",
    },
    bottomMargin: {
        marginBottom: theme.spacing(4),
    },
    container: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2, 5),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
        },
    },
}));
