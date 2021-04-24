import {
    Button,
    DialogContent,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContentText,
    CircularProgress,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api';
import { accessTokenSelector } from '../../../state/auth/auth.selectors';
import { setTricks } from '../../../state/tricks/tricks.actions';
import { DeleteTrickDialogProps } from './DeleteTrickDialog.types';

const DeleteTrickDialog: React.FunctionComponent<DeleteTrickDialogProps> = ({ trickId, onClose }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(accessTokenSelector);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        if (trickId) {
            setIsLoading(true);
            api.tricks
                .deleteTrickById(trickId, { headers: { Authorization: `Bearer ${accessToken}` } })
                .then(async () => {
                    const { data } = await api.tricks.getTricks();
                    dispatch(setTricks(data));
                    onClose();
                })
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <>
            <Dialog onClose={onClose} aria-labelledby='form-dialog-title' open>
                <DialogTitle id='simple-dialog-title'>Delete a selected trick</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure, that you want to delete this trick?</DialogContentText>
                </DialogContent>

                <DialogActions>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <Button onClick={onSubmit} variant='contained' color='secondary'>
                                Delete trick
                            </Button>
                            <Button onClick={onClose} variant='contained'>
                                Cancel
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteTrickDialog;
