import {Container} from "react-bootstrap";
import DashboardMenu from "../../components/dashboard/menu";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getRecipeByUser, reset} from "../../features/recipe/recipeSlice";
import React, {useEffect} from "react";
import DashboardRecipeItem from "../../components/dashboard/recipeItem";
import LoadingSpinner from "../../components/loading";

export default function Recipes() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)
    const {recipes, isLoading} = useSelector((state) => state.recipe)

    useEffect(()=>{
        dispatch(getRecipeByUser(user._id))
        return () => {
            dispatch(reset())
        }
    }, [DashboardRecipeItem])

    if(!user){
        return (
            navigate('/login')
        )
    }

    if(isLoading){
        return (
            <LoadingSpinner/>
        )
    }

    return(
        <>
            <Container>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <DashboardMenu active="/dashboard/recipes"/>
                    </div>
                    <div className="col-12 col-md-9">
                        {
                            recipes.length !== 0 ? (
                            recipes && recipes.map((recipe) => (
                            <>
                                <DashboardRecipeItem recipe={recipe} key={"dashboardRecipeItem" + recipe.id}/>
                            </>
                        ))
                            ) : (
                                <>
                                    <h4 className="text-secondary text-center">Uh...</h4>
                                    <h5 className="text-secondary text-center">Looks like you don't have any recipe yet!</h5>
                                </>
                            )
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}