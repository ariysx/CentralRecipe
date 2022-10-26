import {Button, Card} from "react-bootstrap";
import {FaClock, FaHeart} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import { pullFavourite, pushFavourite} from "../features/favourite/favouriteSlice";

function RecipeItem({recipe}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)
    const {favourites} = useSelector((state) => state.favourite.favourites)

    const [isFavourite, setFavourite] = useState(!!(favourites && favourites.includes(recipe._id)))
    const [numLikes, setNumLikes] = useState(recipe.likes)

    useEffect(() => {
        if(!user){
            return
        }
        setFavourite(!!(favourites && favourites.includes(recipe._id)))
    }, [user, recipe, favourites, dispatch, navigate])
    // console.log(!!(favourites && favourites.includes(recipe._id)), isFavourite)

    const onLike = () => {
        if(!user){ // Not signed in
            toast.warning('You must be signed in to do this!')
            navigate('/login')
            return
        }

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

    return(
        <>
            <Card style={{ width: '100%'}} className="recipeCard m-auto rounded-5">
                <div className="cardImage">
                    <img src="
                    https://gethealthyu.com/wp-content/uploads/2021/08/Low-Calorie-Meals-500x500.png
                    " alt="Image 1"/>
                </div>
                <Card.Body className="pt-0 pb-0" style={{transform: 'translateY(-25%)'}}>
                    <Card.Title>{recipe.name}</Card.Title>
                    {/*<Card.Text className="heart"><FaHeart /> <span>{recipe.likes}</span></Card.Text>*/}
                    <div className="row align-items-center ">
                        <div className="col">
                            <p className="m-auto"><FaClock/> 25 Mins</p>
                        </div>
                        <div className="col text-end">
                            <span>{numLikes} Likes </span>
                            {/*{console.log(recipe.name + " // " + numLikes + " // " + isFavourite + " // " + !!(favourites && favourites.includes(recipe._id)))}*/}
                            <Button variant="outline-danger" className={`btn-like ${isFavourite}`} onClick={() => onLike()}><FaHeart /> </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default RecipeItem