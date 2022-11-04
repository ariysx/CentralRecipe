import {Field, FieldArray, Formik, useFormikContext,} from 'formik'
import {Button, Form, InputGroup, Spinner} from "react-bootstrap"
import {FaTrash} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {reset, upload} from "../../features/multer/multerSlice";
import {createRecipe} from "../../features/recipe/recipeSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useEffect, useState} from "react";

export default function FormRecipeAdd() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {data} = useSelector((state) => state.multer)
    // console.log(data)
    const [imgName, setImgName] = useState();

    useEffect(() => {
        setImgName(data.filename)
    }, [dispatch, data])

    return (
        <>
            <Formik
                initialValues={
                    {
                        name: "",
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
                    }
                }
                validationSchema={Yup.object({
                    name: Yup.string().required(),
                    image: Yup.string().required(),
                    description: Yup.string().required(),
                    category: Yup.array(Yup.string().required()).min(1).required(),
                    keywords: Yup.array(Yup.string().required()).min(1).required(),
                    // duration: Yup.array().min(3).max(3).required(),
                    ingredients: Yup.array().min(1).max(26).required(),
                    instructions: Yup.array().min(1).max(15).required(),
                })}
                onSubmit={async (values) => {
                    if(values.image){
                        const formData = new FormData()
                        formData.append('image', values.image)
                        dispatch(upload(formData))
                        if(imgName){
                            dispatch(createRecipe({
                                name: values.name,
                                image: imgName,
                                description: values.description,
                                category: values.category,
                                keywords: values.keywords,
                                duration: values.duration,
                                ingredients: values.ingredients,
                                instructions: values.instructions,
                                notes: values.notes,
                            }))
                            dispatch(reset)
                            toast.success('You have submitted a new recipe!')
                        } else {
                            toast.error('Image upload failed, please try again')
                        }
                    } else {
                        toast.error('Please provide an image')
                    }
                }
                }>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue
                  }) => (
                      <>
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
                        {values.image ? (<img className="m-auto d-block rounded-circle" style={{width: '200px', height: '200px', objectFit: 'cover'}} src={URL.createObjectURL(values.image)} alt=""/>) : null}
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Image</Form.Label>
                            <InputGroup>
                                <input id="image" name="image" type="file" accept='image/*' onChange={(event) => {
                                    setFieldValue('image', event.currentTarget.files[0])
                                }}
                                       className="form-control"/>
                            </InputGroup>
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
                            <FieldArray name="category">
                                {({push, remove}) => (
                                    <>
                                        {values.category.map((_, index) => (
                                            <>
                                                <InputGroup>
                                                    <Field name={`category[${index}]`} as="select"
                                                           className="form-select">
                                                        <option value="" defaultValue={true} disabled={true}>Select a
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
                                <Field name="duration['preparation'].hour" className="form-control col-1"
                                       type="number" min="0" max="23"/>
                                <Button variant="disabled">Hour</Button>
                                <Field name="duration['preparation'].minute" className="form-control" type="number" min="0" max="59"/>
                                <Button variant="disabled">Minute</Button>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cooking Time</Form.Label>
                            <InputGroup>
                                <Field name="duration['cooking'].hour" className="form-control col-1"
                                       type="number" min="0" max="23"/>
                                <Button variant="disabled">Hour</Button>
                                <Field name="duration['cooking'].minute" className="form-control" type="number" min="0" max="59"/>
                                <Button variant="disabled">Minute</Button>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Rest Time</Form.Label>
                            <InputGroup>
                                <Field name="duration['rest'].hour" className="form-control col-1"
                                       type="number" min="0" max="23"/>
                                <Button variant="disabled">Hour</Button>
                                <Field name="duration['rest'].minute" className="form-control" type="number" min="0" max="59"/>
                                <Button variant="disabled">Minute</Button>
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
                                                        <option value="" defaultValue={true} disabled={true}>Select a
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
                                        <Button variant={"success"} onClick={() => push('')}>Add</Button>
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

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner animation={"border"}/> : 'Submit'}
                        </Button>
                        <pre>{JSON.stringify({errors}, null, 4)}</pre>
                    </Form>
                    </>
                )}
            </Formik>
        </>
    )
}