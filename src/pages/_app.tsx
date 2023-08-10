import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from '../utils/create-emotion-cache';
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'simplebar-react/dist/simplebar.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Table } from "../sections/components/tables/table";
import { Form } from "../sections/components/forms/form";
import { useState } from "react";
import User from '../types/user';
import { addNewUser, deleteNewUser, editNewUser } from '../api/users';
import {useMediaQuery} from "@mui/material";

const clientSideEmotionCache = createEmotionCache();

const App = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  const matches = useMediaQuery('(max-width:772px)', { noSsr: true });

  const [users, setUsers] = useState([
      {
          id: '5eff254e46b753a166e7d7af',
          userRole: 'Administrator',
          name: 'Susan',
          email: 'susan@email.com',
          description: 'Test data'
      },
      {
          id: '5eff254e46b753a166e7d7ad',
          userRole: 'Doctor',
          name: 'John',
          email: 'john@email.com',
          description: 'Test data'
      }
  ])

  const [selectedUser, setSelectedUser] = useState({
      id: '',
      userRole: '',
      name: '',
      email: '',
      description: ''
  })

  const editUser: any = (userData: User) => {
      const _id = userData.id;
      setUsers(prevState => {
          const newState = prevState.map(el => {
              if(el.id === userData.id) {
                  return userData;
              }
              return el;
          })
          return newState;
      })
      setSelectedUser({
          id: '',
          userRole: '',
          name: '',
          email: '',
          description: ''
      });
      // TODO: send data to api
      editNewUser(userData)
          .then(data => {
            if(data.status === 200) {
                console.log('Success')
            }
          })
          .catch(error => {
              console.log('Error: ', error)
          })
  }

  const addUser: any = (userData: User) => {
      setUsers(prevState => [...prevState, userData])
      addNewUser(userData)
          .then(data => {
              if(data.status === 200) {
                  console.log('Success')
              }
          })
          .catch(error => {
              console.log('Error: ', error)
          })
      // TODO: send data to api
  }

  const deleteItem = (id: string): void => {
      let newUsersList: User[] = [];
      newUsersList.push(...users.filter((user: User) => (user.id !== id)));
      setUsers([...newUsersList]);
      if (selectedUser.hasOwnProperty('id')) {
          if (selectedUser.id === id) {
              setSelectedUser({
                  id: '',
                  userRole: '',
                  name: '',
                  email: '',
                  description: ''
              });
          }
      }
      // TODO: send data to api
      deleteNewUser(id)
          .then(data => {
              if(data.status === 200) {
                  console.log('Success')
              }
          })
          .catch(error => {
              console.log('Error: ', error)
          })
  }
  return (
    <CacheProvider value={emotionCache}>
        <div style={{padding: matches ? '12px' : '64px'}}>
            <div style={{maxWidth: '1152px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '15px'}}>
                <h1 style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '32px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '120%',
                    marginBottom: '15px'
                }}>Next.js Integration Test Sample</h1>
                <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '120%',
                    marginBottom: '15px'
                }}>Brought to you by Creating Waves Holdings Ltd</p>
            </div>
            <div style={{maxWidth: '1152px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '15px'}}>
                <Form
                    editUser={null}
                    users={users}
                    setUsers={setUsers}
                    headerTitle={"Data Entry Test"}
                    addFunc={addUser}
                    editFunc={null}
                />
            </div>
            <div style={{maxWidth: '1152px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '15px'}}>
                <Table
                    deleteItem={deleteItem}
                    users={users}
                    setUsers={setUsers}
                    setSelectedUser={setSelectedUser}
                />
            </div>
            { selectedUser && selectedUser.hasOwnProperty('id') && selectedUser.id ?
                <div style={{maxWidth: '1152px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Form
                        editUser={selectedUser}
                        users
                        setUsers
                        headerTitle={"Manage/Edit Entry Test"}
                        addFunc={null}
                        editFunc={editUser}
                    />
                </div> : null
            }
        </div>
    </CacheProvider>
  );
};

export default App;
