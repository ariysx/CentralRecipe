import React from 'react'
import { Formik, Field, FieldArray,  } from 'formik'
import {Button, Form, InputGroup, Spinner} from "react-bootstrap"
import {FaTrash} from "react-icons/fa";
import * as Yup from "yup"
import {toast} from "react-toastify";

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
export default function FormRecipeAdd() {
    return (
        <>
            <Formik
                initialValues={
                    {
                        recipeName: "",
                        recipeImage: "",
                        recipeDescription: "",
                        tags: [],
                        cookingTime: 0,
                        ingredients: [{
                            quantity: 0,
                            unit: '',
                            ingredient: '',
                        }],
                        instructions: [''],
                    }
                }
                validationSchema={Yup.object({
                    recipeName: Yup.string().required(),
                    recipeImage: Yup.string().required(),
                    recipeDescription: Yup.string().required(),
                    // tags: Yup.array().min(1).required(),
                    cookingTime: Yup.number().required(),
                    ingredients: Yup.array().min(1).max(26).required(),
                    instructions: Yup.array().min(1).max(15).required(),
                })}
                onSubmit={async (values) => {
                    console.log(values)
                    return new Promise(res => setTimeout(res, 2500))
                }
                }>
                {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            {/*{errors.recipeName && touched.recipeName ? (<p className={""}>Required Field</p>) : null}*/}
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control type="text" name="recipeName"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.recipeName}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Image</Form.Label>
                            <Form.Control type="file" name="recipeImage"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.recipeImage}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Description</Form.Label>
                            <Form.Control as="textarea" name="recipeDescription"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.recipeDescription}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tags</Form.Label>
                            {/*<Field name="tags[0]"/>*/}
                            {/*<Field name="tags[1]"/>*/}
                            {/*<Field name="tags[2]"/>*/}
                            <Form.Control type="text" name="tags"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.tags}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cooking Time</Form.Label>
                            <Form.Control type="number" name="cookingTime"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.cookingTime}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingredients</Form.Label>
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
                                                    <Field name={`ingredients[${index}].quantity`} className="form-control" type="number"/>
                                                    <Field name={`ingredients[${index}].unit`} className="form-control"/>
                                                    <Field name={`ingredients[${index}].ingredient`} className="form-control"/>
                                                    <Button variant={"danger"} onClick={() => {remove(index)}}><FaTrash/></Button>
                                                </InputGroup>
                                              </>
                                        ))}
                                        <Button variant={"success"} onClick={() => push({quantity: 0, unit: '', ingredient: ''})}>Add</Button>
                                    </>
                                )}
                            </FieldArray>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Instructions</Form.Label>
                            <FieldArray name="instructions">
                                {({push, remove}) => (
                                    <>
                                        {values.instructions.map((_, index) => (
                                            <>
                                                <InputGroup>
                                                    <Button variant={"disabled"} className={"col-1"}>Step {index+1}</Button>
                                                    <Field name={`instructions[${index}]`} className="form-control" type="textarea"/>
                                                    <Button variant={"danger"} onClick={() => {remove(index)}}><FaTrash/></Button>
                                                </InputGroup>
                                            </>
                                        ))}
                                        <Button variant={"success"} onClick={() => push('')}>Add</Button>
                                    </>
                                )}
                            </FieldArray>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner animation={"border"}/> : 'Submit'}
                        </Button>
                        <pre>{JSON.stringify({values, errors}, null, 4)}</pre>
                    </Form>
                )}
            </Formik>
        </>
    )
}