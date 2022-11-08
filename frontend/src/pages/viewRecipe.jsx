import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getRecipe} from "../features/recipe/recipeSlice";
import React, {useEffect, useState} from "react";
import LoadingSpinner from "../components/loading";
import {Badge, Button, Container, Form, Table} from "react-bootstrap";
import {FiClock, FiEdit, FiShare} from "react-icons/fi";
import ButtonFavourite from "../components/button/favourite";
import GetRecipeDuration from "../components/utilities/getDuration";
import {toast} from "react-toastify";
import {getUserById} from "../features/user/userSlice";
import Moment from "moment"
import {FaBars} from "react-icons/fa";

export default function ViewRecipe(){
    // Pass in props for Recipe Obj
    // Call with onClick={ViewRecipe{recipe}}

    const dispatch = useDispatch()
    const {id} = useParams()

    const {recipes, isLoading} = useSelector((state) => state.recipe)
    const [recipe, setRecipe] = useState()

    useEffect(() => {
        if(!recipe || !recipes || (id !== recipe._id)){
            dispatch(getRecipe(id))
            setRecipe(recipes[0])
        }
    }, [recipes, recipe, id])

    const {users} = useSelector((state) => state.users)
    const [publisher, setPublisher] = useState(users[0])

    useEffect(() => {
        if(!publisher || !users) {
            dispatch(getUserById(recipe && recipe.publisher))
        }
        setPublisher(users && users[0])

    }, [users, publisher])

    // useEffect(() => {
    //     return () => {
    //         dispatch(resetUsers())
    //     }
    // }, [])

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

    const onShare = (e) => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link to the recipe has been copied to your clipboard")
    }

    return (
        <>
            <section id={id}>
                <Container>
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6" style={{height: '25rem'}}>
                            <img src={`http://localhost:8000/api/upload/${recipe.image}`} width="100%" height="100%" style={{objectFit: 'cover'}} className="rounded-3" alt={recipe.name}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <h2 className="m-0 mt-sm-3">{recipe.name} <ButtonFavourite recipe={recipe} withCount={false}/> <Button variant="outline-danger" className={`btn-share`} onClick={(e) => onShare(e)}><FiShare /> Share</Button></h2>
                            <p className="mt-3"><FiEdit/> Written by
                                <img src={`http://localhost:8000/api/upload/${publisher && publisher.picture}`} alt={publisher && publisher.name}
                                     width="32" height="32" className="rounded-circle me-1 ms-1"/> {publisher && publisher.name}</p>
                            <p>Published {Moment(recipe.createdAt).format("D MMM YYYY")}<span className="text-secondary"> Last update: {Moment(recipe.updatedAt).format("D MMM YYYY")} </span></p>

                            <p>{recipe.description}</p>
                            {recipe.category.map((item) => (
                                <>
                                    <Badge pill bg="primary" className="me-1 fs-6">
                                        {item}
                                    </Badge>
                                </>
                            ))}
                            <div>
                                <div className="row justify-content-center justify-content-md-start mt-3">
                                    <div className="col viewRecipe-duration">
                                        <img src="https://img.icons8.com/color/100/null/cutting-a-carrot.png" height="70px" alt=""/>
                                        <p className="m-0">{recipe.duration[0].preparation.hour === 0 ? (<></>) : (<>{recipe.duration[0].preparation.hour}</>)} {recipe.duration[0].preparation.minute} Minutes</p>
                                    </div>
                                    <div className="col viewRecipe-duration">
                                        <img src="https://img.icons8.com/color/100/null/cooking-pot.png" height="70px" alt=""/>
                                        <p className="m-0">{recipe.duration[0].cooking.hour === 0 ? (<></>) : (<>{recipe.duration[0].cooking.hour}</>)} {recipe.duration[0].cooking.minute} Minutes</p>
                                    </div>
                                    <div className="col viewRecipe-duration">
                                        <img src="https://img.icons8.com/color/100/null/soup-plate.png" height="70px" alt=""/>
                                        <p className="m-0">{recipe.duration[0].rest.hour === 0 ? (<></>) : (<>{recipe.duration[0].rest.hour}</>)} {recipe.duration[0].rest.minute} Minutes</p>
                                    </div>
                                    <div className="col viewRecipe-duration">
                                        <img src="https://img.icons8.com/color/48/null/tableware.png" height="70px" alt=""/>
                                        <p className="m-0">{recipe.servings > 1 ? recipe.servings + " Servings" : recipe.servings + " Serving"}</p>
                                    </div>
                                </div>
                                <div className="total">
                                    <p><span className="fw-bold"><FiClock/> Total Cooking Time</span> <GetRecipeDuration recipe={recipe}/></p>
                                </div>
                            </div>
                            <div className="badges mt-3">
                                {recipe.keywords.map((item) => (
                                    <>
                                        <Badge pill bg="dark" className="me-1 fs-6">
                                            {item}
                                        </Badge>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="ingredients mt-5 col-12 col-md-6">
                            <h5>Ingredients</h5>
                            <Form>
                                <Table bordered>
                                    <thead>
                                    </thead>
                                    <tbody className="rounded-3">

                                    {recipe.ingredients.map((item) => (
                                        <>
                                            <tr>
                                                <td width="5%">
                                                    <Form.Check/>
                                                </td>
                                                <td>{item.quantity + " " + item.unit + " " + item.ingredient}</td>
                                            </tr>
                                        </>
                                    ))}
                                    </tbody>
                                </Table>
                            </Form>
                        </div>
                        <div className="instructions mt-5 col-12 col-md-6">
                            <h5>Instructions</h5>
                            {recipe.instructions.map((item, index) => (
                                <>
                                    <span className="fw-bold">Step {index + 1}</span>
                                    <p>{item}</p>
                                </>
                            ))}
                        </div>
                        <div className="notes mt-5 col-12 col-md-6">
                            <h5>Notes</h5>
                            <p>{recipe.notes}</p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}