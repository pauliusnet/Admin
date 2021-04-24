import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        background: 'white',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '20px',
        margin: '20px',
        borderRadius: '10px',
    },
    header: {
        textAlign: 'center',
        padding: '0 0 20px 0',
        borderBottom: '1px solid silver',
    },
    button: {
        marginTop: '20px',
        textAlign: 'right',
    },
}));

export default useStyles;
