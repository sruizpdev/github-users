import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

const AppBar = styled.div`
  background-color: #2196f3;
  height: 50px;
  text-align: center;
  margin-bottom: 50px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

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
          }
          h1 {
            color: white;
          }
        `}
      />

      <AppBar>
        <h1>Filtrar por organizacion</h1>
      </AppBar>

      <Grid container justify="center" spacing={3}>
        <Grid item xs={5}>
          <form noValidate autoComplete="off" onSubmit={handleCompany}>
            <TextField
              id="standard-basic"
              label="Organización"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Button
              size="small"
              variant="contained"
              type="submit"
              color="primary"
            >
              Search by company
            </Button>
          </form>

          <Container maxWidth="sm">
            {members.map((member) => (
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Avatar alt="Remy Sharp" src={member.avatar_url} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.id}
                    secondary={
                      <Link
                        to={generatePath('/detail/:id', { id: member.login })}
                      >
                        {member.login}
                      </Link>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            ))}
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
