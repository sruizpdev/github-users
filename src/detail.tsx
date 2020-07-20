import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

const Details = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 400px;
  border: 1px solid #eeeeee;
  padding: 20px;
  border-radius: 10px;
`;
interface MemberDetailEntity {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
}

const createDefaultMemberDetail = () => ({
  id: '',
  login: '',
  name: '',
  company: '',
  bio: '',
});

export const DetailPage: React.FC = () => {
  const [member, setMember] = React.useState<MemberDetailEntity>(
    createDefaultMemberDetail()
  );
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, []);

  return (
    <>
      <Global
        styles={css`
          html {
            font-family: 'PT Sans', sans-serif;
            background-color: #fafafa;
            margin-top: 50px;
          }
          h2 {
            color: #2196f3;
          }
        `}
      />
      <Details>
        <h2>Detail page</h2>
        <p> id: {member.id}</p>
        <p> login: {member.login}</p>
        <p> name: {member.name}</p>
        <p> company: {member.company}</p>
        <Link to="/list">Back to list page</Link>
      </Details>
    </>
  );
};
