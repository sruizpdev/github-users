import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
            console.log('Respuesta de red OK pero respuesta HTTP no OK');
          }
        }
      );
    } else {
      alert('Debes rellenar el campo de busqueda');
    }
  };
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Filtrar por organizacion
          </Typography>
        </Toolbar>
      </AppBar>

      <form noValidate autoComplete="off" onSubmit={handleCompany}>
        <TextField
          id="standard-basic"
          label="Organización"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Button variant="contained" type="submit" color="primary">
          Search by company
        </Button>
      </form>
      <h2>Hello from List page</h2>
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
                <img src={member.avatar_url} style={{ width: '5rem' }} />
              </td>
              <td>
                <span>{member.id}</span>
              </td>
              <td>
                <Link to={generatePath('/detail/:id', { id: member.login })}>
                  {member.login}
                </Link>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
