import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

const Login = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 300px;
  border: 1px solid #eeeeee;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
`;
const Input = styled.input`
  border: 1px solid #eeeeee;
  padding: 0.8rem;
  border-radius: 5px;
  font-size: 1rem;
  width: 200px;
  display: block;
  margin-bottom: 20px;
`;
const ButtonLogin = styled.button`
  border: 1px solid #eeeeee;
  padding: 0.8rem;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #2196f3;
  color: white;
  width: 100%;

  &:hover {
    color: #2196f3;
    cursor: pointer;
    background-color: white;
  }
`;

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === 'admin' && password === 'test') {
      history.push('/list');
    } else {
      alert('User / password not valid, psst... admin / test');
    }
  };

  return (
    <>
      <Login>
        <form onSubmit={handleNavigation}>
          <h2>Hello from login page</h2>
          <div>
            <label>Username: </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password: </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <ButtonLogin type="submit">login</ButtonLogin>
        </form>
      </Login>
    </>
  );
};
