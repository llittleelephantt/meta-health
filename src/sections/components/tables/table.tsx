import type { FC } from 'react';
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  SvgIcon,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import User from 'src/types/user';

interface PreviewerProps {
    deleteItem: any,
    users: User[];
    setUsers: any;
    setSelectedUser: any;
}

export const Table: FC<PreviewerProps> = ({deleteItem, users, setUsers, setSelectedUser}) => {
  const [sortParams, setSortParams] = useState({
    userRole: true,
    name: true,
    email: true,
    description: true
  });
  const [activeSort, setActiveSort] = useState({
    userRole: false,
    name: false,
    email: false,
    description: false
  });

  const sort = (items: any, sortParam: string): void => {
      type SortParams = { [propKey: string]: boolean }
      type sortElement = { [propKey: string]: string }
      const sortItems: SortParams = sortParams;

      const sortedItems = items.sort((a: sortElement, b: sortElement) => {
          const nameA: string = a[sortParam].toUpperCase();
          const nameB: string = b[sortParam].toUpperCase();
          if(sortItems[sortParam]) {
              if (nameA < nameB) {
                  return -1;
              }
              if (nameA > nameB) {
                  return 1;
              }
          } else {
              if (nameA > nameB) {
                  return -1;
              }
              if (nameA < nameB) {
                  return 1;
              }
          }

          return 0;
      });
      setUsers(sortedItems);
  }

  return (
  <Box
    sx={{
      backgroundColor: (theme) => theme.palette.mode === 'dark'
        ? 'neutral.800'
        : 'neutral.100',
      p: 0
    }}
  >
    <Card
        style={{
            borderRadius: '20px',
            boxShadow: "0px 5px 22px 0px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)"
        }}
    >
      <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '120%',
          padding: '24px'
      }}>
          Delete and Sort Test
      </h2>
      <Divider />
      <Scrollbar>
        <MuiTable sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow style={{backgroundColor: '#F8F9FA'}}>
              <TableCell
                  sx={{textTransform: 'uppercase', fontWeight: 600}}
                  sortDirection={activeSort.userRole ? sortParams.userRole ? 'desc' : 'asc' : false}
              >
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                  onClick={(event)=>{
                    setSortParams(
                        {
                          ...sortParams,
                          userRole: !sortParams.userRole
                        }
                    );
                    setActiveSort(
                        {
                          userRole: true,
                          name: false,
                          email: false,
                          description: false
                        }
                    );
                    sort(users, 'userRole');
                  }}
                >
                  <TableSortLabel
                    active={activeSort.userRole}
                    direction={sortParams.userRole ? 'desc' : 'asc'}
                  >
                    User-role
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                  sx={{textTransform: 'uppercase', fontWeight: 600}}
                  sortDirection={activeSort.name ? sortParams.name ? 'desc' : 'asc' : false}
              >
                <Tooltip
                    enterDelay={300}
                    title="Sort"
                    onClick={()=>{
                      setSortParams(
                          {
                            ...sortParams,
                            name: !sortParams.name
                          }
                      )
                      setActiveSort(
                          {
                            userRole: false,
                            name: true,
                            email: false,
                            description: false
                          }
                      )
                      sort(users, 'name');
                    }}
                >
                  <TableSortLabel
                      active={activeSort.name}
                      direction={sortParams.name ? 'desc' : 'asc'}
                  >
                    Name
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                  sx={{textTransform: 'uppercase', fontWeight: 600}}
                  sortDirection={activeSort.email ? sortParams.email ? 'desc' : 'asc' : false}
              >
                <Tooltip
                    enterDelay={300}
                    title="Sort"
                    onClick={()=>{
                      setSortParams(
                          {
                            ...sortParams,
                            email: !sortParams.email
                          }
                      )
                      setActiveSort(
                          {
                            userRole: false,
                            name: false,
                            email: true,
                            description: false
                          }
                      )
                      sort(users, 'email');
                    }}
                >
                  <TableSortLabel
                      active={activeSort.email}
                      direction={sortParams.email ? 'desc' : 'asc'}
                  >
                    EMAIL
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                  sx={{textTransform: 'uppercase', fontWeight: 600}}
                  sortDirection={activeSort.description ? sortParams.description ? 'desc' : 'asc' : false}
              >
                <Tooltip
                    enterDelay={300}
                    title="Sort"
                    onClick={()=>{
                      setSortParams(
                              {
                                ...sortParams,
                                description: !sortParams.description
                              }
                          )
                      setActiveSort(
                          {
                            userRole: false,
                            name: false,
                            email: false,
                            description: true
                          }
                      )
                      sort(users, 'description');
                    }}
                >
                  <TableSortLabel
                      active={activeSort.description}
                      direction={sortParams.description ? 'desc' : 'asc'}
                  >
                    Description
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                  sx={{textTransform: 'uppercase', fontWeight: 600}}
                  align={'center'}
              >
                Manage
              </TableCell>
              <TableCell
                  sx={{textTransform: 'uppercase', fontWeight: 600}}
                  align={'center'}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow
                  hover
                  key={user.id}
                >
                  <TableCell>
                    <Typography>
                      {user.userRole}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.description}
                  </TableCell>
                  <TableCell align={'center'}>
                    <div
                        style={{cursor: 'pointer'}}
                        onClick={()=>{
                            setSelectedUser(user);
                        }}
                    >
                      <img
                          alt={'Edit'}
                          src={'/assets/icons/edit.svg'}
                      />
                    </div>
                  </TableCell>
                  <TableCell align={'center'}>
                    <div
                        style={{cursor: 'pointer'}}
                        onClick={()=>{
                            deleteItem(user.id)
                        }}
                    >
                      <img
                          alt={'Delete'}
                          src={'/assets/icons/x.svg'}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </Scrollbar>
    </Card>
  </Box>
)}
