import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuizForAdmin } from '../../../../services/apiService';
import axios from 'axios';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, fetchQuiz, dataUpdate } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuizForAdmin(dataUpdate.id)
        console.log(data);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            await fetchQuiz()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>
                        {dataUpdate && dataUpdate.name ? dataUpdate.name : ''}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;