import ModalCreateUser from "./ModalCreateUser"
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react"
import { getAllUsers, getUsersWithPaginate } from "../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {

    const LIMIT_USER = 1;

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({})
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [listUsers, setistUsers] = useState([])

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        // fetchListUsers()
        fetchListUsersWithPaginate(1)
    }, [])
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        // console.log(res)
        if (res.EC === 0) {
            setistUsers(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUsersWithPaginate(page, LIMIT_USER)
        // console.log(res)
        if (res.EC === 0) {
            console.log('res.DT', res.DT)
            setistUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        // console.log('user update', user)
        setDataUpdate(user)
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true)
        // console.log('user update', user)
        setDataUpdate(user)
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true)
        // console.log('user update', user)
        setDataUpdate(user)
    }

    // console.log('check dataupdate', dataUpdate)

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}><FcPlus />Add new user</button>
                </div>

                <div className="table-users-container">
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    fetchListUsers={fetchListUsers}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    fetchListUsers={fetchListUsers}
                    dataUpdate={dataUpdate}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}
export default ManageUser