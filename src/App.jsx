import { Route, Switch, useLocation } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import UnAuthorized from "./pages/UnAuthorized";
import Home from "./pages/home/Home";
import Pricing from "./pages/home/Pricing";
import SignIn from "./pages/auth/signIn/SignIn";
import SignUp from "./pages/auth/signUp/SignUp";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import SideMenu from "./components/sidemenu/SideMenu";
import Dashboard from "./pages/music/Dashboard";

const App = () => {
  const { pathname } = useLocation();

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (
      pathname.toLowerCase() == "/auth/signin" ||
      pathname.toLowerCase() == "/auth/signup" ||
      pathname.toLowerCase() == "/unauthorized"
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname]);

  return (
    <>
      {show === true && (
        <div>
          <Header />
        </div>
      )}
      <div style={{ display: show ? "flex" : "block" }}>
        {show === true && (
          <div>
            <SideMenu />
          </div>
        )}
        <div style={{ width: "100%" }}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                // <PersistLogin>
                //   <RequireAuth {...props} allowedRoles={["User"]}>
                <Home />
                //   </RequireAuth>
                // </PersistLogin>
              )}
            />
            <Route
              exact
              path="/pricing"
              render={(props) => (
                // <PersistLogin {...props}>
                //   <RequireAuth
                //     {...props}
                //     allowedRoles={["User", "Creator", "Admin"]}
                //   >
                <Pricing />
                //   </RequireAuth>
                // </PersistLogin>
              )}
            />
            <Route
              exact
              path="/creator"
              render={(props) => (
                // <PersistLogin {...props}>
                //   <RequireAuth {...props} allowedRoles={["Admin"]}>
                <Dashboard />
                //   </RequireAuth>
                // </PersistLogin>
              )}
            />
            <Route exact path="/auth/signin" component={SignIn} />
            <Route exact path="/auth/signup" component={SignUp} />
            <Route exact path="/unauthorized" component={UnAuthorized} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
