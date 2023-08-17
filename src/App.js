import './App.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Header, TableUsers } from './components';

function App() {
  return (
    <div className="app">
      <Header />
      <TableUsers />
    </div>
  );
}

export default App;
