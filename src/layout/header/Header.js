import classes from './Header.module.css';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBoltLightning,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = () => {
    authCtx.logout();
    history.push('/auth');
  };

  return (
    <header className={classes.header}>
      <p className={classes.header__heading}>
        <FontAwesomeIcon icon={faBoltLightning} />
      </p>
      <nav className={classes.header__nav}>
        <ul>
          <li>
            <NavLink
              className={classes.header__link}
              exact
              activeClassName={classes.active}
              to="/subjects"
            >
              Subjects
            </NavLink>
          </li>

          <li>
            <button onClick={logoutHandler} className={classes.header__btn}>
              Logout
            </button>
          </li>

          <li>
            <NavLink
              activeClassName={classes['header__link--active']}
              className={classes.header__link}
              to="/profile"
            >
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </li>

          <li>
            <NavLink
              activeClassName={classes['header__link--active']}
              className={classes.header__link}
              to="/security"
            >
              <FontAwesomeIcon icon={faGear} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
