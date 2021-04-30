import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../context/userContext';
// import './Header.css';

const styles = {
  main: {
    width: '100%',
    backgroundColor: 'black',
    position: 'fixed',
    zIndex: '1',
    top: '0',
    height: '50px',
  },
  root: {
    display: 'flex',
    height: '50px',
    width: '90%',
    margin: 'auto',
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    padding: '10px 20px 5px 20px',
  },
  loginLinks: {
    color: 'white',
    padding: '10px 10px 0 10px',
    fontWeight: '500',
    fontSize: '18px',
  },
  routesDropDown: {
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
  },
};

const Header = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  console.log(state, 'context state');

  useEffect(() => {
    const customerData = [{
      email: "abc@abc.com",
      firstName: "Rohith",
      lastName: "Surya",
      password: "qwerty",
      userType: "Male"
    }];
    sessionStorage.setItem('customer', JSON.stringify(customerData));
  }, []);

  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/sign-in');
  };

  return (
    <div style={styles.main}>
      <div style={styles.root}>
        <Link to='/'>
          <h2 style={styles.title}>HandelX</h2>
        </Link>
        <div style={{ display: 'flex' }}>
          {state.isAuthenticated ? (
            <>
              <h3
                style={{ ...styles.loginLinks }}
                title={state.userDetails?.email}
              >
                Welcome, {state.userDetails?.firstName}
              </h3>
              <h3
                style={{ ...styles.loginLinks, cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </h3>
            </>
          ) : (
            <>
              <Link
                to='/sign-in'
                style={{ ...styles.loginLinks, cursor: 'pointer' }}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
