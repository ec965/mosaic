import React, {useContext} from 'react';
import {NavBar, NavGroup, NavLogo, NavItem} from '../components/navbar';
import {Logout} from '../auth/components';
import {Link} from 'react-router-dom';
import {UserContext} from './index';

export const UserNav = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  return(
    <NavBar>
      <NavLogo>
        <Link to='/home'>
          <h2>User-Land</h2>
        </Link>
      </NavLogo>
      <NavGroup>
        <NavItem>
          <Link to={`/generator`}>
            <h4>Generator</h4>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={`/profile/${currentUser}`}>
            <h4>Profile</h4>
          </Link>
        </NavItem>
        <NavItem>
          <div>
            <Logout>
              Logout
            </Logout>
          </div>
        </NavItem>
      </NavGroup>
    </NavBar>
  );
}
export default UserNav;