import {Formik, Field} from "formik"
import {Button, Form, InputGroup, Spinner} from "react-bootstrap"
import {FiEdit, FiEye, FiEyeOff, FiSave, FiX} from "react-icons/fi";
import React, {useRef, useState} from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../features/auth/authSlice";
import axios from "axios";
import confetti from "canvas-confetti";

export default function FormProfile() {

    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    const [showPassword, setShowPassword] = useState(true)
    const [showPasswordState, setShowPasswordState] = useState(false)
    const [edit, setEdit] = useState(true)

    const handleEdit = () => {
        setEdit(false)
    }

    const formikRef = useRef()

    let initialValues = {
        picture: "http://localhost:8000/api/upload/" + user.picture,
        newPicture: null,
        name: user.name,
        username: user.username,
        email: user.email,
        newPassword: '',
    }


    const handleCancel = (formikRef) => {
        formikRef.current.resetForm()
        // initialValues = initialValues
        setEdit(true)
    }

    const handleToggle = () => {
        setShowPassword(!showPassword)
        setShowPasswordState(!showPasswordState)
    }

    return (
        <>
            <div>
                {/*<h5>Profile</h5>*/}
                <Formik
                    innerRef={formikRef}
                    initialValues={{
                        newPicture: null,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        newPassword: '',
                    }}
                    enaleReinitialize={true}
                    onSubmit={async (values, {resetForm}) => {
                        handleEdit()
                        const toUpdate = new FormData()
                        const appendChanges = (a, b) => {
                            if (formikRef.current.values[a] !== initialValues[a]) {
                                toUpdate.append(b, formikRef.current.values[a])
                            }
                        }

                        appendChanges('name', 'name')
                        appendChanges('username', 'username')
                        appendChanges('email', 'email')
                        appendChanges('newPassword', 'password')

                        if(values.newPicture){
                            const imageData = new FormData()
                            imageData.append('image', values.newPicture)
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${user.token}`,
                                },
                            }

                            await axios.post('/api/upload', imageData, config).then((res) => {
                                toUpdate.append('picture', res.data.filename)
                            }).catch((err) => {
                                console.log(err)
                                toast.error("Image upload failed, please try again")
                                return
                            })
                        }

                        // console.log(JSON.parse(JSON.stringify(Object.fromEntries(toUpdate))))
                        dispatch(updateProfile(JSON.parse(JSON.stringify(Object.fromEntries(toUpdate))))).then((res)=> {
                            // console.log(res)
                            resetForm({values: {name: res.payload.name, username: res.payload.username, email: res.payload.email}})
                            toast.success("Successfully updated your profile!")

                            confetti({
                                particleCount: 30,
                                angle: 60,
                                spread: 55,
                                origin: {x: 0},

                            })
                            confetti({
                                particleCount: 30,
                                angle: 120,
                                spread: 55,
                                origin: {x: 1},
                            })
                            handleCancel(formikRef)
                        })
                    }}
                >{({
                       values,
                       setFieldValue,
                       isSubmitting,
                       handleSubmit,
                   }) => (
                    <>
                        <Form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
                            {edit ? (
                                <>
                                    <div className="dashboard-me-image mb-3">
                                        <img src={"http://localhost:8000/api/upload/" + user.picture} alt=""/>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                            {edit ? (
                                <>
                                </>
                            ) : (
                                <>
                                    {values.newPicture ? (
                                        <div className="dashboard-me-image mb-3">
                                            <img className="m-auto d-block" src={URL.createObjectURL(values.newPicture)}
                                                 alt=""/>
                                        </div>) : null}

                                    <label htmlFor="newPicture">New Profile Picture</label>
                                    <InputGroup className="mb-3">
                                        <input id="newPicture" name="newPicture" type="file" accept='image/*'
                                               onChange={(event) => {
                                                   setFieldValue('newPicture', event.currentTarget.files[0])
                                                   // const imageData = new FormData()
                                                   // imageData.append('image', event.currentTarget.files[0])
                                                   // dispatch(upload(imageData))
                                                   // toast.success("Image uploaded")
                                               }}
                                               className="form-control"/>
                                        {/*<Button variant={"primary"} onClick={() => {*/}
                                        {/*    const imageData = new FormData()*/}
                                        {/*    imageData.append('image', values.newPicture)*/}
                                        {/*    dispatch(upload(imageData))*/}
                                        {/*    toast.success("Image uploaded")*/}
                                        {/*}}>Upload</Button>*/}
                                    </InputGroup>
                                </>
                            )}
                            <label htmlFor="name">Name</label>
                            <Field id="name" name="name" placeholder="Insert your name" className="form-control mb-3"
                                   disabled={edit}/>
                            <label htmlFor="username">Username</label>
                            <Field id="username" name="username" placeholder="Insert your username"
                                   className="form-control mb-3" disabled={edit}/>
                            <label htmlFor="email">Email</label>
                            <Field
                                id="email"
                                name="email"
                                placeholder="jane@acme.com"
                                type="email"
                                className="form-control mb-3"
                                disabled={edit}
                            />
                            <label htmlFor="newPassword">
                                {edit ? (
                                    <>
                                        Password
                                    </>
                                ) : (
                                    <>
                                        Change Password
                                    </>
                                )}
                            </label>
                            <InputGroup className="mb-3">
                                <Field id="newPassword" name="newPassword"
                                       placeholder={edit ? "••••••••" : "New Password"}
                                       type={showPasswordState ? "text" : "password"} className="form-control"
                                       disabled={edit}/>
                                {!edit ? (
                                    <>
                                        <Button variant="secondary" onClick={() => handleToggle()}>{showPassword ? (
                                            <FiEye/>) : (<FiEyeOff/>)}</Button>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}
                            </InputGroup>
                            {edit ? (
                                <>
                                    <Button variant="warning" className="rounded-custom"
                                            onClick={() => handleEdit()}><FiEdit/>Edit</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="danger" className="rounded-custom me-1"
                                            onClick={() => handleCancel(formikRef)}><FiX/> Cancel</Button>
                                </>
                            )}

                            {edit ? (
                                <>
                                    {/*<Button variant="primary" className="rounded-custom" type="submit"><FiSave/> Save Changes</Button>*/}
                                </>
                            ) : (
                                <>
                                    <Button variant="primary" type="submit" className="rounded-custom"
                                            disabled={isSubmitting}
                                            >
                                        {isSubmitting ? <Spinner animation={"border"}/> : (
                                            <>
                                                {<FiSave/>} Save Changes
                                            </>
                                        )}
                                    </Button>
                                </>
                            )}
                            {/*<pre>{JSON.stringify({values})}</pre>*/}
                        </Form>
                    </>
                )}
                </Formik>
            </div>
        </>
    )
}