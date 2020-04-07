import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Container, Media } from 'reactstrap';

const StyledContainer = styled(Container)`
  margin-top: 50px;
`;

const MediaContainer = styled(Media)`
  width: 70%;
  margin: 0 auto;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 10px;
`;

const ImagePlaceholder = styled(Media)`
  width: 100px;
  height: 100px;
  background-color: #a9a9a9;
  border-radius: 50%;
  border: 10px solid #eee;
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 2px solid #eee;
  }
`;

const MediaBody = styled(Media)`
  padding: 0 25px;
`;

const EmailParagraph = styled.p`
  font-size: 14px;
  color: #808080;
`;

function User({ ...props }) {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`/users/${id}`).then(resp => {
      setUser(resp.data);
    });
  });

  return (
    <StyledContainer>
      <MediaContainer>
        <ImagePlaceholder left>
          <Media object />
        </ImagePlaceholder>
        <MediaBody body>
          <Media heading>
            {user.name} <span>({user.username})</span>
            <br />
            <EmailParagraph>{user.email}</EmailParagraph>
          </Media>
          <hr />
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          {user.address && (
            <p>
              <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}
            </p>
          )}
          {user.company && (
            <p>
              <strong>Company:</strong> {user.company.name}, {user.company.catchPhrase}
            </p>
          )}
        </MediaBody>
      </MediaContainer>
    </StyledContainer>
  );
}

export default User;
