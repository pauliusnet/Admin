import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow } from '@material-ui/core';

import useStyles from './Users.styles';
import UpdateUserRoleDialog from './UpdateUserRoleDialog/UpdateUserRoleDialog';

const Users: React.FunctionComponent = () => {
    const classes = useStyles();
    const [isUpdateUserRoleDialogOpen, setIsUpdateUserRoleDialogOpen] = useState(false);

    return (
        <div className={classes.button}>
            <Button
                onClick={() => setIsUpdateUserRoleDialogOpen(true)}
                variant='contained'
                color='primary'
                size='medium'
            >
                Change user role
            </Button>

            {isUpdateUserRoleDialogOpen && (
                <UpdateUserRoleDialog onClose={() => setIsUpdateUserRoleDialogOpen(false)}></UpdateUserRoleDialog>
            )}
        </div>
    );
};

export default Users;
