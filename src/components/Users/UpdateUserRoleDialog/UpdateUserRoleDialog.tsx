import classes from '*.module.css';
import {
    Button,
    DialogContent,
    TextField,
    Dialog,
    DialogActions,
    DialogTitle,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import api, { UserRole } from '../../../api';
import { accessTokenSelector } from '../../../state/auth/auth.selectors';
import { setUsers } from '../../../state/users/users.actions';
import useStyles from './UpdateUserRoleDialog.styles';
import { UpdateUserRoleDialogFormInputs, UpdateUserRoleDialogProps } from './UpdateUserRoleDialog.types.';

const UpdateUserRoleDialog: React.FunctionComponent<UpdateUserRoleDialogProps> = ({ userData, onClose }) => {
    const classes = useStyles();
    const accessToken = useSelector(accessTokenSelector);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateUserRoleDialogFormInputs>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data: UpdateUserRoleDialogFormInputs) => {
        setIsLoading(true);
        api.users
            .changeRole(
                {
                    email: userData.email,
                    role: data.role,
                },
                { headers: { Authorization: `Bearer ${accessToken}` } },
            )
            .then(async () => {
                const { data } = await api.users.getAllUsers({ headers: { Authorization: `Bearer ${accessToken}` } });
                dispatch(setUsers(data));
                onClose();
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Dialog onClose={onClose} aria-labelledby='form-dialog-title' open>
            <DialogTitle id='simple-dialog-title'>Update User role</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <TextField value={userData.email} margin='dense' label='Users email' fullWidth disabled />

                    <FormControl className={classes.formControl}>
                        <InputLabel id='demo-simple-select-label'>Select user role</InputLabel>
                        <Select
                            autoFocus
                            labelId='demo-simple-select-label'
                            defaultValue={userData.role}
                            id='demo-simple-select'
                            {...register('role', { required: true })}
                        >
                            <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                            <MenuItem value={UserRole.INSTRUCTOR}>Instructor</MenuItem>
                            <MenuItem value={UserRole.REFEREE}>Referee</MenuItem>
                            <MenuItem value={UserRole.CUSTOMER}>Customer</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button variant='contained' color='primary' type='submit'>
                            Update role
                        </Button>
                    )}
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateUserRoleDialog;
