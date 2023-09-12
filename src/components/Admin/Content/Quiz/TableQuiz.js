import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiService"
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = (props) => {

    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        setDataUpdate({})
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const handleClickBtnUpdate = (quiz) => {
        setShowModalUpdateQuiz(true)
        setDataUpdate(quiz)
    }

    const handleClickBtnDelete = (quiz) => {
        setShowModalDeleteQuiz(true)
        setDataUpdate(quiz)
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    // console.log('check dataupdate', dataUpdate)

    return (
        <>
            <div>List Quizzes:</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td style={{ display: "flex", gap: '15px' }}>
                                        <button className="btn btn-warning" onClick={() => handleClickBtnUpdate(item)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleClickBtnDelete(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>Not found data</td>
                        </tr>}
                </tbody>
            </table>
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                fetchQuiz={fetchQuiz}
                dataUpdate={dataUpdate}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                fetchQuiz={fetchQuiz}
                dataUpdate={dataUpdate}
                resetUpdateData={resetUpdateData}
            />
        </>
    )
}
export default TableQuiz