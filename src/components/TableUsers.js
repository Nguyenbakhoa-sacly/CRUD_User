
import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { fetchAllUser } from '../services/UserService'

const TableUsers = () => {

  const [listUser, setListUser] = useState([])

  useEffect(() => {
    getUsers();
  }, [])


  const getUsers = async () => {
    let res = await fetchAllUser();
    if (res && res.data && res.data.data.length > 0) {
      setListUser(res.data.data)
    } else {

    }

  }
  console.log(listUser)
  return (
    <>
      <div className='mt-5'>
        <Container>
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
        </Container>
      </div>
    </>
  )
}

export default TableUsers