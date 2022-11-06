import {Container} from "react-bootstrap";
import DashboardMenu from "../../components/dashboard/menu";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getRecipes, reset} from "../../features/recipe/recipeSlice";
import {getFavourites} from "../../features/favourite/favouriteSlice";
import RecipeItem from "../../components/recipeItem";
import AuthVerify from "../../components/utilities/authVerify";
import LoadingSpinner from "../../components/loading";

export default function Favourites(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)
    const {recipes, isLoading} = useSelector((state) => state.recipe)
    const {favourites} = useSelector((state) => state.favourite.favourites)

    useEffect(()=>{
        dispatch(getFavourites())
        dispatch(getRecipes())
        return () => {
            dispatch(reset())
        }
    }, [])

    if(isLoading){
        return (
            <LoadingSpinner/>
        )
    }

    return (
        <>
            <AuthVerify user={user}/>
            <Container>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <DashboardMenu active="/dashboard/favourites"/>
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="row">
                            {
                                favourites && favourites.length !== 0 ? (
                                    recipes.filter((recipe) => recipe._id !== favourites).map((recipe) => {
                                    for(let i in favourites){
                                        if(recipe._id === favourites[i]){
                                            return (
                                                <>
                                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5" id={recipe._id}>
                                                        <RecipeItem key={recipe._id} recipe={recipe}/>
                                                    </div>
                                                </>
                                            )
                                        }
                                    }
                                })
                                ) : (
                                    <>
                                        <h4 className="text-secondary text-center">Uh...</h4>
                                        <h5 className="text-secondary text-center">Looks like you don't have any favourite recipe yet!</h5>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}