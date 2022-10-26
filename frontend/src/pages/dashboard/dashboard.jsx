import React from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {Card, Container, Table} from "react-bootstrap";
import LoadingSpinner from "../../components/loading";
import {FaBook, FaChartBar, FaHeart, FaList, FaPlusCircle, FaUser} from "react-icons/fa";
import * as PropTypes from "prop-types";

function Routes(props) {
    return null;
}

Routes.propTypes = {children: PropTypes.node};

function Dashboard(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading } = useSelector((state) => state.auth)

    useEffect(() => {

        if (!user) {
            navigate('/login')
            toast.error('You\'re not signed in')
        }

        console.log('Fire')

    }, [navigate])


    if(isLoading){
        return (
            <LoadingSpinner/>
        )
    }

    if(!user){
        return (
            navigate('/login')
        )
    }

    return(
        <>
            <div className="navbarSpacer">
            </div>
            <Container>
                <div className="row pt-3">
                    <div className="col-12 col-md-4 dashboard-profile">
                        <div className="cardImage pt-5" style={{width: '200px'}}>
                            <img src="https://i.pinimg.com/736x/1e/84/0c/1e840c4b68acb2aa941e3325224cd7f7.jpg" alt=""/>
                        </div>
                        <h5 className="text-center mt-3">Welcome back, <span className="fw-700">{user.name}</span> 👋</h5>
                        <div className="row">
                            <div className="col">
                                <Table striped bordered hover className="stats-table">
                                    <thead>
                                    <tr>
                                        <th colSpan={4}><h5 className="text-center"><FaChartBar/> Statistics</h5></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td colSpan={1}>Recipes owned</td>
                                        <td colSpan={1} className="text-center">123</td>
                                    </tr>
                                    <tr>
                                        <td>Likes received</td>
                                        <td className="text-center">123</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                <div className="col dashboard-menu">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 card-group dashboard-card p-1">
                            <Card className="m-0 m-sm-0 m-md-0 m-lg-0 cursor-pointer" onClick={() => {
                                navigate('/dashboard/recipes/new')
                            }}>
                                <Card.Title><h1 className="pt-3 ps-3"><FaPlusCircle/></h1></Card.Title>
                                <Card.Body className="pb-0">
                                    <h5>Submit Recipe</h5>
                                    <p>Add a new recipe</p>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 card-group dashboard-card p-1">
                            <Card className="m-0 m-sm-0 m-md-0 m-lg-0 cursor-pointer" onClick={() => {
                                navigate('/dashboard/recipes')
                            }}>
                                <Card.Title><h1 className="pt-3 ps-3"><FaBook/></h1></Card.Title>
                                <Card.Body className="pb-0">
                                    <h5>My Recipes</h5>
                                    <p>Manage your recipes</p>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 card-group dashboard-card p-1">
                            <Card className="m-0 m-sm-0 m-md-0 m-lg-0 cursor-pointer" onClick={() => {
                                navigate('/dashboard/favourites')
                            }}>
                                <Card.Title><h1 className="pt-3 ps-3"><FaHeart/></h1></Card.Title>
                                <Card.Body className="pb-0">
                                    <h5>Favourites</h5>
                                    <p>Manage your favourite recipes</p>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 card-group dashboard-card p-1">
                            <Card className="m-0 m-sm-0 m-md-0 m-lg-0 cursor-pointer" onClick={() => {
                                navigate('/dashboard/profile')
                            }}>
                                <Card.Title><h1 className="pt-3 ps-3"><FaUser/></h1></Card.Title>
                                <Card.Body className="pb-0">
                                    <h5>Profile</h5>
                                    <p>Manage your profile</p>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 card-group dashboard-card p-1">
                            <Card className="m-0 m-sm-0 m-md-0 m-lg-0 cursor-pointer" onClick={() => {
                                navigate('/')
                            }}>
                                <Card.Title><h1 className="pt-3 ps-3"><FaList/></h1></Card.Title>
                                <Card.Body className="pb-0">
                                    <h5>Browse Recipe</h5>
                                    <p>View all recipes</p>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                </div>
            </Container>
        </>
    )
}

export default Dashboard