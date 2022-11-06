import {Container} from "react-bootstrap";
import FormRecipeAdd from "../../components/forms/recipeAdd";
import React from "react";
import {useSelector} from "react-redux";
import DashboardMenu from "../../components/dashboard/menu";
import AuthVerify from "../../components/utilities/authVerify";

export default function NewRecipe(){

    const { user } = useSelector((state) => state.auth)

    return(
        <>
            <AuthVerify user={user}/>
            <Container>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <DashboardMenu active="/dashboard/recipes/new"/>
                    </div>
                    <div className="col-12 col-md-9">
                        <h5>New Recipe</h5>
                        <FormRecipeAdd/>
                    </div>
                </div>
            </Container>
        </>
    )
}