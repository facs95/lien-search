import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "./initFirebase";
import "./App.css";
import { User } from "./interfaces/User";
import { UserContext } from "./context/UserContext";
import { createBrowserHistory } from "history";
import { Switch, Router } from "react-router-dom";
import { Routes } from "./Routes";
import { createTheme, ThemeProvider } from "@material-ui/core";

const history = createBrowserHistory();

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff200",
        },
        secondary: {
            main: "#e32c2c",
        },
    },
    typography: {
        fontSize: 13,
    },
    spacing: 6,
    overrides: {
        MuiButton: {
            root: {
                height: 40,
            },
        },
        MuiFormLabel: {
            root: {
                "&$focused": {
                    borderColor: "black",
                    color: "black",
                },
                color: "black",
            },
        },
        MuiFormHelperText: {
            root: {
                "&$focused": {
                    borderColor: "black",
                    color: "black",
                },
                color: "black",
            },
        },
        MuiTextField: {
            root: {
                "&.Mui-focused": {
                    borderColor: "green",
                },
                "&$focused": {
                    borderColor: "black",
                    color: "black",
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                "&:focus fieldset": {
                    borderColor: "black",
                },
                "&:hover fieldset": {
                    borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "black !important",
                },
            },
        },
        MuiInputBase: {
            root: {
                "&$focused": {
                    borderColor: "black !important",
                    color: "black",
                },
            },
        },
    },
});

function App() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const db = firebase.firestore();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdTokenResult();
                    let userDoc;
                    if (token.claims.admin) {
                        userDoc = await db
                            .collection("employees")
                            .doc(user.uid)
                            .get();
                    } else {
                        userDoc = await db
                            .collection("users")
                            .doc(user.uid)
                            .get();
                    }
                    let userData;
                    if (userDoc.exists) {
                        userData = userDoc.data();
                    }
                    setCurrentUser({
                        admin: token.claims.admin ?? false,
                        orgId: userData?.orgId ?? "",
                        name: userData?.name ?? "",
                        phoneNumber: userData?.phoneNumber ?? "",
                        email: user.email || "",
                        uid: user.uid || "",
                    });
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setCurrentUser(null);
                setLoading(false);
            }
        });
    }, [db]);

    if (loading) return <></>;

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={currentUser}>
                <Router history={history}>
                    <Switch>
                        <Routes />
                    </Switch>
                </Router>
            </UserContext.Provider>
        </ThemeProvider>
    );
}

export default App;
