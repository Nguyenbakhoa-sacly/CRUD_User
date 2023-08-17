import './App.scss'
import Container from 'react-bootstrap/Container';
import { Header, TableUsers, ModalAddNew } from './components';
import { useState } from 'react';

function App() {

  const [show, setShow] = useState(false)
  const handleAddNewUser = () => {
    setShow(true);
  }
  return (
    <div className="app">
      <Header />
      <Container>
        <div className='mt-3 d-flex justify-content-between align-items-center '>
          <p className='mb-0 fs-4 fw-semibold'>List Users</p>
          <button
            onClick={() => handleAddNewUser()}
            className='btn btn-success '
          >Add New User</button>
        </div>
        <TableUsers />
      </Container>

      <ModalAddNew
        show={show}
        onHide={() => setShow(false)}
      />

    </div>
  );
}

export default App;
