import React from "react";
import {useState, useEffect} from "react";

import {Form, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";

import {toast} from "react-toastify";

import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {register, reset} from "../../features/auth/authSlice";


function Register(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    })

    const {name, email, username, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/dashboard')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            name,
            username,
            email,
            password,
        }
        dispatch(register(userData))
    }

    if(isLoading){
        return (
            <>
            </>
        )
    }

    return(
        <>

            <div className="navbarSpacer">
            </div>

            <section className="container text-center mt-3">
                <h1 className="fw-700">Register</h1>
                <p>Create an account by filling out the form below</p>
                {/*<p>Let's get Cooking!</p>*/}
            </section>

            <section className="container" onSubmit={onSubmit}>
                <div className="row justify-content-center">
                    <Form className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" id="name" name="name" value={name} onChange={onChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" id="username" name="username" value={username} onChange={onChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" id="email" name="email" value={email} onChange={onChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="password" name="password" value={password} onChange={onChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="m-auto d-block">
                            Register
                        </Button>
                        <p className="mt-5 text-center">Already have an account? <Link to='/login'>Login</Link> now!</p>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default Register