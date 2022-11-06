import {Container} from "react-bootstrap";
import DashboardMenu from "../../components/dashboard/menu";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import AuthVerify from "../../components/utilities/authVerify";
import FormProfile from "../../components/forms/profile";

export default function Profile(){

    const {user} = useSelector((state) => state.auth)

    return (
        <>
            <AuthVerify user={user}/>
            <Container>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <DashboardMenu active="/dashboard/profile"/>
                    </div>
                    <div className="col-12 col-md-9">
                        <FormProfile user={user}/>
                    </div>
                </div>
            </Container>
        </>
    )
}