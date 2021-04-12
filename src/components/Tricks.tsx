import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import api, { TrickDto } from '../api';

import { accessTokenSelector } from '../state/auth/auth.selectors';
import { useSelector } from 'react-redux';

const Tricks: React.FunctionComponent = () => {
    const accessToken = useSelector(accessTokenSelector);
    const [tricks, setTricks] = useState<TrickDto[] | null>(null);
    const [isCreateTrickDialogOpen, setIsCreateTrickDialogOpen] = useState(false);
    const [newTrickName, setNewTrickName] = useState('');
    const [newTrickDifficultyLevel, setNewTrickDifficultyLevel] = useState('');
    const [newTrickVideoURL, setTrickVideoURL] = useState('');

    const fetchTricks = async () => {
        const { data } = await api.tricks.getTricks();
        setTricks(data);
    };

    const handleCreateTrick = async () => {
        await api.tricks.createTrick(
            {
                name: newTrickName,
                level: Number(newTrickDifficultyLevel),
                videoURL: newTrickVideoURL,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        fetchTricks();
        await setIsCreateTrickDialogOpen(false);
    };

    useEffect(() => {
        fetchTricks();
    }, []);

    return (
        <>
            <Typography variant='h4'>Tricks</Typography>
            <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Video URL</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={() => setIsCreateTrickDialogOpen(true)} variant='contained' color='primary'>
                Create new trick
            </Button>
            <Dialog
                onClose={() => setIsCreateTrickDialogOpen(false)}
                aria-labelledby='form-dialog-title'
                open={isCreateTrickDialogOpen}
            >
                <DialogTitle id='simple-dialog-title'>Create a new trick</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Enter trick name'
                        fullWidth
                        onChange={({ target: { value } }) => setNewTrickName(value)}
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Enter trick difficulty level'
                        fullWidth
                        type='number'
                        onChange={({ target: { value } }) => setNewTrickDifficultyLevel(value)}
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Enter trick video URL'
                        fullWidth
                        onChange={({ target: { value } }) => setTrickVideoURL(value)}
                    />
                </DialogContent>
                <Button onClick={handleCreateTrick} variant='contained' color='primary'>
                    Submit
                </Button>
            </Dialog>
        </>
    );
};

export default Tricks;
