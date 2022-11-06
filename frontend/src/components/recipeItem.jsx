import {Badge, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {FiClock} from "react-icons/fi";
import ButtonFavourite from "./button/favourite";
import GetRecipeDuration from "./utilities/getDuration";

function RecipeItem({recipe}) {

    const navigate = useNavigate()

    const handleClick = (e) => {
        navigate('/recipe/' + recipe._id)
    }

    return(
        <>
            <Card style={{ width: '100%'}} className="recipeCard m-auto rounded-5" onClick={(e) => handleClick(e)}>
                <div className="cardImage d-flex align-items-center justify-content-center align-content-center">
                    <img src={`http://localhost:8000/api/upload/${recipe.image}`} alt={recipe.name}/>
                </div>
                <Card.Body className="p-0 mt-3">
                    <Card.Title className="fw-bold fs-5">
                        {recipe.name}
                        <br/>
                            {recipe.keywords.map((item, index) => index < 3 && (
                                <>
                                <Badge pill bg="dark" className="me-1">
                                    {item}
                                </Badge>
                                </>
                            ))}
                    </Card.Title>
                    {/*<Card.Text className="heart"><FaHeart /> <span>{recipe.likes}</span></Card.Text>*/}
                </Card.Body>
                <Card.Footer>
                    <div className="row align-items-center ">
                        <div className="col p-0 justify-content-center align-items-center">
                            {/*{console.log(recipe.name + " // " + numLikes + " // " + isFavourite + " // " + !!(favourites && favourites.includes(recipe._id)))}*/}
                            <ButtonFavourite recipe={recipe} withCount={true}/>
                        </div>
                        <div className="col p-0">
                            <p className="m-auto text-end"><FiClock/> <GetRecipeDuration key={"recipeDuration" + recipe._id} recipe={recipe}/></p>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )
}

export default RecipeItem