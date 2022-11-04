import {Badge, Button, Card} from "react-bootstrap";
import {FaClock, FaHeart} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import { pullFavourite, pushFavourite} from "../features/favourite/favouriteSlice";
import {get, reset} from "../features/multer/multerSlice";
import {FiClock} from "react-icons/fi";

function RecipeItem({recipe}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)
    const {favourites} = useSelector((state) => state.favourite.favourites)
    const {data} = useSelector((state) => state.multer)

    const [isFavourite, setFavourite] = useState(!!(favourites && favourites.includes(recipe._id)))
    const [numLikes, setNumLikes] = useState(recipe.likes)

    const [img, setImg] = useState(data)

    useEffect(() => {
        if(!user){
            return
        }
        setFavourite(!!(favourites && favourites.includes(recipe._id)))

        dispatch(get(recipe.image))
        setImg(data)
        dispatch(reset())
    }, [user, recipe, favourites, dispatch, navigate])
    // console.log(!!(favourites && favourites.includes(recipe._id)), isFavourite)

    const onLike = (e) => {
        if(!user){ // Not signed in
            toast.warning('You must be signed in to do this!')
            navigate('/login')
            return
        }

        if(e && e.stopPropagation) e.stopPropagation();

        if(isFavourite) { // Already favourite
            setFavourite(!isFavourite)
            setNumLikes(numLikes-1)
            dispatch(pullFavourite(recipe._id.toString()))
            toast.error(`Removed ${recipe.name} from your favourite list`)
        }

        if(!isFavourite) { // Not favourite
            setFavourite(!isFavourite)
            setNumLikes(numLikes+1)
            dispatch(pushFavourite(recipe._id.toString()))
            toast.success(`Added ${recipe.name} to your favourite list`)
        }
    }

    const getDuration = () => {
        let total = (recipe.duration[0].cooking.hour * 60) + recipe.duration[0].cooking.minute
        total += (recipe.duration[0].preparation.hour * 60) + recipe.duration[0].preparation.minute
        total += (recipe.duration[0].rest.hour * 60) + recipe.duration[0].rest.minute

        let x = 60
        let y = total
        let div = Math.trunc(y/x);
        // let rem = y % x;

        if(total < 60){
            return total + ' Mins'
        } else {
            // return div + ':' + rem + ' Hours'
            return div + ' Hours'
        }
    }

    const handleClick = (e) => {
        toast.success("You clicked on " + recipe.name)
    }

    return(
        <>
            <Card style={{ width: '100%'}} className="recipeCard m-auto rounded-5" onClick={handleClick}>
                <div className="cardImage d-flex align-items-center justify-content-center align-content-center">
                    <img src={`http://localhost:8000/api/upload/${recipe.image}`} alt={recipe.name}/>
                </div>
                <Card.Body className="p-0 mt-3">
                    <Card.Title className="fw-bold fs-5">
                        {recipe.name}
                        <br/>
                            {recipe.keywords.map((item, index) => index < 3 && (
                                <>
                                <Badge pill bg="primary" className="me-1">
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
                            <Button variant="outline-danger" className={`btn-like ${isFavourite}`} onClick={() => onLike()}><FaHeart /> </Button>
                            <span className="ms-2">{numLikes}</span>
                        </div>
                        <div className="col p-0">
                            <p className="m-auto text-end"><FiClock/> {getDuration()}</p>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )
}

export default RecipeItem