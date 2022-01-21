import { useContext } from "react";
import { Route, Redirect } from "react-router";
import AuthContext from "./context";

const PrivateRoute = props => {
  const { isLogged } = useContext(AuthContext);
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
