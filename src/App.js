import './App.scss'
import Container from 'react-bootstrap/Container';
import { Header } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AppRoutes from './router/AppRoutes';
import { handlerReFetch } from './redux/actions/userActions';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(handlerReFetch());
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
