import {Container} from "react-bootstrap";
import DashboardMenu from "../../components/dashboard/menu";

export default function Favourites(){

    return (
        <>
            <div className="navbarSpacer">

            </div>
            <Container>
                <div className="row">
                    <div className="col-3">

                        <DashboardMenu active="/dashboard/favourites"/>
                    </div>
                    <div className="col-9">

                    </div>
                </div>
            </Container>
        </>
    )
}