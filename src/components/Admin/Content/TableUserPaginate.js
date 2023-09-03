import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

// const PaginatedItems = ({ itemsPerPage }) => {
//     // We start with an empty list of items.
//     const [currentItems, setCurrentItems] = useState(null);

//     // Here we use item offsets; we could also use page offsets
//     // following the API or data you're working with.
//     const [itemOffset, setItemOffset] = useState(0);

//     useEffect(() => {
//         // Fetch items from another resources.
//         const endOffset = itemOffset + itemsPerPage;
//         console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//         setCurrentItems(items.slice(itemOffset, endOffset));
//         setPageCount(Math.ceil(items.length / itemsPerPage));
//     }, [itemOffset, itemsPerPage]);

//     // Invoke when user click to request another page.


//     return (
//         <>
//             <Items currentItems={currentItems} />
//             <ReactPaginate
//                 nextLabel="next >"
//                 onPageChange={handlePageClick}
//                 pageRangeDisplayed={3}
//                 marginPagesDisplayed={2}
//                 pageCount={pageCount}
//                 previousLabel="< previous"
//                 pageClassName="page-item"
//                 pageLinkClassName="page-link"
//                 previousClassName="page-item"
//                 previousLinkClassName="page-link"
//                 nextClassName="page-item"
//                 nextLinkClassName="page-link"
//                 breakLabel="..."
//                 breakClassName="page-item"
//                 breakLinkClassName="page-link"
//                 containerClassName="pagination"
//                 activeClassName="active"
//                 renderOnZeroPageCount={null}
//             />
//         </>
//     );
// }


const TableUserPaginate = (props) => {

    const {
        listUsers,
        handleClickBtnUpdate,
        handleClickBtnView,
        handleClickBtnDelete,
        fetchListUsersWithPaginate,
        pageCount,
        currentPage, setCurrentPage
    } = props

    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
        // console.log(`User requested page number ${event.selected}`);
    };

    return (
        <div>
            <table className="table table-hover table-border">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => handleClickBtnView(item)}>View</button>
                                        <button className="btn btn-warning mx-3" onClick={() => handleClickBtnUpdate(item)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => handleClickBtnDelete(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>Not found data</td>
                        </tr>}
                </tbody>
            </table>
            <div className="user-paginate d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </div>
    )
}
export default TableUserPaginate