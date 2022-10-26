import React from "react";
import {Link, useNavigate} from "react-router-dom";

import LogoIcon from '../resources/img/icons8-cooking-book-90.png'
import {InputGroup, Button, Container, Nav, Navbar, Form, Dropdown} from "react-bootstrap";
import {
    FaBoxes,
    FaGlasses,
    FaHeart,
    FaSearch,
    FaSignOutAlt,
    FaUser
} from "react-icons/fa";

import {useSelector, useDispatch} from "react-redux";
import {logout, reset as authReset} from "../features/auth/authSlice";
import {reset as favReset} from "../features/favourite/favouriteSlice"

function Header(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(authReset())
        navigate('/')
        dispatch(favReset())
        navigate('/')
    }

    return(
        <>
            <Navbar bg="light" expand="lg" className="p-3" fixed="top">
                <Container>
                        <Navbar.Brand className="logoIcon fw-700">
                            <Link to='/'>
                                <img
                                    alt=""
                                    src={LogoIcon}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}
                                CentralRecipe
                            </Link>
                        </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="w-50 justify-content-center">
                            <Form className="w-100">
                                <InputGroup className="">
                                    <Form.Control
                                        placeholder="Search recipes, users..."
                                        aria-label="Search"
                                        className="me-1 rounded-custom"
                                    />
                                    <Button type='submit' variant='outline-success' className='rounded-custom position-relative right-0'><FaSearch /></Button>
                                </InputGroup>
                            </Form>
                        </Nav>
                        <Nav className="w-50 justify-content-end pe-0 pe-lg-5">
                            {user ? (
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="rounded-custom">
                                            <FaUser/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>Signed in as {user.name}</Dropdown.Item>
                                            <Dropdown.Item href="/dashboard"><FaBoxes/> Dashboard</Dropdown.Item>
                                            <Dropdown.Item href="/"><FaGlasses/> Browse</Dropdown.Item>
                                            <Dropdown.Item href="/favourite"><FaHeart/> Favourites</Dropdown.Item>
                                            <Dropdown.Item href="/profile"><FaUser/> Profile</Dropdown.Item>
                                            <Dropdown.Divider/>
                                            <Dropdown.Item onClick={onLogout}><FaSignOutAlt/> Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {/*<Button variant={"primary"}>Sign out</Button>*/}
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/login"><Button variant="light rounded-custom">Login</Button></Nav.Link>
                                    <Nav.Link href="/register"><Button variant="success rounded-custom">Sign Up</Button></Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header