import {useSelector} from "react-redux";
import React from "react";
import AuthVerify from "../../components/utilities/authVerify";
import ViewRecipes from "../../components/dashboard/recipes";

export default function Recipes() {

    const {user} = useSelector((state) => state.auth)

    if(!user){
        return(
            <AuthVerify user={user}/>
        )
    }

    return(
        <>
            <ViewRecipes/>
        </>
    )
}