import React from "react";
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {login, reset} from "../../features/auth/authSlice";

import {Form, Button} from 'react-bootstrap'

import LoadingSpinner from '../../components/loading'

function Login(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            toast.success('Signed in as ' + user.name)
        }

        if(isSuccess || user){
            navigate('/dashboard')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const {username, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(username.includes('@')){
            const userData = {
                email: username,
                password
            }
            dispatch(login(userData))
        } else {
            const userData = {
                username,
                password
            }
            dispatch(login(userData))
        }
    }


    if(isLoading){
        return(
            <LoadingSpinner />
        )
    }

    return(
        <>
            <section className="container text-center mt-3">
                <h1 className="fw-700">Login</h1>
                {/*<p>Already have an account?</p>*/}
                <p>Sign in by filling out the form below</p>
            </section>

            <section className="container" onSubmit={onSubmit}>
                <div className="row justify-content-center">
                    <Form className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">

                        <Form.Group className="mb-3">
                            <Form.Label>Username or Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter username or email" id="username" name="username" value={username} onChange={onChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="password" name="password" value={password} onChange={onChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="m-auto d-block">
                            Login
                        </Button>
                        <p className="mt-5 text-center">Don't have an account? <Link to='/register'>Register</Link> now!</p>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default Login