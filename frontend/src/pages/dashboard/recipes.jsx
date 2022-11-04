import {Container} from "react-bootstrap";
import DashboardMenu from "../../components/dashboard/menu";

export default function Recipes() {
    return(
        <>

            <Container>
                <div className="row">
                    <div className="col-3">
                        <DashboardMenu active="/dashboard/recipes"/>
                    </div>
                    <div className="col-9">

                    </div>
                </div>
            </Container>
        </>
    )
}