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
import { UpdateTrickDialogFormInputs, UpdateTrickDialogProps } from './UpdateTrickDialog.types';

const UpdateTrickDialog: React.FunctionComponent<UpdateTrickDialogProps> = ({ trickData, onClose }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(accessTokenSelector);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateTrickDialogFormInputs>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: UpdateTrickDialogFormInputs) => {
        setIsLoading(true);
        api.tricks
            .updateTrickById(
                trickData.id,
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
        <>
            <Dialog onClose={onClose} aria-labelledby='form-dialog-title' open>
                <DialogTitle id='simple-dialog-title'>Update selected trick</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Enter a trick name'
                            fullWidth
                            defaultValue={trickData?.name}
                            error={!!errors.name}
                            helperText={!!errors.name ? 'Trick name must be provided.' : null}
                            {...register('name', { required: true })}
                        />

                        <TextField
                            margin='dense'
                            label='Enter trick difficulty level'
                            fullWidth
                            type='number'
                            defaultValue={trickData?.level}
                            error={!!errors.level}
                            helperText={!!errors.level ? 'Trick difficulty level must be provided.' : null}
                            {...register('level', { required: true })}
                        />

                        <TextField
                            margin='dense'
                            label='Enter trick video URL'
                            fullWidth
                            defaultValue={trickData?.videoURL}
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
                                Update selected trick
                            </Button>
                        )}
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default UpdateTrickDialog;
