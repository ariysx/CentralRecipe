import {Field, FieldArray, Formik} from 'formik'
import {Button, Form, InputGroup, Spinner} from "react-bootstrap"
import {FaTrash} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {createRecipe, reset} from "../../features/recipe/recipeSlice";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {useEffect, useRef, useState} from "react";
import {FiPlus, FiUpload} from "react-icons/fi";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../loading";
import confetti from "canvas-confetti";

export default function FormRecipeAdd() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const {isLoading} = useSelector((state) => state.recipe)
    const {formikRef} = useRef()

    if (isLoading) {
        return (
            <>
                <LoadingSpinner/>
            </>
        )
    }

    return (
        <>
            <Formik
                enableReinitialize={false}
                innerRef={formikRef}
                initialValues={
                    {
                        name: "",
                        uploadimage: null,
                        image: null,
                        description: "",
                        category: [""],
                        keywords: [""],
                        duration: {
                            preparation: {
                                hour: 0,
                                minute: 0,
                            },
                            cooking: {
                                hour: 0,
                                minute: 0,
                            },
                            rest: {
                                hour: 0,
                                minute: 0,
                            },
                        },
                        ingredients: [{
                            quantity: 0,
                            unit: '',
                            ingredient: '',
                        }],
                        instructions: [''],
                        notes: '',
                        servings: 0,
                    }
                }
                // validationSchema={Yup.object({
                //     name: Yup.string().required(),
                //     uploadimage: Yup.string().required(),
                //     description: Yup.string().required(),
                //     category: Yup.array(Yup.string().required()).min(1).required(),
                //     keywords: Yup.array(Yup.string().required()).min(1).required(),
                //     // duration: Yup.array().min(3).max(3).required(),
                //     ingredients: Yup.array().min(1).max(26).required(),
                //     instructions: Yup.array().min(1).max(15).required(),
                // })}
                onSubmit={async (values, {setFieldValue}) => {
                    if (values.uploadimage) {
                        const imageData = new FormData()
                        imageData.append('image', values['uploadimage'])
                        console.log(user.token)
                        const config = {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                            },
                        }
                        await axios.post('/api/upload', imageData, config).then((res) => {
                            values.image = res.data.filename
                            // console.log(values)
                        }).catch((e) => {
                            toast.error('Image upload failed, please try again')
                            console.log(e)
                        })
                        let recipeID = ""
                        let error = false
                        let payload = null;
                        dispatch(createRecipe(values)).then((res) => {
                            payload = res.payload
                            const status = res['meta'].requestStatus
                            console.log(status)
                            console.log(res)
                            // return
                            if(res['payload'].message){
                                error = true
                            }

                            if (status === 'fulfilled' && !res['payload'].message) {
                                toast.success("You have submitted a new recipe!")
                                recipeID = res.payload._id

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
                            }
                            if (status === 'rejected') {
                                console.log(res)
                                toast.error("Error: " + res.payload)
                            }
                        }).then(() => {
                            if(error){
                                toast.error('Failed to submit your recipe: ' + payload['message'])
                               return
                            }
                            dispatch(reset())
                            navigate('/recipe/' + recipeID)
                        })
                    } else {
                        toast.error('Please provide an image')
                    }
                }
                }>
                {({
                      values,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue,
                  }) => (
                    <>
                        <Form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
                            <Form.Group className="mb-3">
                                {/*{errors.name && touched.name ? (<p className={""}>Required Field</p>) : null}*/}
                                <Form.Label className={errors.name ? "text-danger fw-bold" : ""}>Recipe
                                    Name</Form.Label>
                                <Form.Control type="text" name="name"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.name}
                                />
                            </Form.Group>
                            {values.uploadimage ? (<img className="m-auto d-block" style={{
                                width: '33%',
                                height: '12.5rem',
                                objectFit: 'cover',
                                borderRadius: '1rem'
                            }} src={URL.createObjectURL(values.uploadimage)} alt=""/>) : null}
                            <Form.Group className="mb-3">
                                <Form.Label className={errors.uploadimage ? "text-danger fw-bold" : ""}>Recipe
                                    Image</Form.Label>
                                <InputGroup>
                                    <input id="uploadimage" name="uploadimage" type="file" accept='image/*'
                                           onChange={(event) => {
                                               setFieldValue('uploadimage', event.currentTarget.files[0])
                                           }}
                                           className="form-control"/>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className={errors.description ? "text-danger fw-bold" : ""}>Recipe
                                    Description</Form.Label>
                                <Form.Control as="textarea" name="description"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.description}
                                />
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label
                                    className={errors.servings ? "text-danger fw-bold" : ""}>Servings</Form.Label>
                                <InputGroup>
                                    <Field name="servings" className="form-control" type="number" min="0" max="100"
                                           onWheel={(e) => e.target.blur()}/>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label
                                    className={errors.category ? "text-danger fw-bold" : ""}>Category</Form.Label>
                                <FieldArray name="category">
                                    {({push, remove}) => (
                                        <>
                                            {values.category.map((_, index) => (
                                                <>
                                                    <InputGroup>
                                                        <Field name={`category[${index}]`} as="select"
                                                               className="form-select">
                                                            <option value="" defaultValue={true} disabled={true}>Select
                                                                a
                                                                Category
                                                            </option>
                                                            <option value='Burgers'>Burgers</option>
                                                            <option value='American'>American</option>
                                                            <option value='Chicken'>Chicken</option>
                                                            <option value='Dessert'>Dessert</option>
                                                            <option value='Japanese'>Japanese</option>
                                                            <option value='Sushi'>Sushi</option>
                                                            <option value='Chinese'>Chinese</option>
                                                            <option value='Vegan'>Vegan</option>
                                                            <option value='Sandwiches'>Sandwiches</option>
                                                            <option value='Asian'>Asian</option>
                                                            <option value='Kebab'>Kebab</option>
                                                            <option value='Salads'>Salads</option>
                                                            <option value='Pizza'>Pizza</option>
                                                            <option value='Thai'>Thai</option>
                                                            <option value='Indian'>Indian</option>
                                                            <option value='Healthy'>Healthy</option>
                                                            <option value='Italian'>Italian</option>
                                                        </Field>
                                                        {values.category.length === 1 ? null : (
                                                            <Button variant={"danger"} onClick={() => {
                                                                remove(index)
                                                            }}><FaTrash/></Button>
                                                        )}
                                                    </InputGroup>
                                                </>
                                            ))}
                                            <Button variant={"success"} onClick={() => push("")}
                                                    className="mt-3 rounded-custom"><FiPlus/>Add Category</Button>
                                        </>
                                    )}
                                </FieldArray>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label
                                    className={errors.keywords ? "text-danger fw-bold" : ""}>Keywords</Form.Label>
                                <FieldArray name="keywords">
                                    {({push, remove}) => (
                                        <>
                                            {values.keywords.map((_, index) => (
                                                <>
                                                    <InputGroup>
                                                        <Field name={`keywords[${index}]`}
                                                               className="form-control" type="text"/>
                                                        {values.keywords.length === 1 ? null : (
                                                            <Button variant={"danger"} onClick={() => {
                                                                remove(index)
                                                            }}><FaTrash/></Button>
                                                        )}
                                                    </InputGroup>
                                                </>
                                            ))}
                                            <Button variant={"success"} onClick={() => push('')}
                                                    className="mt-3 rounded-custom"><FiPlus/>Add Keyword</Button>
                                        </>
                                    )}
                                </FieldArray>
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Preperation Time</Form.Label>
                                <InputGroup>
                                    <Field name="duration['preparation'].hour" className="form-control col-1"
                                           type="number" min="0" max="23" onWheel={(e) => e.target.blur()}/>
                                    <Button variant="disabled">Hour</Button>
                                    <Field name="duration['preparation'].minute" className="form-control" type="number"
                                           min="0" max="59" onWheel={(e) => e.target.blur()}/>
                                    <Button variant="disabled">Minute</Button>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Cooking Time</Form.Label>
                                <InputGroup>
                                    <Field name="duration['cooking'].hour" className="form-control col-1"
                                           type="number" min="0" max="23" onWheel={(e) => e.target.blur()}/>
                                    <Button variant="disabled">Hour</Button>
                                    <Field name="duration['cooking'].minute" className="form-control" type="number"
                                           min="0" max="59" onWheel={(e) => e.target.blur()}/>
                                    <Button variant="disabled">Minute</Button>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Rest Time</Form.Label>
                                <InputGroup>
                                    <Field name="duration['rest'].hour" className="form-control col-1"
                                           type="number" min="0" max="23" onWheel={(e) => e.target.blur()}/>
                                    <Button variant="disabled">Hour</Button>
                                    <Field name="duration['rest'].minute" className="form-control" type="number" min="0"
                                           max="59" onWheel={(e) => e.target.blur()}/>
                                    <Button variant="disabled">Minute</Button>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label
                                    className={errors.ingredients ? "text-danger fw-bold" : ""}>Ingredients</Form.Label>
                                {/*<Form.Control type="text" name="ingredients"*/}
                                {/*              onChange={handleChange}*/}
                                {/*              onBlur={handleBlur}*/}
                                {/*              value={values.ingredients}/>*/}
                                <FieldArray name="ingredients">
                                    {({push, remove}) => (
                                        <>
                                            {values.ingredients.map((_, index) => (
                                                <>
                                                    <InputGroup>
                                                        <Field name={`ingredients[${index}].quantity`}
                                                               className="form-control" type="number"
                                                               onWheel={(e) => e.target.blur()}/>
                                                        <Field name={`ingredients[${index}].unit`} as="select"
                                                               className="form-select">
                                                            <option value="default" defaultValue={true}>Select a
                                                                Unit
                                                            </option>
                                                            <option value="g">Grams (g)</option>
                                                            <option value="kg">Kilograms (kg)</option>
                                                            <option value="mg">Milligrams (mg)</option>
                                                            <option value="oz">Ounces (oz)</option>
                                                            <option value="floz">Fluid ounces (floz)</option>
                                                            <option value="cup">Cups (cup)</option>
                                                            <option value="tsp">Teaspoons (tsp)</option>
                                                            <option value="tbsp">Tablespoons (tbsp)</option>
                                                            <option value="ml">Milliliters (ml)</option>
                                                            <option value="l">Liters (l)</option>
                                                            <option value="stick">Sticks (stick)</option>
                                                            <option value="lb">Pounds (lb)</option>
                                                            <option value="dash">Dashes (dash)</option>
                                                            <option value="drop">Drops (drop)</option>
                                                            <option value="gal">Gallons (gal)</option>
                                                            <option value="pinch">Pinches (pinch)</option>
                                                            <option value="pt">Pints (pt)</option>
                                                            <option value="qt">Quarts (qt)</option>
                                                            <option value="drizzle">Drizzle (drizzle)</option>
                                                            <option value="clove">Clove (clove)</option>
                                                            <option value="jar">Jar (jar)</option>
                                                            <option value="can">Can (can)</option>
                                                        </Field>
                                                        <Field name={`ingredients[${index}].ingredient`}
                                                               className="form-control" placeholder="Ingredient"/>
                                                        {values.ingredients.length === 1 ? null : (
                                                            <Button variant={"danger"} onClick={() => {
                                                                remove(index)
                                                            }}><FaTrash/></Button>
                                                        )}
                                                    </InputGroup>
                                                </>
                                            ))}
                                            <Button variant={"success"} onClick={() => push({
                                                quantity: 0,
                                                unit: '',
                                                ingredient: ''
                                            })} className="mt-3 rounded-custom"><FiPlus/>Add Ingredient</Button>
                                        </>
                                    )}
                                </FieldArray>
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label
                                    className={errors.instructions ? "text-danger fw-bold" : ""}>Instructions</Form.Label>
                                <FieldArray name="instructions">
                                    {({push, remove}) => (
                                        <>
                                            {values.instructions.map((_, index) => (
                                                <>
                                                    <InputGroup>
                                                        <Button variant={"disabled"}
                                                                className={"col-1"}>Step {index + 1}</Button>
                                                        <Field as="textarea" name={`instructions[${index}]`}
                                                               className="form-control"
                                                               type="textarea"/>
                                                        {values.instructions.length === 1 ? null : (
                                                            <Button variant={"danger"} onClick={() => {
                                                                remove(index)
                                                            }}><FaTrash/></Button>
                                                        )}
                                                    </InputGroup>
                                                </>
                                            ))}
                                            <Button variant={"success"} onClick={() => push('')}
                                                    className="mt-3 rounded-custom"><FiPlus/>Add Instruction</Button>
                                        </>
                                    )}
                                </FieldArray>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Notes</Form.Label>
                                <InputGroup>
                                    <Field name="notes" className="form-control"
                                           as="textarea"/>
                                </InputGroup>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="rounded-custom" disabled={isSubmitting}>
                                {isSubmitting ? <Spinner animation={"border"} onClick={(e) => e.preventDefault()}/> : (
                                    <>
                                        {<FiUpload/>} Submit
                                    </>
                                )}
                            </Button>
                            {/*<pre>{JSON.stringify({values, errors}, null, 4)}</pre>*/}
                        </Form>
                    </>
                )}
            </Formik>
        </>
    )
}