import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  selectAuthAuthenticated,
  selectAuthUserData,
} from 'redux/auth.selectors';
import { logOutThunk } from 'redux/authReducer';
import css from './Navigation.module.css';

const Navigation = () => {
  const authenticated = useSelector(selectAuthAuthenticated);
  const user = useSelector(selectAuthUserData);
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <div className={css.headerContainer}>
      <header className={css.headerItem}>
        <nav className={css.headerNav}>
          <NavLink to="/" className={css.headerHome}>
            Home
          </NavLink>
          {authenticated ? (
            <>
              <NavLink to="/contacts" className={css.headerContacts}>
                Contacts
              </NavLink>
              <div className={css.contactsItems}>
                <p className={css.contactsInfo}>Welcome, {user.name}</p>
                <button onClick={onLogOut} className={css.contactsButton}>
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={css.headerLogin}>
                Log In (login)
              </NavLink>
              <NavLink to="/register" className={css.headerRegister}>
                Sign Up (registration)
              </NavLink>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navigation;
