import FormRecipeEdit from "../components/forms/recipeEdit";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import LoadingSpinner from "../components/loading";
import {getRecipe} from "../features/recipe/recipeSlice";
import DashboardMenu from "../components/dashboard/menu";
import {Container} from "react-bootstrap";

export default function EditRecipe(){

    const dispatch = useDispatch()
    const {id} = useParams()

    const {recipes, isLoading} = useSelector((state) => state.recipe)
    const [recipe, setRecipe] = useState()

    useEffect(() => {
        if(!recipe || !recipes){
            dispatch(getRecipe(id))
            setRecipe(recipes[0])
        }
    }, [recipes, recipe])

    if(isLoading){
        return (
            <>
                <LoadingSpinner/>
            </>
        )
    }

    if(!recipe) {
        return (
            <>
                Recipe Not Found
            </>
        )
    }


    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <DashboardMenu active="/dashboard/recipes"/>
                    </div>
                    <div className="col-12 col-md-9">
                        <FormRecipeEdit recipe={recipe}/>
                    </div>
                </div>
            </Container>
        </>
    )
}