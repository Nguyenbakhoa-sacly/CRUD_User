import './App.scss'
import Container from 'react-bootstrap/Container';
import { Header, TableUsers } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
function App() {
  const [show, setShow] = useState(false)

  const handleAddNewUser = () => {
    setShow(true);
  }

  return (
    <>
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

          <TableUsers
            show={show}
            onHide={() => setShow(false)}
          />

        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
