import {Container} from "react-bootstrap";
import DashboardMenu from "../../components/dashboard/menu";
import React from "react";

export default function Profile(){
    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <DashboardMenu active="/dashboard/profile"/>
                    </div>
                    <div className="col-12 col-md-9">

                    </div>
                </div>
            </Container>
        </>
    )
}