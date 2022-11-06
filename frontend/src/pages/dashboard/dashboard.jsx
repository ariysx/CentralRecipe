import React from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {Container} from "react-bootstrap";
import LoadingSpinner from "../../components/loading";
import * as PropTypes from "prop-types";
import {FiBarChart2, FiBook, FiHeart, FiThumbsUp} from "react-icons/fi";
import DashboardMenu from "../../components/dashboard/menu";
import AuthVerify from "../../components/utilities/authVerify";

function Routes(props) {
    return null;
}

Routes.propTypes = {children: PropTypes.node};

function Dashboard(){
    const { user, isLoading } = useSelector((state) => state.auth)

    if(isLoading){
        return (
            <LoadingSpinner/>
        )
    }

    return(
        <>
            <AuthVerify user={user}/>
            <section id="dashboard">
                <Container>
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <DashboardMenu active="/dashboard"/>
                        </div>
                        <div className="col-12 col-md-6">
                            <h5 className="fw-700">Overview</h5>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="dashboard-me text-center">
                                <div className="dashboard-me-image mb-3">
                                    <img src={`http://localhost:8000/api/upload/${user.picture}`} alt=""/>
                                </div>
                                <h5>Welcome back, {user.name}</h5>
                            </div>
                            <h5 className="fw-700 text-center"><FiBarChart2/> My Statistics</h5>
                            <div className="stats-card row align-items-center rounded-3 p-2 mb-3">
                                <h6>Recipe Owned</h6>
                                <div className="col-2">
                                    <h2><FiBook/></h2>
                                </div>
                                <div className="col">
                                    <h2>123</h2>
                                </div>
                            </div>
                            <div className="stats-card row align-items-center rounded-3 p-2 mb-3">
                                <h6>Favourite Received</h6>
                                <div className="col-2">
                                    <h2><FiThumbsUp/></h2>
                                </div>
                                <div className="col">
                                    <h2>123</h2>
                                </div>
                            </div>
                            <div className="stats-card row align-items-center rounded-3 p-2 mb-3">
                                <h6>Favourite Given</h6>
                                <div className="col-2">
                                    <h2><FiHeart/></h2>
                                </div>
                                <div className="col">
                                    <h2>123</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default Dashboard