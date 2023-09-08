
import { Route, Routes } from 'react-router';
import { TableUsers, Login, Home } from '../components'
import PrivateRouter from './PrivateRouter';
import NotFound from './NotFound';

const AppRoutes = () => {
  return (
    <>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/user' element={
          <PrivateRouter>
            <TableUsers />
          </PrivateRouter>
        } />
        <Route path='/*' element={<NotFound />} />
      </Routes>

    </>
  )
}

export default AppRoutes
