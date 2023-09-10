

import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logo } from '../assets/img/Img';
import { useLocation, NavLink, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userActions';
import { useEffect } from 'react';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //lay account tu userReducer
  const user = useSelector(state => state.user.account)
  const handleLogOut = () => {
    dispatch(handleLogoutRedux());
  }

  useEffect(() => {
    // truong hop login that bai
    if (user && user.auth === false && location.pathname !== '/login') {
      navigate('/user');
      toast.success('Log out success')
    }
  }, [user])

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className='d-flex align-items-center ' href="">
            <img
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            User App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav " >
            {(user && user.auth || location.pathname === '/user') &&
              <>
                <Nav className='me-auto' activeKey={location.pathname}>
                  {/* <NavLink className='nav-link' to='/'>Home</NavLink> */}
                  <NavLink className='nav-link' to='/user'>Manager user</NavLink>
                </Nav>
                <Nav className='d-flex align-items-center gap-4'>
                  <div>{user.email}</div>
                  <NavDropdown title="Setting"
                    id="basic-nav-dropdown">
                    {user && user.auth === true
                      ?
                      <NavDropdown.Item >
                        <NavLink onClick={() => handleLogOut()}
                        >LogOut</NavLink>
                      </NavDropdown.Item>
                      :
                      <NavDropdown.Item >
                        <NavLink to='/login'>LogIn</NavLink>
                      </NavDropdown.Item>
                    }
                  </NavDropdown>
                </Nav>
              </>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

export default Header