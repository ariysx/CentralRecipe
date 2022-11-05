import {Button} from "react-bootstrap";
import {FaHeart} from "react-icons/fa";
import {toast} from "react-toastify";
import {getFavourites, pullFavourite, pushFavourite, reset} from "../../features/favourite/favouriteSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ButtonFavourite({recipe, withCount}){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)
    const {favourites} = useSelector((state) => state.favourite.favourites)
    // const {data} = useSelector((state) => state.multer)

    const [isFavourite, setFavourite] = useState(!!(favourites && favourites.includes(recipe._id)))
    const [numLikes, setNumLikes] = useState(recipe.likes)

    // const [img, setImg] = useState(data)

    useEffect(() => {
        if(!user){
            return
        }

        if(!favourites) {
            dispatch(getFavourites())
        }

        setFavourite(!!(favourites && favourites.includes(recipe._id)))

        // dispatch(get(recipe.image))
        // setImg(data)
        // dispatch(reset())

    }, [isFavourite, favourites])

    const onLike = (e) => {
        if(!user){ // Not signed in
            toast.warning('You must be signed in to do this!')
            navigate('/login')
            return
        }

        e.stopPropagation()

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

    return (
        <>
            <Button variant="outline-danger" className={`btn-like ${isFavourite}`} onClick={(e) => onLike(e)}><FaHeart /> </Button>
            {withCount ? (
                <>
                    <span className="ms-2">{numLikes}</span>
                </>
            ) : (
                <>
                </>
            )}
        </>
    )

}