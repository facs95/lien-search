import { Box, Button, CircularProgress, Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import algoliasearch from "algoliasearch";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ALGOLIA_CONFIG } from "../../config";
import { UserContext } from "../../context/UserContext";
import { Order } from "../../interfaces/Order";
import { OrdersTable } from "./OrdersTable";

export const Orders = () => {
    const user = useContext(UserContext);
    const history = useHistory();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [searchQuery, setSearchQuery] = useState("");

    const getOrders = useCallback(async () => {
        const searchClient = algoliasearch(
            ALGOLIA_CONFIG.appId,
            ALGOLIA_CONFIG.apiKey
        );
        const index = searchClient.initIndex("orders");
        let filterArr: Array<string[]> = [];

        if (user && !user?.admin) {
            filterArr = [[`orgId:${user.orgId}`]];
        }

        // filterArr = generateFilterQuery(filters, filterArr);
        index
            .search(searchQuery, {
                facetFilters: filterArr,
                hitsPerPage: rowsPerPage,
                page,
            })
            .then(({ hits, nbHits }) => {
                setTotalOrders(nbHits); // This will set the total orders for the respective filter
                setOrders(hits as Order[]);
                setApiError(false);
            })
            .catch(() => setApiError(true))
            .finally(() => {
                setLoading(false);
            });
    }, [user, searchQuery, page, rowsPerPage]);

    const onRefresh = () => {
        getOrders();
    };

    useEffect(() => {
        getOrders();
    }, [getOrders]);

    if (loading) return <CircularProgress />;

    if (apiError)
        return (
            <Box
                width="100%"
                alignItems="center"
                display="flex"
                justifyContent="center"
                height="100%"
            >
                <Alert
                    severity="error"
                    action={
                        <Button
                            onClick={onRefresh}
                            color="inherit"
                            size="small"
                        >
                            Refresh
                        </Button>
                    }
                >
                    <AlertTitle>Error</AlertTitle>
                    We encountered an error, please try again later
                </Alert>
            </Box>
        );

    return (
        <Grid container direction="column">
            <Grid item alignItems="flex-end">
                <Button
                    onClick={() => history.push("/create-order/1")}
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    New Order
                </Button>
            </Grid>
            <Grid item>
                <OrdersTable
                    {...{ orders }}
                    {...{ page }}
                    {...{ totalOrders }}
                    {...{ rowsPerPage }}
                    {...{ setRowsPerPage }}
                    {...{ setPage }}
                />
            </Grid>
        </Grid>
    );
};
