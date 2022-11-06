import {Button, Modal} from "react-bootstrap";
import {FiCheck, FiEdit, FiTrash, FiX} from "react-icons/fi";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteRecipe} from "../../features/recipe/recipeSlice";
import {toast} from "react-toastify";

export default function DashboardRecipeItem({recipe}) {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleDelete = () => {
        toast.success("Successfully deleted " + recipe.name)
        dispatch(deleteRecipe(recipe._id))
        handleClose()
    }

    const onDelete = (e) => {
        handleShow()
    }

    const onEdit = (e) => {

    }

    return (
        <>
            <div className="row bg-light rounded-3 mb-4 align-items-center">
                <div className="col-4 ps-0">
                    <div className="myRecipe-item">
                        <img src={`http://localhost:8000/api/upload/${recipe.image}`} alt=""/>
                    </div>
                </div>
                <div className="col-6 pt-4 pb-4 align-self-baseline">
                    <h4>{recipe.name}</h4>
                    <p>{recipe.description}</p>
                </div>
                <div className="col-2 pt-4 pb-4">
                    <Button variant="warning" className="d-block m-auto fs-4"
                            onClick={(e) => onEdit(e)}><FiEdit/></Button>
                    <Button variant="danger" className="d-block m-auto fs-4"
                            onClick={(e) => onDelete(e)}><FiTrash/></Button>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}
                   size="md"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {recipe.name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure about deleting this recipe?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" className="rounded-custom" onClick={handleClose}>
                        <FiX/> No
                    </Button>
                    <Button variant="success" className="rounded-custom" onClick={handleDelete}>
                        <FiCheck/> Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}