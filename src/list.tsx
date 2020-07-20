import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

const AppBar = styled.div`
  background-color: #2196f3;
  height: 50px;
  text-align: center;
  margin-bottom: 50px;
`;
const Input = styled.input`
  border: 1px solid #eeeeee;
  padding: 0.8rem;
  border-radius: 5px;
  font-size: 1rem;
  width: 250px;
`;
const ButtonSearch = styled.input`
  border: 1px solid #eeeeee;
  padding: 0.8rem;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #2196f3;
  color: white;
  width: 100px;
  margin-left: 20px;

  &:hover {
    color: #2196f3;
    cursor: pointer;
    background-color: white;
  }
`;
const Container = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  border: 1px solid #eeeeee;
`;
const Avatar = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const Enlace = styled.span`
  color: black;
  &:hover {
    color: #2196f3;
  }
`;

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [company, setCompany] = React.useState('lemoncode');
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${company}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);

  const handleCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (company !== '') {
      fetch(`https://api.github.com/orgs/${company}/members`).then(
        (response) => {
          if (response.ok) {
            response.json().then((json) => setMembers(json));
          } else {
            console.log('Respuesta HTTP no OK');
          }
        }
      );
    } else {
      alert('Debes rellenar el campo de busqueda');
    }
  };
  return (
    <>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            list-style: none;
            text-decoration: none;
            border: none;
            outline: none;
          }
          html {
            font-family: 'PT Sans', sans-serif;
            background-color: #fafafa;
          }
          h1 {
            color: white;
          }
          table {
            margin-top: 30px;
            width: 100%;
          }
          th,
          td {
            width: 33%;
            text-align: left;
            padding: 0.7rem;
          }
        `}
      />

      <AppBar>
        <h1>Filtrar por organizacion</h1>
      </AppBar>
      <Container>
        <Form onSubmit={handleCompany}>
          <Input value={company} onChange={(e) => setCompany(e.target.value)} />
          <ButtonSearch type="submit" value="Buscar" />
        </Form>

        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>
                  <Avatar alt="Remy Sharp" src={member.avatar_url} />
                </td>
                <td>
                  <span>{member.id}</span>
                </td>
                <td>
                  <Link to={generatePath('/detail/:id', { id: member.login })}>
                    <Enlace>{member.login}</Enlace>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
};
