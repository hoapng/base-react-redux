import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUsers } from '../../../services/apiService';
import axios from 'axios';

const ModalDeleteUser = (props) => {
    const { show, setShow, fetchListUsers, dataUpdate } = props;

    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser = async () => {
        let data = await deleteUsers(dataUpdate.id)
        // console.log(data);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUsers()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    };

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>
                        {dataUpdate && dataUpdate.email ? dataUpdate.email : ''}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;