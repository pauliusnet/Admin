import {
    Button,
    DialogContent,
    TextField,
    Dialog,
    DialogActions,
    DialogTitle,
    CircularProgress,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api';
import { accessTokenSelector } from '../../../state/auth/auth.selectors';
import { setTricks } from '../../../state/tricks/tricks.actions';
import { CreateTrickDialogFormInputs, CreateTrickDialogProps } from './CreateTrickDialog.types';

const CreateTrickDialog: React.FunctionComponent<CreateTrickDialogProps> = ({ onClose }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(accessTokenSelector);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTrickDialogFormInputs>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data: CreateTrickDialogFormInputs) => {
        setIsLoading(true);
        api.tricks
            .createTrick(
                {
                    name: data.name,
                    level: data.level,
                    videoURL: data.videoURL,
                },
                { headers: { Authorization: `Bearer ${accessToken}` } },
            )
            .then(async () => {
                const { data } = await api.tricks.getTricks();
                dispatch(setTricks(data));
                onClose();
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Dialog onClose={onClose} aria-labelledby='form-dialog-title' open>
            <DialogTitle id='simple-dialog-title'>Create a new trick</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Enter a trick name'
                        fullWidth
                        error={!!errors.name}
                        helperText={!!errors.name ? 'Trick name must be provided.' : null}
                        {...register('name', { required: true })}
                    />

                    <TextField
                        margin='dense'
                        label='Enter trick difficulty level'
                        fullWidth
                        type='number'
                        error={!!errors.level}
                        helperText={!!errors.level ? 'Trick difficulty level must be provided.' : null}
                        {...register('level', { required: true })}
                    />

                    <TextField
                        margin='dense'
                        label='Enter trick video URL'
                        fullWidth
                        error={!!errors.videoURL}
                        helperText={!!errors.videoURL ? 'Trick video URL must be provided.' : null}
                        {...register('videoURL', { required: true })}
                    />
                </DialogContent>

                <DialogActions>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button variant='contained' color='primary' type='submit'>
                            Create new trick
                        </Button>
                    )}
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateTrickDialog;
