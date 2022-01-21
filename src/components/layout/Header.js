import { useContext } from "react";
import classNames from "classnames";
import Button from "../common/button";
import AuthContext from "../auth/context";
import { Link, NavLink } from "react-router-dom";
import ConfirmButton from "../common/ConfirmButton";

import { ReactComponent as Icon } from "../../assets/nodepop.svg";
function Header({ className }) {
  const { isLogged, handleLogout } = useContext(AuthContext);
  return (
    <header className={classNames("header", className)}>
      <Link to='/'>
        <div className='header-logo'>
          <Icon width='32' height='32' />
        </div>
      </Link>
      <nav className='header-nav'>
        <NavLink className='myButton2' to='/adverts/new'>
          Nuevo Anuncio{" "}
        </NavLink>
        {isLogged ? (
          <ConfirmButton
            confirmation='Are you sure?'
            className='myButton'
            onConfirm={handleLogout}
          >
            Log Out
          </ConfirmButton>
        ) : (
          <Button
            variant='primary'
            className='header-button'
            as={Link}
            to='/login'
          >
            Log in
          </Button>
        )}
      </nav>
    </header>
  );
}

export default Header;
