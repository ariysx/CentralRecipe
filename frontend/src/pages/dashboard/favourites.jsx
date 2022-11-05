import {Button, Container} from "react-bootstrap";
import DashboardMenu from "../../components/dashboard/menu";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getRecipes, reset} from "../../features/recipe/recipeSlice";
import {getFavourites} from "../../features/favourite/favouriteSlice";
import {FiEdit, FiTrash} from "react-icons/fi";
import RecipeItem from "../../components/recipeItem";

export default function Favourites(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)
    const {recipes} = useSelector((state) => state.recipe)
    const {favourites} = useSelector((state) => state.favourite.favourites)

    const [Fav, setFav] = useState()

    useEffect(()=>{
        dispatch(getFavourites())
        dispatch(getRecipes())

        setFav(favourites)

        return () => {
            dispatch(reset())
        }
    }, [Fav])

    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-3">
                        <DashboardMenu active="/dashboard/favourites"/>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {
                                favourites !== [] || favourites.size === 0 ? (
                                recipes.map((recipe) => {
                                    console.log(Fav)
                                    for(let i in Fav){
                                        if(recipe._id === Fav[i]){
                                            console.log("MATCH")
                                            return (
                                                <>
                                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5" id={recipe._id}>
                                                        <RecipeItem key={recipe._id} recipe={recipe}/>
                                                    </div>
                                                </>
                                            )
                                        }
                                    }
                                    // no
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