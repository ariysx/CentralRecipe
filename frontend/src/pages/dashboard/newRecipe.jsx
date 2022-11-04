import {Button, Container, Form} from "react-bootstrap";
import FormRecipeAdd from "../../components/forms/recipeAdd";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import DashboardMenu from "../../components/dashboard/menu";

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
            <Container>
                <div className="row">
                    <div className="col-3">
                        <DashboardMenu active="/dashboard/recipes/new"/>
                    </div>
                    <div className="col-9">
                        <h5>New Recipe</h5>
                        <FormRecipeAdd/>
                    </div>
                </div>
            </Container>
        </>
    )
}