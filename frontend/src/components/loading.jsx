import {Container, Spinner} from "react-bootstrap";

function LoadingSpinner() {

    return (
        <Container className=''>
            <div className='row justify-content-center align-items-center vh-100'>
                <div className="col align-items-center text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        </Container>
    )
}

export default LoadingSpinner