import React from 'react'
import {Formik, Field, FieldArray,} from 'formik'
import {Button, Form, InputGroup, Spinner} from "react-bootstrap"
import {FaTrash} from "react-icons/fa";
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {upload} from "../../features/multer/multerSlice";

export default function FormRecipeAdd() {

    const dispatch = useDispatch()
    const { multer } = useSelector((state) => state.multer)

    return (
        <>
            <Formik
                initialValues={
                    {
                        name: "",
                        image: null,
                        description: "",
                        category: [''],
                        keywords: [''],
                        duration: {
                            preparation: {
                                unit: "",
                                time: 0
                            },
                            cooking: {
                                unit: "",
                                time: 0
                            },
                            rest: {
                                unit: "",
                                time: 0
                            },
                        },
                        ingredients: [{
                            quantity: 0,
                            unit: '',
                            ingredient: '',
                        }],
                        instructions: [''],
                    }
                }
                // validationSchema={Yup.object({
                //     name: Yup.string().required(),
                //     // image: Yup.string().required(),
                //     description: Yup.string().required(),
                //     // tags: Yup.array().min(1).required(),
                //     cookingTime: Yup.number().required(),
                //     ingredients: Yup.array().min(1).max(26).required(),
                //     instructions: Yup.array().min(1).max(15).required(),
                // })}
                onSubmit={async (values) => {
                    console.log(values)
                    console.log(values.image)
                    dispatch(upload({
                        image: values.image
                    }))

                    // return new Promise(res => setTimeout(res, 2500))

                }
                }>
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue}) => (
                    <Form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
                        <Form.Group className="mb-3">
                            {/*{errors.name && touched.name ? (<p className={""}>Required Field</p>) : null}*/}
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control type="text" name="name"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.name}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Image</Form.Label>
                            <input id="image" name="image" type="file" onChange={(event) => {
                                setFieldValue("image", event.currentTarget.files[0]);
                            }} className="form-control" />
                            <img src={values.image} alt=""/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Description</Form.Label>
                            <Form.Control as="textarea" name="description"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.description}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            {/*<Form.Control type="text" name="ingredients"*/}
                            {/*              onChange={handleChange}*/}
                            {/*              onBlur={handleBlur}*/}
                            {/*              value={values.ingredients}/>*/}
                            <FieldArray name="category">
                                {({push, remove}) => (
                                    <>
                                        {values.category.map((_, index) => (
                                            <>
                                                <InputGroup>
                                                    <Field name={`category[${index}]`} as="select"
                                                           className="form-select">
                                                        <option value="" selected={true} disabled={true}>Select a Category</option>
                                                        <option value="appetizer">Appetizers</option>
                                                        <option value="condiment">Condiments</option>
                                                        <option value="confectionery">Confectionery</option>
                                                        <option value="dessert">Desserts</option>
                                                        <option value="dips">Dips, pastes and spreads</option>
                                                        <option value="dried">Dried foods</option>
                                                        <option value="dumpling">Dumplings</option>
                                                        <option value="fast">Fast food</option>
                                                        <option value="fermented">Fermented foods</option>
                                                        <option value="halal">Halal food</option>
                                                        <option value="kosher">Kosher food</option>
                                                        <option value="noodle">Noodles</option>
                                                        <option value="pasta">Pasta</option>
                                                        <option value="pie">Pies</option>
                                                        <option value="salad">Salads</option>
                                                        <option value="sandwich">Sandwiches</option>
                                                        <option value="sauce">Sauces</option>
                                                        <option value="snack">Snack foods</option>
                                                        <option value="soup">Soups</option>
                                                        <option value="stew">Stews</option>
                                                    </Field>
                                                    {values.category.length === 1 ? null : (
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
                                        })}>Add</Button>
                                    </>
                                )}
                            </FieldArray>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Keywords</Form.Label>
                            {/*<Form.Control type="text" name="ingredients"*/}
                            {/*              onChange={handleChange}*/}
                            {/*              onBlur={handleBlur}*/}
                            {/*              value={values.ingredients}/>*/}
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
                                        <Button variant={"success"} onClick={() => push('')}>Add</Button>
                                    </>
                                )}
                            </FieldArray>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Preperation Time</Form.Label>
                            <InputGroup>
                                <Field name="duration['preparation'].time" className="form-control col-1" type="number"/>
                                <Field name="duration['preparation'].unit" className="form-select" as="select">
                                    <option value="minute">Minutes</option>
                                    <option value="hour">Hours</option>
                                </Field>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cooking Time</Form.Label>
                            <InputGroup>
                                <Field name="duration['cooking'].time" className="form-control col-1" type="number"/>
                                <Field name="duration['cooking'].unit" className="form-select" as="select">
                                    <option value="minute">Minutes</option>
                                    <option value="hour">Hours</option>
                                </Field>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Rest Time</Form.Label>
                            <InputGroup>
                                <Field name="duration['rest'].time" className="form-control col-1" type="number"/>
                                <Field name="duration['rest'].unit" className="form-select" as="select">
                                    <option value="minute">Minutes</option>
                                    <option value="hour">Hours</option>
                                </Field>
                            </InputGroup>
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
                                                    <Field name={`ingredients[${index}].quantity`}
                                                           className="form-control" type="number"/>
                                                    <Field name={`ingredients[${index}].unit`} as="select"
                                                           className="form-select">
                                                        <option value="" selected={true} disabled={true}>Select a Unit</option>
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
                                        })}>Add</Button>
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
                                                    <Button variant={"disabled"}
                                                            className={"col-1"}>Step {index + 1}</Button>
                                                    <Field as="textarea" name={`instructions[${index}]`} className="form-control"
                                                           type="textarea"/>
                                                    {values.instructions.length === 1 ? null : (
                                                        <Button variant={"danger"} onClick={() => {
                                                            remove(index)
                                                        }}><FaTrash/></Button>
                                                    )}
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