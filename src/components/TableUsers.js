
import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { fetchAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate';
const TableUsers = () => {

  const [listUser, setListUser] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    //lay phan tu từ trang dau tien
    getUsers(1);
  }, [])

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    console.log('>>>check res:', res)
    if (res && res.data) {
      setListUser(res.data)
      setTotalUsers(res.total)
      setTotalPages(res.total_pages)
    }
  }

  const handlePageClick = (e) => {
    //them dau cong de cover kieu string sang kieu number
    getUsers(+e.selected + 1);

  }
  return (
    <>
      <div className='mt-5'>
        <Container>
          <div className=''>

          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
              </tr>
            </thead>
            <tbody>
              {
                listUser && listUser.map((user, index) => {
                  return (
                    <tr key={`users-${index}`}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>
          <div className=' justify-content-center  d-flex'>

            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"

            />
          </div>
        </Container>
      </div>
    </>
  )
}

export default TableUsers