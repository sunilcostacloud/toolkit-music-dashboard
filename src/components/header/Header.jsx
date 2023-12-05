import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import {
  logoutAction,
  resetLogoutAction,
  logoutIsLoading,
  logoutIsError,
  logoutError,
  logoutIsSuccess,
} from "../../redux/features/auth/authSlice";

const Header = () => {
  const [username, setUserName] = useState("");
  const dispatch = useDispatch();

  const history = useHistory();

  const { token } = useSelector((state) => state.auth);

  console.log("header", token);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded?.UserInfo?.username);
    }
  }, [token]);

  const isLoading = useSelector(logoutIsLoading);
  const isError = useSelector(logoutIsError);
  const error = useSelector(logoutError);
  const isSuccess = useSelector(logoutIsSuccess);

  useEffect(() => {
    if (isSuccess) {
      history.push("/auth/signin");
      dispatch(resetLogoutAction());
    } else if (isError) {
      alert(JSON.stringify(error.data?.message));
      dispatch(resetLogoutAction());
    }
  }, [isSuccess, history]);

  return (
    <div className={styles.HeaderParent}>
      <div
        style={{
          width: "99%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={styles.heading}>Dashboard</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div>
            <h3 style={{ color: "#ff014f" }}>{username}</h3>
          </div>
          <div>
            {token ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => dispatch(logoutAction())}
                disabled={isLoading}
              >
                {isLoading ? "Logging Out..." : "Logout"}
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => history.push("/auth/signin")}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
