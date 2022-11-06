import React, {useEffect, useState} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"

import {Button, Container, Nav, Navbar, Form, Dropdown} from "react-bootstrap"
import {
    FaBars
} from "react-icons/fa"

import {useSelector, useDispatch} from "react-redux"

import {logout, reset as authReset} from "../features/auth/authSlice"
import {reset as favReset} from "../features/favourite/favouriteSlice"
import {reset as multerReset} from "../features/multer/multerSlice"
import {reset as userReset} from "../features/user/userSlice"
import {reset as recipeReset} from "../features/recipe/recipeSlice"



import {toast} from "react-toastify"
import {FiBox, FiHeart, FiLogOut, FiSearch, FiUser} from "react-icons/fi"

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]))
        } catch (e) {
            return null
        }
    };

    const AuthVerify = (props) => {
        let location = useLocation()

        useEffect(() => {
            const user = JSON.parse(localStorage.getItem("user"))

            if (user) {
                const decodedJwt = parseJwt(user.token)

                if (decodedJwt.exp * 1000 < Date.now()) {
                    toast.warn('Login token expired')
                    onLogout()
                }
            }
        }, [location, props])
    }

    AuthVerify()

    const [menu, setMenu] = useState(false);
    const menuToggle = () => {
        setMenu(!menu)
        console.log("hidden: " + menu)
    }

    const onLogout = () => {
        toast.warn(`Logged out of ${JSON.parse(localStorage.getItem('user'))['name']}`)
        dispatch(authReset())
        dispatch(favReset())
        dispatch(userReset())
        dispatch(multerReset())
        navigate('/')
        setMenu(true)
        dispatch(logout())
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className="p-4 sticky-top mb-3 mb-sm-5">
                <Container>
                    <Link to="/" className="flex-1">
                        <Navbar.Brand href="/" className="flex-1">
                            <img
                                src="https://img.icons8.com/doodle/96/cooking-book.png"
                                width="32"
                                height="32"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                            <span className="fw-bold">CentralRecipe</span>
                        </Navbar.Brand>
                    </Link>
                    <div className="flex-1 justify-content-center d-none d-lg-block">
                        <svg
                            className="position-absolute m-auto top-0 bottom-0 ms-2 h-25"
                            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="30" height="30"
                            viewBox="0 0 30 30">
                            <path
                                d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/>
                        </svg>
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Search recipes, users"
                            className="ps-4-5 pt-2 pb-2 rounded-custom"
                        />
                    </div>
                    <Nav className="ms-auto flex-1 justify-content-end">
                        {user ? (
                            <>
                                <Dropdown className="d-none d-lg-block">
                                    <Dropdown.Toggle variant="black" className="ps-1" id="dropdown-basic">
                                        <img src={`http://localhost:8000/api/upload/${user.picture}`} alt={user.name}
                                             width="32" height="32" className="rounded-circle me-1"/><FaBars/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end" className="fs-6">
                                        <Link to="/"><Dropdown.Item href="/"><FiSearch/> Browse</Dropdown.Item></Link>
                                        <Dropdown.Divider/>
                                        <Link to="/dashboard"><Dropdown.Item
                                            href="/dashboard"><FiBox/> Dashboard</Dropdown.Item></Link>
                                        <Link to="/dashboard/favourites"><Dropdown.Item
                                            href="/dashboard/favourites"><FiHeart/> Favourites</Dropdown.Item></Link>
                                        <Link to="/dashboard/profile"><Dropdown.Item
                                            href="/dashboard/profile"><FiUser/> Profile</Dropdown.Item></Link>
                                        <Dropdown.Divider/>
                                        <Dropdown.Item href="" onClick={onLogout} className="fw-bold fw-700"
                                                       style={{color: '#e55039'}}><FiLogOut/> Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                <Link to="/login"><Nav.Link href="/login" className="btn d-none d-lg-inline-block">Login</Nav.Link></Link>
                                <Link to="/register"><Nav.Link href="/register" className="btn btn-black d-none d-lg-inline-block">Sign up</Nav.Link></Link>
                            </>
                        )}
                    </Nav>
                    {user ? (
                        <>
                            <Button onClick={menuToggle} variant="black" className="ps-1 d-block d-lg-none">
                                <img src={`http://localhost:8000/api/upload/${user.picture}`} alt={user.name} width="32" height="32"
                                     className="rounded-circle me-1"/><FaBars/>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="light" className="d-block d-lg-none me-auto" onClick={menuToggle}><FaBars/></Button>
                        </>
                    )}
                </Container>
                <div className={"d-lg-none w-100 menu " + menu.toString()}>
                    <Container>
                        <Nav className="ms-auto flex-column d-block">
                            {user ? (
                                <>

                                    <Link to="/"><Nav.Link href="/" className="d-block text-start"><FiSearch/> Browse</Nav.Link></Link>
                                    <Link to="/dashboard"><Nav.Link href="/dashboard" className="d-block text-start"><FiBox/> Dashboard</Nav.Link></Link>
                                    <Link to="/dashboard/favourites"><Nav.Link href="/dashboard/favourites" className="d-block text-start"><FiHeart/> Favourites</Nav.Link></Link>
                                    <Link to="/dashboard/profile"><Nav.Link href="/dashboard/profile" className="d-block text-start"><FiUser/> Profile</Nav.Link></Link>
                                    <Nav.Link href="" onClick={onLogout} className="fw-bold fw-700" style={{color: '#e55039'}}><FiLogOut/> Logout</Nav.Link>


                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/login" className="btn d-inline-block">Login</Nav.Link><br/>
                                    <Nav.Link href="/register" className="btn btn-black d-inline-block">Signup</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Container>
                </div>
            </Navbar>
        </>
    )
}


export default Header