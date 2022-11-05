import {Button, Container} from "react-bootstrap";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import RecipeItem from "../components/recipeItem";
import {useNavigate} from "react-router-dom";
import {getRecipes, reset} from "../features/recipe/recipeSlice";
import LoadingSpinner from "../components/loading";
import {getFavourites, reset as favouriteReset} from "../features/favourite/favouriteSlice";

import heroImg from '../resources/img/Chef-bro.svg'
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {reset as resetUsers} from "../features/user/userSlice";

function Main(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // dispatch(favouriteReset())

    const {user} = useSelector((state) => state.auth)

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
            dispatch(resetUsers())
            // dispatch(favouriteReset())
        }
    }, [])

    if(isLoading){
        return (
            <LoadingSpinner/>
        )
    }

    const categories = [
        "Burgers",
        "American",
        "Chicken",
        "Dessert",
        "Japanese",
        "Sushi",
        "Chinese",
        "Vegan",
        "Sandwiches",
        "Asian",
        "Kebab",
        "Salads",
        "Pizza",
        "Thai",
        "Indian",
        "Healthy",
        "Italian"
    ]
    const categoriesImage = [
        "https://img.icons8.com/color/96/null/hamburger.png"
        ,"https://img.icons8.com/color/96/null/rack-of-lamb.png"
        ,"https://img.icons8.com/color/96/null/galo-de-barcelos.png"
        ,"https://img.icons8.com/color/96/null/cake.png"
        ,"https://img.icons8.com/color/96/null/bento.png"
        ,"https://img.icons8.com/color/96/null/sushi.png"
        ,"https://img.icons8.com/color/96/null/gyoza.png"
        ,"https://img.icons8.com/color/96/null/you-choy.png"
        ,"https://img.icons8.com/color/96/null/bitten-sandwich.png"
        ,"https://img.icons8.com/color/96/null/rice-bowl.png"
        ,"https://img.icons8.com/color/96/null/kebab.png"
        ,"https://img.icons8.com/color/96/null/greek-salad.png"
        ,"https://img.icons8.com/color/96/null/pizza.png"
        ,"https://img.icons8.com/color/96/null/bao-bun.png"
        ,"https://img.icons8.com/color/96/null/curry.png"
        ,"https://img.icons8.com/color/96/null/carrot.png"
        ,"https://img.icons8.com/color/96/null/spaghetti.png"
    ]

    return(
        <>
            <section id="hero" className={user ? "d-none" : "d-block"}>
                <Container>
                    <div className="hero rounded-custom mb-5">
                        <div className="row justify-content-center align-content-center align-items-center">
                            <div className="col-4">
                                <h3 className="fw-700">Cook easy with CentralRecipe</h3>
                                <p>Let's get cooking!
                                </p>
                                <Button variant="black me-1">Most Popular</Button><span>or</span>
                                <Button variant="black ms-1">Explore Menu</Button>
                            </div>
                            <div className="col-4 text-center">
                                <img src={heroImg} alt=""/>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section id="categories" className="mb-5">
                <Container>
                    <h5 className="fw-700">Browse Category</h5>
                    <Splide aria-label="My Favorite Images" options={{
                        perPage: 9,
                        pagination: false,
                        breakpoints: {
                            992: {perPage: 7},
                            768: {perPage: 5},
                            576: {perPage: 4},
                        }
                    }}>
                        {categories.map((item, index) => (
                            <>
                                <SplideSlide>
                                    {/*{console.log("<option value=\'" + item + "\'>" + item + "</option>")}*/}
                                    <div className="categoryItem text-center" id={`mainSplide${index}`}>
                                        <Button variant="main-category"><img src={categoriesImage[index]} width="48"
                                                                       height="48"/></Button><br/>
                                        {item}
                                    </div>
                                </SplideSlide>
                            </>
                        ))}
                    </Splide>
                </Container>
            </section>

            <Container>
                <h5 className="fw-700">All Recipes</h5>
                <div className="row">
                    {recipes !== [] ? (
                        recipes.map((recipe) => (
                            <>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5" id={recipe._id}>
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