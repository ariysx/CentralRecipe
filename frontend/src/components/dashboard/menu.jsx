import {Button, ListGroup} from "react-bootstrap";
import {FiBook, FiBox, FiHeart, FiLogOut, FiPlusCircle, FiUser} from "react-icons/fi";
import React from "react";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {logout, reset as authReset} from "../../features/auth/authSlice";
import {reset as favReset} from "../../features/favourite/favouriteSlice";
import {useNavigate} from "react-router-dom";

export default function DashboardMenu({active}){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = () => {
        toast.warn(`Logged out of ${JSON.parse(localStorage.getItem('user'))['name']}`)
        dispatch(logout())
        dispatch(authReset())
        navigate('/')
        dispatch(favReset())
        navigate('/')
    }

    return (
        <>
            <ListGroup defaultActiveKey={active} className="dashboard-menu sticky-top" style={{top: '7rem'}}>
                <ListGroup.Item action href="/dashboard">
                    <Button variant="dashboard-menu"><FiBox/> Dashboard</Button>
                </ListGroup.Item>
                <ListGroup.Item action href="/dashboard/recipes/new">
                    <Button variant="dashboard-menu"><FiPlusCircle/> Submit Recipe</Button>
                </ListGroup.Item>
                <ListGroup.Item action href="/dashboard/recipes">
                    <Button variant="dashboard-menu"><FiBook/> My Recipes</Button>
                </ListGroup.Item>
                <ListGroup.Item action href="/dashboard/favourites">
                    <Button variant="dashboard-menu"><FiHeart/> Favourites</Button>
                </ListGroup.Item>
                <ListGroup.Item action href="/dashboard/profile">
                    <Button variant="dashboard-menu"><FiUser/> Profile</Button>
                </ListGroup.Item>
                <ListGroup.Item action href="/">
                    <Button variant="dashboard-menu fw-bold" style={{color: '#e55039'}} onClick={onLogout}><FiLogOut/> Logout</Button>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}