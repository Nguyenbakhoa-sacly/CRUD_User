
import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { fetchAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate';
import { ModalAddNew } from '../components';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import lodash from 'lodash';
import { debounce } from 'lodash';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BsFillFileEarmarkPlusFill, BsSortNumericDownAlt, BsSortNumericUp } from 'react-icons/bs'
import { FaFileExport } from 'react-icons/fa'
import { CSVLink } from "react-csv";
import Papa from 'papaparse'
import { toast } from 'react-toastify';

const TableUsers = (props) => {
  // const { show, onHide } = props;
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDel, setShowDel] = useState(false)
  const [listUser, setListUser] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [dataEditUser, setDataEditUser] = useState({})
  const [dataDelUser, setDataDelUser] = useState({})
  const [dataExport, setDataExport] = useState([])
  //sap xep tang dan
  //sap xep mac dinh la tang dan
  const [sortBy, setSortBy] = useState('asc')
  //sap xep theo truong id
  const [fieldSort, setFieldSort] = useState('id')



  useEffect(() => {
    //lay phan tu từ trang dau tien
    getUsers(1);
  }, [])

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUser(res.data)
      setTotalUsers(res.total)
      setTotalPages(res.total_pages)
    }
  }
  //update user
  const handleUpDateTable = (user) => {
    setListUser([user, ...listUser])
  }


  const handleEditUserFromEdit = (user) => {
    let cloneListUser = lodash.cloneDeep(listUser)
    //tim index va so sach index cua user from edit
    let index = listUser.findIndex(index => index.id === user.id);
    //thay the firsrt_name 
    cloneListUser[index].first_name = user.first_name
    setListUser(cloneListUser)
  }

  const handelDelUsersfromConfirm = (user) => {
    let cloneListUser = lodash.cloneDeep(listUser)
    cloneListUser = cloneListUser.filter(item => item.id !== user.id)
    setListUser(cloneListUser)
    console.log(cloneListUser)
  }
  //phan trang
  const handlePageClick = (e) => {
    //them dau cong de cover kieu string sang kieu number
    getUsers(+e.selected + 1);

  }

  //add user
  const handleAddNewUser = () => {
    setShow(true);
  }

  //edit
  const handleEditUser = (user) => {
    setShowEdit(true)
    setDataEditUser(user)

  }

  //delete
  const handelDelUser = (user) => {
    setShowDel(true)
    setDataDelUser(user)
  }
  //sap xep
  const handleSortfield = (sortBy, fieldSort) => {
    setSortBy(sortBy)
    setFieldSort(fieldSort)
    let cloneListUser = lodash.cloneDeep(listUser);
    cloneListUser = lodash.orderBy(cloneListUser, [fieldSort], [sortBy]);
    setListUser(cloneListUser)
  }
  //search
  const handleSearch = debounce((e) => {
    let key = e.target.value
    if (key) {
      let cloneListUser = lodash.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter(item => item.email.includes(key))
      console.log(cloneListUser)
      setListUser(cloneListUser)
    } else {
      getUsers(1);
    }
  }, 300)
  //export
  const getUserExport = (event, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      //tao header 
      result.push(['ID', 'Email', 'First Name', 'Last Name'])

      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      })
      setDataExport(result)
      //xu  ly song va render
      done();
    }
  }
  //import
  const handleImportUser = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0]

      if (file.type !== 'text/csv') {
        toast.error('Only accept csv file ...')
        return;
      }
      Papa.parse(file, {
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (rawCSV[0][0] !== "email"
                || rawCSV[0][1] !== "first_name"
                || rawCSV[0][2] !== "last_name"
              ) {
                toast.error(' Wrong formst header csv file!')
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0]
                    obj.first_name = item[1]
                    obj.last_name = item[2]
                    result.push(obj);
                  }
                })
                console.log('check result:', result)
                setListUser(result)
              }
            } else {
              toast.error(' Wrong  formst csv file!')
            }
          } else {
            toast.error(' Not found data on CSV file!')
          }
          console.log(rawCSV)
        }
      })

    }
  }

  return (
    <>
      <div className='mt-3 d-flex justify-content-between align-items-center '>
        <p className='mb-0 fs-4 fw-semibold'>List Users</p>
        <button
          onClick={() => handleAddNewUser()}
          className='btn btn-outline-success '
        >Add New User</button>
      </div>
      <div className=''>
        <div className='d-flex align-items-center  justify-content-between  my-4 '>
          <input
            className='w-25 form-control me-3 py-2'
            placeholder='Search user by email...'
            onChange={(e) => handleSearch(e)}
          />

          <div>
            {/* import */}
            <button className='btn btn-outline-success me-2'>
              <label htmlFor='import'>
                <BsFillFileEarmarkPlusFill className='fs-4 me-1 ' />
                Import
              </label>
            </button>
            <input
              onChange={(e) => handleImportUser(e)}
              type='file'
              id='import'
              hidden />
            {/* export */}
            <CSVLink
              filename={"Users.csv"}
              target="_blank"
              data={dataExport}
              asyncOnClick={true}
              onClick={getUserExport}
            >
              <button className='btn btn-outline-success '>
                <FaFileExport className='fs-4 me-1' />
                Export
              </button>
            </CSVLink>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='d-flex justify-content-between  '>
                ID
                <div className=''>
                  <BsSortNumericDownAlt
                    onClick={() => handleSortfield('desc', 'id')}
                    className='fs-3 me-2 sort_table' />
                  <BsSortNumericUp
                    onClick={() => handleSortfield('asc', 'id')}
                    className='fs-3 sort_table' />
                </div>
              </th>
              <th>Email</th>
              <th className='d-flex justify-content-between '>
                First name
                <div className=''>
                  <AiOutlineSortAscending
                    onClick={() => handleSortfield('desc', 'first_name')}
                    className='fs-3 me-2 sort_table' />
                  <AiOutlineSortDescending
                    onClick={() => handleSortfield('asc', 'first_name')}
                    className='fs-3 sort_table' />
                </div>
              </th>
              <th>Last name</th>
              <th>Actions</th>
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
                    <td className=' flex flex-row '>
                      <button
                        onClick={() => handleEditUser(user)}
                        className='btn btn-outline-primary me-3'>Edit
                      </button>
                      <button
                        onClick={() => handelDelUser(user)}
                        className='btn btn-outline-danger'>Delete
                      </button>
                    </td>
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
      </div>


      <ModalAddNew
        show={show}
        onHide={() => setShow(false)}
        handleUpDateTable={handleUpDateTable}
      />

      <ModalEditUser
        show={showEdit}
        onHide={() => setShowEdit(false)}
        dataEditUser={dataEditUser}
        handleEditUserFromEdit={handleEditUserFromEdit}
      />
      <ModalConfirm
        show={showDel}
        onHide={() => setShowDel(false)}
        dataDelUser={dataDelUser}
        handelDelUsersfromConfirm={handelDelUsersfromConfirm}
      />
    </>
  )
}

export default TableUsers