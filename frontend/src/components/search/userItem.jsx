import {Button, Card} from "react-bootstrap";
import {FiArrowRight} from "react-icons/fi";
import {useNavigate} from "react-router-dom";

export default function UserItem({user}){

    const navigate = useNavigate()

    return(
        <>
            <Card style={{ width: '100%' }} className="userCard rounded-3 p-3">
                <div className="userItem">
                    <img src={`http://localhost:8000/api/upload/${user.picture}`} alt="" className={"rounded-3"}/>
                </div>
                <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>

                    </Card.Text>
                    <Button variant="black" onClick={() => {navigate('/user/' + user._id)}}><FiArrowRight/> View Profile</Button>
                </Card.Body>
            </Card>
        </>
    )
}