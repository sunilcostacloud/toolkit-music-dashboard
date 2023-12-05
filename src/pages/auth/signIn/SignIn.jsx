import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  loginData,
  resetLoginAction,
  loginIsLoading,
  loginIsError,
  loginError,
  loginIsSuccess,
} from "../../../redux/features/auth/authSlice";
import { setCredentials } from "../../../redux/features/auth/authSlice";

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = useSelector(loginData);
  const isLoading = useSelector(loginIsLoading);
  const isError = useSelector(loginIsError);
  const error = useSelector(loginError);
  const isSuccess = useSelector(loginIsSuccess);

  const handleSubmit = (e) => {
    e.preventDefault();
    // login({ email, password });
    dispatch(loginAction({ email, password }));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      // console.log("data", data?.accessToken);
      setEmail("");
      setPassword("");
      dispatch(resetLoginAction());
      history.push("/");
    } else if (isError) {
      alert(error?.data?.message);
      dispatch(resetLoginAction());
    }
  }, [isSuccess, isError]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <div>Loading ...</div> : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/auth/signup" style={{ color: "#1976d2" }}>
                Don not have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
