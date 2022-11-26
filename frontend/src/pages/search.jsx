import {Button, Collapse, Container, Dropdown, InputGroup} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {FiChevronDown, FiChevronUp, FiFilter, FiPlus} from "react-icons/fi";
import {Formik, Form, Field, useFormikContext, FieldArray} from 'formik'
import axios from "axios";
import RecipeItem from "../components/recipeItem";
import {FaTrash} from "react-icons/fa";
import Slider from 'react-input-slider'
import UserItem from "../components/search/userItem";
import {useLocation, useSearchParams} from "react-router-dom";

export default function Search() {

    const [search, setSearch] = useState("")
    const [open, setOpen] = useState({
        for: true,
        category: true,
        keywords: true,
        time: true,
        servings: true,
    })

    const location = useLocation()

    const [searchResult, setSearchResult] = useState([])
    const [userSearchResult, setUserSearchResult] = useState([])
    const [formValues, setFormValues] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    const categories = [
        "Burgers",
        "American",
        "Chicken",
        "Dessert",
        "Japanese",
        "Sushi",
        "Chinese",
        "Vegan",
        "Sandwiches",
        "Asian",
        "Kebab",
        "Salads",
        "Pizza",
        "Thai",
        "Indian",
        "Healthy",
        "Italian"
    ]

    const formikRef = useRef()

    const FormObserver = () => {
        const {values} = useFormikContext();

        useEffect(() => {
            // if(location.state && location.state.category){
            //     values.category.push(location.state.category && location.state.category)
            // }
            setFormValues(values)
            // console.log(formValues)
        }, [values])

        useEffect(() => {
            const delay = setTimeout(async () => {
                if (values.searchBy === "recipe") {
                    if (values.search.length !== 0 && searchResult) {

                    }
                    if (values.search.length === 0 && !searchResult) {
                        await axios.get('/api/recipe').then((res) => {
                            setSearchResult(res.data)
                            console.log(res.data)
                        })
                    }
                }
            }, 1000 * 0.5)

            return () => clearTimeout(delay)
        }, [search])

        return null;
    }

    const handleOnChange = (event) => {
        // console.log("Form::onChange", event)
        // setFormValues(formikRef.current.values)
        // console.log(formValues)
    }

    const [sortBy, setSortBy] = useState()

    useEffect(() => {
        if (formValues.searchBy === "recipe") {
            switch (sortBy) {
                case "newest": {
                    const sorted = [].concat(searchResult).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                    setSearchResult(sorted)
                    break;
                }
                case "oldest": {
                    const sorted = [].concat(searchResult).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                    setSearchResult(sorted)
                    break;
                }
                case "recentlyUpdated": {
                    const sorted = [].concat(searchResult).sort((a, b) => a.updatedAt.localeCompare(b.updatedAt))
                    setSearchResult(sorted)
                    break;
                }
                case "mostFav": {
                    const sorted = [].concat(searchResult).sort((a, b) => b.likes - a.likes)
                    setSearchResult(sorted)
                    break;
                }
                case "leastFav": {
                    const sorted = [].concat(searchResult).sort((a, b) => a.likes - b.likes)
                    setSearchResult(sorted)
                    break;
                }
                default: {
                    break;
                }
            }
        }
        if (formValues.searchBy === "user") {
            switch (sortBy) {
                case "newest": {
                    const sorted = [].concat(userSearchResult).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                    setUserSearchResult(sorted)
                    break;
                }
                case "oldest": {
                    const sorted = [].concat(userSearchResult).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                    setUserSearchResult(sorted)
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }, [sortBy])

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (formValues.searchBy === "recipe") {
                const searchData = new FormData()
                searchData.append("name", formValues.search)
                searchData.append("searchBy", formValues.searchBy)
                searchData.append("category", formValues.category)
                searchData.append("servings", formValues.servings)
                searchData.append("keywords", formValues.keywords)
                searchData.append("timeMin", formValues.timeMin)
                searchData.append("timeHour", formValues.timeHour)

                // console.log(JSON.parse(JSON.stringify(Object.fromEntries(searchData))))

                await axios.post('/api/query/search/', JSON.parse(JSON.stringify(Object.fromEntries(searchData)))).then((res) => {
                    setSearchResult(res.data)
                    console.log(res.data)
                }).catch((e) => {
                    console.log(e)
                })
            }

            if (formValues.searchBy === "user") {
                const searchData = new FormData()
                searchData.append("name", formValues.search)
                searchData.append("searchBy", formValues.searchBy)

                // console.log(JSON.parse(JSON.stringify(Object.fromEntries(searchData))))

                await axios.post('/api/query/search/', JSON.parse(JSON.stringify(Object.fromEntries(searchData)))).then((res) => {
                    setUserSearchResult(res.data)
                    console.log(res.data)
                }).catch((e) => {
                    console.log(e)
                })
            }
        }, 1000 * 0.5)
        console.log(formValues)
        return () => clearTimeout(delay)
    }, [formValues])

    return (
        <>
            <section id="search" className="min-vh-100">
                <Container>
                    <div className="row">
                        <div className="col-12 col-md-3">
                        </div>
                        <div className="col-12 col-md-9">
                            <form>
                                <svg
                                    className="position-absolute m-2"
                                    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="30" height="30"
                                    viewBox="0 0 30 30">
                                    <path
                                        d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/>
                                </svg>
                                <input type="text" name="search" value={search} placeholder="Search anything..."
                                       className="form-control rounded-custom w-100 p-2 ps-5"
                                       onChange={(e) => {
                                           setSearch(e.target.value)
                                           formikRef.current.setFieldValue('search', e.target.value)
                                           console.log(formikRef.current.values)
                                       }}/>
                            </form>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 col-md-3">
                            <h5><FiFilter/> Filter</h5>
                            <Formik
                                innerRef={formikRef}
                                initialValues={{
                                    search: `${searchParams.get('q') ? searchParams.get('q') : ""}`,
                                    searchBy: "recipe",
                                    // category: [`${location.state && location.state.category ? location.state.category : '' }`],
                                    category: [`${searchParams.get('category') ? searchParams.get('category') : '' }`],
                                    servings: `${searchParams.get('servings') ? searchParams.get('servings') : 0}`,
                                    timeHour: `${searchParams.get('timeHour') ? searchParams.get('timeHour') : 0}`,
                                    timeMin: `${searchParams.get('timeMin') ? searchParams.get('timeMin') : 0}`,
                                    keywords: [`${searchParams.get('keywords') ? searchParams.get('keywords') : '' }`],
                                }}
                                onSubmit={async (values) => {
                                    alert(JSON.stringify(values, null, 2));
                                }}
                            >
                                {({values, setFieldValue}) => (
                                    <Form onChange={handleOnChange}>
                                        <FormObserver/>
                                        <div className="filter-by">
                                            <Button variant="light d-block w-100 text-start"
                                                    onClick={() => setOpen({...open, for: !open.for})}>{open.for ? (
                                                <FiChevronDown/>) : (<FiChevronUp/>)} Search For</Button>
                                            <Collapse in={open.for}>
                                                <div className="options mb-3">
                                                    <div className="form-check">
                                                        <Field type="radio" name="searchBy" value="recipe"
                                                               className="form-check-input"
                                                            // checked={values.searchBy === 'recipe' ? true : false}/>
                                                        />
                                                        <label className="form-check-label">Recipe</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <Field type="radio" name="searchBy" value="user"
                                                               className="form-check-input"
                                                            // checked={values.searchBy === 'user' ? true : false}/>
                                                        />
                                                        <label className="form-check-label">User</label>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>

                                        {formValues.searchBy === "recipe" ? (
                                            <>
                                                <div className="filter-category">
                                                    <Button variant="light d-block w-100 text-start"
                                                            onClick={() => setOpen({
                                                                ...open,
                                                                category: !open.category
                                                            })}>{open.category ? (<FiChevronDown/>) : (
                                                        <FiChevronUp/>)} Category</Button>
                                                    <Collapse in={open.category}>
                                                        <div className="options mb-3">
                                                            {categories.map(item => (
                                                                <>
                                                                    <div className="form-check">
                                                                        <Field type="checkbox" name="category"
                                                                               value={item}
                                                                               className="form-check-input"/>
                                                                        <label
                                                                            className="form-check-label">{item}</label>
                                                                    </div>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </Collapse>
                                                </div>

                                                <div className="filter-servings">
                                                    <Button variant="light d-block w-100 text-start"
                                                            onClick={() => setOpen({
                                                                ...open,
                                                                servings: !open.servings
                                                            })}>{open.servings ? (<FiChevronDown/>) : (
                                                        <FiChevronUp/>)} Servings</Button>
                                                    <Collapse in={open.servings}>
                                                        <div className="options mb-3">
                                                            <Field type="number" min={0} max={100} name="servings"
                                                                   className="form-control"/>
                                                        </div>
                                                    </Collapse>
                                                </div>

                                                <div className="filter-time">
                                                    <Button variant="light d-block w-100 text-start"
                                                            onClick={() => setOpen({
                                                                ...open,
                                                                time: !open.time
                                                            })}>{open.time ? (
                                                        <FiChevronDown/>) : (<FiChevronUp/>)} Time</Button>

                                                    <Collapse in={open.time}>
                                                        <div className="options mb-3">
                                                            <div>
                                                                <InputGroup>
                                                                    <Field type="number" min={0} max={23}
                                                                           className="form-control"
                                                                           value={values.timeHour}
                                                                           onChange={(e) => setFieldValue("timeHour", e.target.value)}/>
                                                                    <Button variant="light flex-1">Hour</Button>
                                                                </InputGroup>
                                                                <Slider
                                                                    className="w-100"
                                                                    axis="x"
                                                                    xstep={1}
                                                                    xmin={0}
                                                                    xmax={24}
                                                                    x={values.timeHour}
                                                                    onChange={({x}) => setFieldValue("timeHour", x)}
                                                                />
                                                            </div>

                                                            <div>
                                                                <InputGroup>
                                                                    <Field type="number" min={0} max={60}
                                                                           className="form-control"
                                                                           value={values.timeMin}
                                                                           onChange={(e) => setFieldValue("timeMin", e.target.value)}/>
                                                                    <Button variant="light flex-1">Min</Button>
                                                                </InputGroup>
                                                                <Slider
                                                                    className="w-100"
                                                                    axis="x"
                                                                    xstep={1}
                                                                    xmin={0}
                                                                    xmax={60}
                                                                    x={values.timeMin}
                                                                    onChange={({x}) => setFieldValue("timeMin", x)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Collapse>
                                                </div>

                                                <div className="filter-keywords">
                                                    <Button variant="light d-block w-100 text-start"
                                                            onClick={() => setOpen({
                                                                ...open,
                                                                keywords: !open.keywords
                                                            })}>{open.keywords ? (
                                                        <FiChevronDown/>) : (<FiChevronUp/>)} Keywords</Button>

                                                    <Collapse in={open.keywords}>
                                                        <div className="options mb-3">
                                                            <FieldArray name="keywords">
                                                                {({push, remove}) => (
                                                                    <>
                                                                        {values.keywords.map((_, index) => (
                                                                            <>
                                                                                <InputGroup>
                                                                                    <Field name={`keywords[${index}]`}
                                                                                           className="form-control"
                                                                                           type="text"/>
                                                                                    {values.keywords.length === 1 ? null : (
                                                                                        <Button variant={"danger"}
                                                                                                onClick={() => {
                                                                                                    remove(index)
                                                                                                }}><FaTrash/></Button>
                                                                                    )}
                                                                                </InputGroup>
                                                                            </>
                                                                        ))}
                                                                        <Button variant={"success"}
                                                                                onClick={() => push('')}
                                                                                className="mt-3 rounded-custom"><FiPlus/>Add
                                                                            Keyword</Button>
                                                                    </>
                                                                )}
                                                            </FieldArray>
                                                        </div>
                                                    </Collapse>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )}

                                        {/*<Button variant="black" type="submit">Apply</Button>*/}
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className="col-12 col-md-9">
                            <Dropdown>
                                <Dropdown.Toggle variant="black" className="text-end ms-auto d-block"
                                                 id="dropdown-sort">
                                    Sort By <FiChevronDown/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSortBy("newest")}>Newest</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortBy("oldest")}>Oldest</Dropdown.Item>
                                    {formValues.searchBy === "recipe" ? (
                                        <>
                                            <Dropdown.Item onClick={() => setSortBy("recentlyUpdated")}>Recently
                                                Updated</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setSortBy("mostFav")}>Most
                                                Favourites</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setSortBy("leastFav")}>Least
                                                Favourites</Dropdown.Item>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="row mt-1">
                                {formValues && formValues.searchBy === "recipe" ? (
                                    searchResult && searchResult.length !== 0 ? (
                                        searchResult?.map((result) => {
                                            return (
                                                <>
                                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5"
                                                         id={result._id}>
                                                        <RecipeItem key={result._id} recipe={result}/>
                                                    </div>
                                                </>
                                            )
                                        })
                                    ) : (
                                        <>
                                            <h5 className="text-dark">Uh oh... We can't find what you're looking for</h5>
                                        </>
                                    )

                                ) : (
                                    <>
                                        {/*<pre>{JSON.stringify(userSearchResult && userSearchResult, null, 2)}</pre>*/}
                                        {userSearchResult && userSearchResult ? (
                                            <>
                                                {userSearchResult.map((user) => {
                                                    return(
                                                        <div className="col-12 col-md-4">
                                                            <UserItem user={user}/>
                                                        </div>
                                                        )
                                                })}
                                            </>
                                            ) : (
                                                <>
                                                </>
                                        ) }
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}