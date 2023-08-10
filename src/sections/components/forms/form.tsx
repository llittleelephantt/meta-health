import type { FC } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    ButtonProps,
    CardActions,
    CardContent,
    TextField,
    Unstable_Grid2 as Grid, useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {ReactNode, useEffect, useState} from "react";
import User from '../../../types/user';

type Role = {
  text: string;
  value: string;
};

const userRole: Role[] = [
  { text: 'Administrator', value: 'Administrator' },
  { text: 'Doctor', value: 'Doctor' }
];

interface PreviewerProps {
  headerTitle: string;
  users: any;
  setUsers: any;
  addFunc: any;
  editFunc: any;
  editUser: any;
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'white',
  width: '150px',
  borderRadius: '12px',
  backgroundColor: '#10B2E1',
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.08)',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: '#0A591B',
  },
}));

export const Form: FC<PreviewerProps> = ({editUser, users, setUsers, headerTitle, addFunc, editFunc}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState({
      value: '',
      text: ''
  });
  const [description, setDescription] = useState('');

  const initPage = () => {
      try {
          if (editFunc && editUser && editUser.hasOwnProperty('id') && editUser.id) {
              const oldUser: User = editUser;
              setName(oldUser.name);
              setEmail(oldUser.email);
              setDescription(oldUser.description);
              const oldRole: Role = userRole.filter(el => el.value === oldUser.userRole)[0]

              setRole({value: oldRole.value, text: oldRole.text});
          }
      } catch (e) {
          console.log('e', e)
      }
  }

  useEffect(() => {
      initPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
      initPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editUser])

  const clearFields = () => {
      setName('');
      setEmail('');
      setRole({
          value: '',
          text: ''
      });
      setDescription('');
  }
  const matches = useMediaQuery('(max-width:772px)', { noSsr: true });

  const style = {
      maxWidth: matches ? '100%' : 'calc(100% - 220px)',
      minWidth: matches ? 'auto' : '360px',
      marginLeft: 'auto',
      marginRight: 'auto'
  }
  return (
      <Box sx={{p: 0}}>
        <form
            style={{
              borderRadius: '20px',
              boxShadow: "0px 5px 22px 0px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)",
              padding: '32px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
            onSubmit={(e) => {
                e.preventDefault();
              if(addFunc) {
                  const newUser: User = {
                      id: new Date().getTime().toString(),
                      userRole: role.value,
                      name: name,
                      email: email,
                      description: description
                  }
                  clearFields();
                  addFunc(newUser);
              }
              if (editFunc) {
                  const newUser: User = {
                      id: editUser.id,
                      userRole: role.value,
                      name: name,
                      email: email,
                      description: description
                  }
                  clearFields();
                  editFunc(newUser);
              }
            }}
        >
          <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '120%',
              minWidth: '220px',
              margin: 0,
              marginBottom: '24px'
          }}>
              {headerTitle}
          </h2>
          <div style={style}>
            <CardContent
                sx={{
                  maxWidth: '780px',
                  p: 0
                }}
            >
              <Grid
                  container
                  spacing={3}
              >
                <Grid
                    xs={12}
                    md={12}
                >
                  <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid
                    xs={12}
                    md={12}
                >
                  <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid
                    xs={12}
                    md={12}
                >
                  <Autocomplete
                      getOptionLabel={(userRole: Role) => userRole.text}
                      options={userRole}
                      value={role}
                      fullWidth
                      onChange={(event, newValue) => {
                          if(newValue) {
                              setRole({text: newValue.text, value: newValue.value})
                          }
                      }}
                      renderInput={(params): JSX.Element => (
                          <TextField
                              {...params}
                              fullWidth
                              required
                              label="User role"
                              name="userRole"
                          />
                      )}
                  />
                </Grid>
                <Grid
                    xs={12}
                    md={12}
                >
                  <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
                sx={{
                  maxWidth: '780px',
                  justifyContent: 'flex-end',
                  p: 0,
                  paddingTop: '24px'
                }}
            >
              <ColorButton
                  color="primary"
                  type="submit"
                  variant="contained"
              >
                Save
              </ColorButton>
            </CardActions>
          </div>
        </form>
      </Box>
  )
}
