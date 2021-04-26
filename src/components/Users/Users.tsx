import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow } from '@material-ui/core';

import useStyles from './Users.styles';
import UpdateUserRoleDialog from './UpdateUserRoleDialog/UpdateUserRoleDialog';
import api, { UserRole } from '../../api';
import { setUsers } from '../../state/users/users.actions';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector } from '../../state/users/users.selectors';
import { stringify } from 'node:querystring';
import { accessTokenSelector } from '../../state/auth/auth.selectors';

const Users: React.FunctionComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);
    const accessToken = useSelector(accessTokenSelector);
    const [toBeUpdatedUserRole, setToBeUpdatedUserRole] = useState<{ email: string; role: UserRole } | undefined>(
        undefined,
    );

    const fetchUsers = async () => {
        const { data } = await api.users.getAllUsers({ headers: { Authorization: `Bearer ${accessToken}` } });
        dispatch(setUsers(data));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={classes.root}>
            <h1 className={classes.header}>Users</h1>
            <TableContainer component={Paper}>
                <Table aria-label='simple table' size='small'>
                    <TableHead style={{ backgroundColor: 'lightgrey' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>User actions (Update Role)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component='th' scope='row'>
                                    {user.id}
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => setToBeUpdatedUserRole({ email: user.email, role: user.role })}
                                        variant='contained'
                                        color='primary'
                                        size='small'
                                    >
                                        Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {toBeUpdatedUserRole && (
                <UpdateUserRoleDialog
                    userData={toBeUpdatedUserRole}
                    onClose={() => setToBeUpdatedUserRole(undefined)}
                ></UpdateUserRoleDialog>
            )}
        </div>
    );
};

export default Users;
