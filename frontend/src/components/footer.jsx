import {Container} from "react-bootstrap";
import {FaHeart} from "react-icons/fa";

export default function Footer(){

    return (
        <>
            <section id="footer mt-5">
                <Container fluid className="bg-light">
                    <Container>
                        <div className="footer pt-5 pb-5 text-center mt-5">
                            <img src="https://img.icons8.com/doodle/96/cooking-book.png" width="64" alt=""/>
                            <h5 className="fw-bold">CentralRecipe</h5>
                            <p>Made with <span className="text-danger"><FaHeart/></span> by <a href="https://github.com/ariysx">Rin</a></p>
                            <small className="text-secondary">Assets and Images by <a href="https://icons8.com">Icons8.com</a></small>
                        </div>
                    </Container>
                </Container>
            </section>
        </>
    )
}