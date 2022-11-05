import {Button, Container} from "react-bootstrap";
import DashboardMenu from "../../components/dashboard/menu";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getRecipeByUser, reset} from "../../features/recipe/recipeSlice";
import React, {useEffect} from "react";
import {FiEdit, FiTrash} from "react-icons/fi";

export default function Recipes() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)
    const {recipes} = useSelector((state) => state.recipe)

    useEffect(()=>{
        dispatch(getRecipeByUser(user._id))
        return () => {
            dispatch(reset())
        }
    }, [])

    return(
        <>
            <Container>
                <div className="row">
                    <div className="col-3">
                        <DashboardMenu active="/dashboard/recipes"/>
                    </div>
                    <div className="col-9">
                        {
                            recipes !== [] ? (
                            recipes.map((recipe, index) => (
                            <>
                                <div className="row bg-light rounded-3 mb-4 align-items-center">
                                    <div className="col-4 ps-0">
                                        <div className="myRecipe-item">
                                            <img src={`http://localhost:8000/api/upload/${recipe.image}`} alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-6 pt-4 pb-4 align-self-baseline">
                                        <h4>{recipe.name}</h4>
                                        <p>{recipe.description}</p>
                                    </div>
                                    <div className="col-2 pt-4 pb-4">
                                            <Button variant="warning" className="d-block m-auto fs-4"><FiEdit/></Button>
                                            <Button variant="danger" className="d-block m-auto fs-4"><FiTrash/></Button>
                                    </div>
                                </div>
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