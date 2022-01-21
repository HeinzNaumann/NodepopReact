import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PaginaAnuncios from "./components/anuncios/PaginaAnuncios/PaginaAnuncios";
import PaginaNuevoAnuncio from "./components/anuncios/PaginaNuevoAnuncio/PaginaNuevoAnuncio";
import PaginaAnuncio from "./components/anuncios/PaginaAnuncio";
import { LoginPage, PrivateRoute } from "./components/auth";
import { useState } from "react";
import { logout } from "./components/auth/service";

import { AuthContextProvider } from "./components/auth/context";

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => setIsLogged(true);

  const handleLogout = () => {
    logout().then(() => setIsLogged(false));
  };
  return (
    <Router>
      <AuthContextProvider value={{ isLogged, handleLogout, handleLogin }}>
        <div className='App'>
          <Switch>
            <Route path='/login'>
              {routeProps => <LoginPage {...routeProps} />}
            </Route>
            <PrivateRoute path='/adverts/new' component={PaginaNuevoAnuncio} />
            <PrivateRoute path='/adverts/:Id' component={PaginaAnuncio} />
            <PrivateRoute path='/adverts' component={PaginaAnuncios} />
            <PrivateRoute exact path='/'>
              <Redirect to='/adverts' />
            </PrivateRoute>
            <Route path='/'>
              <div>404 | Not found Page</div>
            </Route>
            <Route>
              <Redirect to='/404' />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
