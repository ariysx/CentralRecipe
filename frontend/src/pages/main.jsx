import {Container} from "react-bootstrap";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import RecipeItem from "../components/recipeItem";
import {useNavigate} from "react-router-dom";
import {getRecipes, reset} from "../features/recipe/recipeSlice";
import LoadingSpinner from "../components/loading";
import {getFavourites, reset as favouriteReset} from "../features/favourite/favouriteSlice";

function Main(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    dispatch(favouriteReset())

    const { recipes, isLoading, isError, message } = useSelector((state) => state.recipe)

    useEffect(() => {
        if(isError) {
            console.log(message)
            return
        }

        dispatch(getRecipes())
        dispatch(getFavourites())

        return () => {
            dispatch(reset())
            dispatch(favouriteReset())
        }
    }, [])

    if(isLoading){
        return (
            <LoadingSpinner/>
        )
    }

    return(
        <>
            <div className="navbarSpacer">
            </div>
            <Container>
                <h5 className="fw-700">All Recipes</h5>
                <div className="row">
                    {recipes !== [] ? (
                        recipes.map((recipe) => (
                            <>
                                <div className="col-6 col-sm-6 col-md-4 col-lg-3 mt-5 mb-5" id={recipe._id}>
                                    <RecipeItem key={recipe._id} recipe={recipe}/>
                                </div>
                            </>
                        ))
                    ) : (
                        <h5 className="text-center">No recipes in the database...</h5>
                    )}
                </div>
            </Container>
        </>
    )
}

export default Main