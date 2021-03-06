import React, { useState, BaseSyntheticEvent } from "react";
import {
    TextField,
    Button,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import PhoneNumber from "awesome-phonenumber";
import { PaperWrapper } from "../components/PaperWrapper";
import { User } from "../interfaces/User";

interface UserCreation extends User {
    confirmPassword: string;
    password: string;
}

export const CreateAccount: React.FC = () => {
    const classes = useStyles();

    const [errorMessage, setErrorMessage] = useState<string>("");

    // const { register, handleSubmit } = useForm<UserCreation>();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const onSubmit = async (
        data: UserCreation,
        e: BaseSyntheticEvent<object, any, any> | undefined
    ) => {
        e && e.preventDefault();
        setLoading(true)
        setErrorMessage("");
        let pn = new PhoneNumber(data.phoneNumber, "US");
        try {
            if (!pn.isValid())
                throw new Error("Please input valid phone number");
            const createUser = firebase.functions().httpsCallable("users-createUser");
            await createUser({
                email: data.email,
                password: data.password,
                name: data.name,
                orgId: data.orgId,
                phoneNumber: pn.getNumber(),
            });
            history.push("/");
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <PaperWrapper>
            <form className={classes.form}>
                <img
                    alt=""
                    className={classes.logo}
                    src={`${process.env.PUBLIC_URL}/logo.png`}
                />
                <Grid
                    container
                    direction="column"
                    alignItems="stretch"
                    spacing={4}
                >
                    <Grid item className={classes.title}>
                        <Typography variant="h5">Create Account</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            type="email"
                            error={!!errorMessage}
                            fullWidth
                            label="Email"
                            variant="outlined"
                            name="email"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="name"
                            error={!!errorMessage}
                            fullWidth
                            label="Name"
                            variant="outlined"
                            name="name"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="phone"
                            error={!!errorMessage}
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            name="phoneNumber"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="id"
                            error={!!errorMessage}
                            fullWidth
                            label="Organization Id"
                            helperText="Id of the organization you belong"
                            variant="outlined"
                            name="orgId"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            error={!!errorMessage}
                            type="password"
                            label="Password"
                            variant="outlined"
                            name="password"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            error={!!errorMessage}
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            name="confirmedPassword"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item container alignItems="center" spacing={1}>
                        <Grid item>
                            <Typography>Already have an account?</Typography>
                        </Grid>
                        <Grid item>
                            <Link to="/">Login</Link>
                        </Grid>
                    </Grid>
                    {errorMessage && (
                        <Grid item>
                            <Typography color="error">
                                {errorMessage}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </form>
        </PaperWrapper>
    );
};

const useStyles = makeStyles(theme => ({
    title: {
        alignSelf: "center",
    },
    logo: {
        height: 70,
        marginBottom: theme.spacing(3),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));
