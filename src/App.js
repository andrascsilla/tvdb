import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { Container, Button, Card, CardTitle, CardText } from 'reactstrap';
import 'swagger-ui-react/swagger-ui.css';
import SearchField from './shared/components/SearchField';
import TableComponent from './shared/components/TableComponent';
import axios from 'axios';
import Modal from './shared/components/Modal';

// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com';

const header = [
  { id: '1', value: 'Name' },
  { id: '2', value: 'Email' },
  { id: '3', value: 'Action' },
  { id: '4', value: '' },
];

const StyledCard = styled(Card)`
  width: 70%;
  margin: 0 auto;
`;

const DetailButton = styled(Button)`
  width: 50%;
  margin: 0 auto;
`;

function App() {
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   axios.get('/user').then(resp => {
  //     setMovies(resp.data.results);
  //     console.log('xxx' + resp.data.results);
  //   });
  // }, []);

  const [users, setUsers] = useState([]);
  const [isOpen, setModal] = useState(false);
  const [userID, setUserID] = useState([]);

  //SEARCH
  const [searchState, setSearch] = useState([
    {
      searchTerm: '',
    },
  ]);

  function search(event) {
    event.preventDefault();
    axios
      .get(`/users?name=${searchState.searchTerm}`)
      .then(res => res.data)
      .then(res => {
        if (!res.Search) {
          setSearch({ users: [] });
          return;
        }

        const users = res.Search.map(user => user.name);
        setSearch(users);
        console.log(searchState.searchTerm);
      });
  }

  function handleChange(event) {
    setSearch({
      searchTerm: event.target.value,
    });
    console.log(searchState.searchTerm);
  }
  //SEARCH

  useEffect(() => {
    axios.get('/users').then(resp => {
      setUsers(resp.data);
    });
  }, []);

  function handleClick() {
    axios.get(`/users/${userID}`).then(resp => {
      setUserID(resp.data);
      console.log(userID.id);
    });
  }

  function toggleModal() {
    setModal(!isOpen);
  }

  return (
    <Container>
      <SearchField
        labelText="Search:"
        placeholder="Type a name here..."
        buttonText="Search"
        onSubmit={search}
        onChange={handleChange}
        // onChange={handleChange(users.filter(value => value !== 'valami'.value))}
      />

      <TableComponent header={header} onClick={() => console.log('xxxx')}>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <>
                <Button color="primary" onClick={toggleModal}>
                  Details
                </Button>

                {/* TODO: specified data for every user */}
                <Modal
                  onClick={toggleModal}
                  isOpen={isOpen}
                  title={user.name}
                  content={
                    <StyledCard body>
                      <CardTitle>Details about: {user.name}</CardTitle>
                      <CardText>Username: {user.username}</CardText>
                      <CardText>Email: {user.email}</CardText>
                      <CardText>Phone: {user.phone}</CardText>
                      <CardText>Website: {user.website}</CardText>
                      <DetailButton>Click here to find more about {user.name}</DetailButton>
                    </StyledCard>
                  }
                  closeButtonText="Cancel"
                />
              </>
            </td>
            <td>
              <Button color="primary" onClick={() => handleClick(userID.id)}>
                Click
              </Button>
            </td>
          </tr>
        ))}
      </TableComponent>
    </Container>
  );
}

export default App;
