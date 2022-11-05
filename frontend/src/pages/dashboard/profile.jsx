import {Container} from "react-bootstrap";
import DashboardMenu from "../../components/dashboard/menu";

export default function Profile(){
    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-3">
                        <DashboardMenu active="/dashboard/profile"/>
                    </div>
                    <div className="col-9">

                    </div>
                </div>
            </Container>
        </>
    )
}