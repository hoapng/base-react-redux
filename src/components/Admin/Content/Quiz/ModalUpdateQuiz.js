import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import axios from 'axios';
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
import _ from 'lodash'
import Select from 'react-select'

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
]

const ModalUpdateQuiz = (props) => {
    const { show, setShow, fetchQuiz, dataUpdate, resetUpdateData } = props;

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        // console.log('run useEffect', dataUpdate)
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setName(dataUpdate.name);
            // setPassword(dataUpdate.password);
            setType(dataUpdate.difficulty)
            // console.log("type", type)
            setDescription(dataUpdate.description);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false);
        setName('')
        setDescription('')
        setImage('')
        setPreviewImage('');
        resetUpdateData()
    };
    // const handleShow = () => setShow(true);

    const handleSubmitUpdateQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description required')
            return
        }

        let data = await putUpdateQuizForAdmin(dataUpdate.id, description, name, type, image)
        // console.log(data);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchQuiz()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage('')
        }
    }

    console.log('check render: dataUpdate', dataUpdate)

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add new user
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className='my-3'>
                            <Select
                                defaultValue={options.filter(function (option) {
                                    return option.value === type;
                                })}
                                onChange={setType}
                                options={options}
                            />
                        </div>
                        {/* <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select className="form-select" onChange={(event) => setType(event.target.value)} value={type}>
                                <option value='EASY'>EASY</option>
                                <option value='MEDIUM'>MEDIUM</option>
                                <option value='HARD'>HARD</option>
                            </select>
                        </div> */}
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <FcPlus />Upload File Image
                            </label>
                            <input
                                type='file'
                                id='labelUpload'
                                hidden
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} /> :
                                <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz