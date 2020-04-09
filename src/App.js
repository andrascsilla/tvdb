import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { Container, Button, Card, CardTitle, CardText } from 'reactstrap';
import 'swagger-ui-react/swagger-ui.css';
import SearchField from './shared/components/SearchField';
import TableComponent from './shared/components/TableComponent';
import axios from 'axios';
import Modal from './shared/components/Modal';
import { useParams } from 'react-router-dom';

axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com';

const header = [
  { id: '1', value: 'Name' },
  { id: '2', value: 'Email' },
  { id: '3', value: 'Action' },
];

const StyledCard = styled(Card)`
  width: 70%;
  margin: 0 auto;
`;

const DetailButton = styled(Button)`
  width: 50%;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  text-align: center;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [modalUser, setModalUser] = useState();
  const { searchString } = useParams();

  console.log(searchString);
  useEffect(() => {
    if (typeof searchString === 'undefined') {
      axios.get(`/users`).then(resp => {
        setUsers(resp.data);
      });
    } else {
      axios.get(`/users?email=${searchString}`).then(resp => {
        setUsers(resp.data);
      });
    }
  }, []);

  function search(event) {
    axios.get(`/users?email=${event}`).then(res => {
      setUsers(res.data);
    });
  }

  function toggleModal(id) {
    const currentUser = users.find(user => user.id === id);
    setModalUser(currentUser);
  }

  return (
    <Container>
      <SearchField labelText="Search:" placeholder="Type a name here..." buttonText="Search" onSubmit={search} />

      <TableComponent header={header} onClick={() => console.log('xxxx')}>
        {users.map(user => (
          <tr
            key={user.id}
            onClick={() => {
              toggleModal(user.id);
            }}
          >
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <Link to={`/${user.id}`}>
                <Button color="info">Details</Button>
              </Link>
            </td>
          </tr>
        ))}

        {modalUser && (
          <Modal
            onClick={() => setModalUser()}
            isOpen={!!modalUser}
            title={modalUser.name}
            content={
              <StyledCard body>
                <CardTitle>
                  Details about <strong>{modalUser.name}</strong>
                </CardTitle>
                <CardText>Username: {modalUser.username}</CardText>
                <CardText>Email: {modalUser.email}</CardText>
                <CardText>Phone: {modalUser.phone}</CardText>
                <CardText>Website: {modalUser.website}</CardText>
                <StyledLink to={`/${modalUser.id}`}>
                  <DetailButton>Click here to find more about {modalUser.name}</DetailButton>
                </StyledLink>
              </StyledCard>
            }
          />
        )}
      </TableComponent>
    </Container>
  );
}

export default App;
