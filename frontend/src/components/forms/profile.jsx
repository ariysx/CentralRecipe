import {Formik, Field, useFormikContext} from "formik"
import {Button, Form, InputGroup, Spinner} from "react-bootstrap"
import {FiEdit, FiEye, FiEyeOff, FiSave, FiX} from "react-icons/fi";
import React, {useEffect, useRef, useState} from "react";
import {reset, upload} from "../../features/multer/multerSlice";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../features/auth/authSlice";

export default function FormProfile() {

    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {data, isSuccess} = useSelector((state) => state.multer)

    const [showPassword, setShowPassword] = useState(true)
    const [showPasswordState, setShowPasswordState] = useState(false)
    const [edit, setEdit] = useState(true)

    const handleEdit = () => {
        setEdit(false)
    }

    const formikRef = useRef()

    const initialValues = {
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

    const [imgName, setImgName] = useState();

    return (
        <>
            <div>
                {/*<h5>Profile</h5>*/}
                <Formik
                    enaleReinitialize={true}
                    innerRef={formikRef}
                    initialValues={{
                        newPicture: null,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        newPassword: '',
                    }}
                    onSubmit={async (values) => {
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

                        if (isSuccess) {
                            toUpdate.set('picture', data.filename)
                        }

                        console.log(JSON.parse(JSON.stringify(Object.fromEntries(toUpdate))))
                        dispatch(updateProfile(JSON.parse(JSON.stringify(Object.fromEntries(toUpdate)))))
                        toast.success("Successfully updated your profile!")
                        dispatch(reset())
                        handleCancel(formikRef)
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
                                                   const imageData = new FormData()
                                                   imageData.append('image', event.currentTarget.files[0])
                                                   dispatch(upload(imageData))
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
                                    <Button variant="danger" className="rounded-custom"
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