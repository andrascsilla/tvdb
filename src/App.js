import React, { useEffect } from 'react';
import './App.css';
import { Container, Row } from 'reactstrap';
// import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import SearchField from './shared/components/SearchField';
import TableComponent from './shared/components/TableComponent';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.thetvdb.com';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODY0NTAwMzcsImlkIjoidHZkYl9wcm9qZWN0Iiwib3JpZ19pYXQiOjE1ODU4NDUyMzcsInVzZXJpZCI6MjI2OTg1NywidXNlcm5hbWUiOiJhbmRyYXNjc2lsbGEifQ.sKXO0OPE_4gCvH_h_Ezmc0PCcvn67XEiIR0RdB_W8VQzLHiC2VZyYjGzKKVZiwl-yPZYb-Yj8uD2Fs6i7bo2PIGJmThg2XX1ogXE4zXti37UBFiNTFz7rZnylPr3hZv9A_06atHMia3ERU3t9sJ2wPR15BcTKfdPGgdg3cW9T2QMSQUkllmplBrLpzpvFib7TmD9hWKNpfxgiXLd7hyVVmB17SiR1_XXhLI803spOJI1z36Hb5KKo9RzdCgcFCHuvHDhwqZM1krHjc_OLYdJeSDIUpLeFK0dQyGOxCEd9j1FZy0tzLpre0jPRpV4xZ3T1EvzPNOa19M8yH-ti9-TXw';

const header = [
  { id: '1', value: 'Name' },
  { id: '2', value: 'Image' },
  { id: '3', value: 'firstAired' },
  { id: '4', value: 'Network' },
  { id: '5', value: 'Overview' },
];

const rows = [
  {
    id: '1',
    name: 'Film1',
    image: 'film1.png',
    firstAired: 'first film1',
    network: 'film1 network',
    overview: 'film1 overview',
  },
  {
    id: '2',
    name: 'Film2',
    image: 'film2.png',
    firstAired: 'first film2',
    network: 'film2 network',
    overview: 'film2 overview',
  },
  {
    id: '3',
    name: 'Film3',
    image: 'film3.png',
    firstAired: 'first film3',
    network: 'film3 network',
    overview: 'film3 overview',
  },
];

function App() {
  console.log('!!!!!' + process.env.AUTH_TOKEN);
  useEffect(() => {
    axios
      .get('/movieupdates')
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  });
  return (
    <Container>
      <Row>{/* <Col>
          <SwaggerUI url="https://api.thetvdb.com/swagger.json" />
        </Col> */}</Row>
      <SearchField
        labelText="Search:"
        placeholder="Type a film title here..."
        buttonText="Search"
        onSubmit={value => console.log('xxxx' + value)}
      />
      <TableComponent header={header} rows={rows} onClick={() => console.log('xxxx')} />
    </Container>
  );
}

export default App;
