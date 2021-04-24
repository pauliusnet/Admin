import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import api, { TrickDto } from '../../api';

import { useDispatch, useSelector } from 'react-redux';
import { tricksSelector } from '../../state/tricks/tricks.selectors';

import CreateTrickDialog from './CreateTrickDialog/CreateTrickDialog';
import DeleteTrickDialog from './DeleteTrickDialog/DeleteTrickDialog';
import UpdateTrickDialog from './UpdateTrickDialog/UpdateTrickDialog';
import { setTricks } from '../../state/tricks/tricks.actions';
import useStyles from './Tricks.styles';

const Tricks: React.FunctionComponent = () => {
    const classes = useStyles();
    const tricks = useSelector(tricksSelector);
    const dispatch = useDispatch();
    const [isCreateTrickDialogOpen, setIsCreateTrickDialogOpen] = useState(false);
    const [toBeDeletedTrickId, setToBeDeletedTrickId] = useState<number | undefined>(undefined);
    const [toBeUpdatedTrick, setToBeUpdatedTrick] = useState<TrickDto | undefined>(undefined);

    const fetchTricks = async () => {
        const { data } = await api.tricks.getTricks();
        dispatch(setTricks(data));
    };

    useEffect(() => {
        fetchTricks();
    }, []);

    return (
        <div className={classes.root}>
            <h1 className={classes.header}>Tricks</h1>
            <TableContainer component={Paper}>
                <Table aria-label='simple table' size='small'>
                    <TableHead style={{ backgroundColor: 'lightgrey' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Video URL</TableCell>
                            <TableCell>Trick actions (Update)</TableCell>
                            <TableCell>Trick actions (Delete)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tricks?.map((trick) => (
                            <TableRow key={trick.id}>
                                <TableCell component='th' scope='row'>
                                    {trick.id}
                                </TableCell>
                                <TableCell>{trick.name}</TableCell>
                                <TableCell>{trick.level}</TableCell>
                                <TableCell>{trick.videoURL}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => setToBeUpdatedTrick(trick)}
                                        variant='contained'
                                        color='primary'
                                        size='small'
                                    >
                                        Update
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => setToBeDeletedTrickId(trick.id)}
                                        variant='contained'
                                        color='secondary'
                                        size='small'
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes.button}>
                <Button
                    onClick={() => setIsCreateTrickDialogOpen(true)}
                    variant='contained'
                    color='primary'
                    size='medium'
                >
                    Create new trick
                </Button>
            </div>

            {isCreateTrickDialogOpen && <CreateTrickDialog onClose={() => setIsCreateTrickDialogOpen(false)} />}

            {!!toBeDeletedTrickId && (
                <DeleteTrickDialog onClose={() => setToBeDeletedTrickId(undefined)} trickId={toBeDeletedTrickId} />
            )}

            {!!toBeUpdatedTrick && (
                <UpdateTrickDialog onClose={() => setToBeUpdatedTrick(undefined)} trickData={toBeUpdatedTrick} />
            )}
        </div>
    );
};

export default Tricks;
