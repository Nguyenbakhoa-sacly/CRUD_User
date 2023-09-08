
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';

const PrivateRouter = (props) => {
  const user = useSelector(state => state.user.account)
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
  return (
    <>
      {props.children}
    </>
  )
}

export default PrivateRouter
