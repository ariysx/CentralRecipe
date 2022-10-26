import {Button, Container, Form} from "react-bootstrap";
import FormRecipeAdd from "../../components/forms/recipeAdd";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export default function NewRecipe(){

    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user) {
            navigate('/login')
            toast.error("You're not signed in")
        }
    }, [navigate])

    return(
        <>
            <div className="navbarSpacer">
            </div>
            <Container>
                <h5>New Recipe</h5>
                <div className="row">
                    <div className="col">
                        <FormRecipeAdd/>
                    </div>
                </div>
            </Container>
        </>
    )
}