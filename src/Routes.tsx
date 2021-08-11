import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { CreateAccount } from "./views/CreateAccount";
import { CreateOrder } from "./views/CreateOrder/CreateOrder";
import { ForgotPassword } from "./views/ForgotPassword";
import { Login } from "./views/Login";
import { Orders } from "./views/Orders/Orders";
import { AppWrapper } from "./wrappers/AppWrapper";
import { AuthWrapper } from "./wrappers/AuthWrapper";

const authWrap = (component: JSX.Element): JSX.Element => (
    <AuthWrapper>{component}</AuthWrapper>
);

const appWrap = (component: JSX.Element): JSX.Element => (
    <AppWrapper>{component}</AppWrapper>
);

export interface RouterParams {
    id: string;
}

export const Routes: React.FC = () => {
    const currentUser = useContext(UserContext);

    if (currentUser?.uid) {
        return (
            <Switch>
                <Route exact path="/" render={() => appWrap(<Orders />)} />
                <Route
                    exact
                    path="/create-order/:step"
                    render={() => appWrap(<CreateOrder />)}
                />
                <Redirect to="/" />
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route exact path="/" render={() => authWrap(<Login />)} />
                <Route
                    exact
                    path="/create-account"
                    render={() => authWrap(<CreateAccount />)}
                />
                <Route
                    exact
                    path="/forgot-password"
                    render={() => authWrap(<ForgotPassword />)}
                />
                <Redirect to="/" />
            </Switch>
        );
    }
};
