import {useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function AuthVerify({user}){

    const navigate = useNavigate()

    useEffect(() => {
        if(!user) {
            navigate('/login')
            toast.error("You're not signed in")
        }
    }, [navigate])

    if(!user){
        return (
            navigate('/login')
        )
    }
}