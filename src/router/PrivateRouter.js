import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Alert from 'react-bootstrap/Alert';

const PrivateRouter = (props) => {
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return <>
      <Alert className='mt-3' variant="danger" >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          You don't have permission to access this route
        </p>
      </Alert>
    </>
  }
  console.log('You have permission to access this route')
  return (
    <>
      {props.children}
    </>
  )
}

export default PrivateRouter
