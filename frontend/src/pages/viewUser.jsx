import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getStatistics, getUserById, reset} from "../features/user/userSlice";
import {FiBarChart2, FiBook, FiHeart, FiThumbsUp} from "react-icons/fi";
import {Container} from "react-bootstrap";
import {getRecipeByUser} from "../features/recipe/recipeSlice";
import RecipeItem from "../components/recipeItem";

export default function ViewUser(){

    const {users, statistics} = useSelector((state) => state.users)
    const {recipes} = useSelector((state) => state.recipe)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        // if(users || users.length === 0){
            dispatch(getUserById(id))
            dispatch(getStatistics(id))
            dispatch(getRecipeByUser(id))
        // }
    }, [id])

    // useEffect(() => {
    //     return () => {
    //         dispatch(reset)
    //     }
    // }, [navigate])

    return (
        <>
            <section id="userDetails">
                <Container>
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <div className="dashboard-me text-center">
                                <div className="dashboard-me-image mb-3">
                                    <img src={`http://localhost:8000/api/upload/${users[0] && users[0].picture}`} alt=""/>
                                </div>
                                <h5>{users[0] && users[0].name}</h5>
                            </div>
                            <h5 className="fw-700 text-center"><FiBarChart2/> {users[0] && users[0].name}'s Statistics</h5>
                            <div className="stats-card row align-items-center rounded-3 p-2 mb-3">
                                <h6>Recipe Owned</h6>
                                <div className="col-2">
                                    <h2><FiBook/></h2>
                                </div>
                                <div className="col">
                                    <h2>{statistics[0] && statistics[0].recipeOwned}</h2>
                                </div>
                            </div>
                            <div className="stats-card row align-items-center rounded-3 p-2 mb-3">
                                <h6>Favourite Received</h6>
                                <div className="col-2">
                                    <h2><FiThumbsUp/></h2>
                                </div>
                                <div className="col">
                                    <h2>{statistics[0] && statistics[0].favouriteReceived}</h2>
                                </div>
                            </div>
                            <div className="stats-card row align-items-center rounded-3 p-2 mb-3">
                                <h6>Favourite Given</h6>
                                <div className="col-2">
                                    <h2><FiHeart/></h2>
                                </div>
                                <div className="col">
                                    <h2>{statistics[0]  && statistics[0].favouriteGiven}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-9 row pt-0 pb-0 pe-0 pe-0 ps-0 pe-md-5 ps-md-5">
                            <h5>{users[0] && users[0].name}'s Recipes</h5>
                            {
                                recipes.length !== 0 ? (
                                    recipes && recipes.map((recipe) => (
                                        <>
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-5" id={recipe._id}>
                                                <RecipeItem key={recipe._id} recipe={recipe}/>
                                            </div>
                                        </>
                                    ))
                                ) : (
                                    <>
                                        <h4 className="text-secondary text-center">Uh...</h4>
                                        <h5 className="text-secondary text-center">Looks like {users[0] && users[0].name} don't have any recipe yet!</h5>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    {/*{id}*/}
                    {/*<pre>{JSON.stringify(users)}</pre>*/}
                    {/*<pre>{JSON.stringify(statistics)}</pre>*/}
                </Container>
            </section>
        </>
    )
}