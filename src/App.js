import './App.scss'
import Container from 'react-bootstrap/Container';
import { Header } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppRoutes from './router/AppRoutes';

function App() {

  const { user, loginContext } = useContext(UserContext);
  const dataUserReducer = useSelector(state => state.user.account)
  console.log(dataUserReducer)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(
        localStorage.getItem('token'),
        localStorage.getItem('email')
      );
    }
  }, [])
  return (
    <>
      <div className="app">
        <Header />
        <Container>
          <AppRoutes />
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
