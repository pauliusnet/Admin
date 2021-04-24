import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            minWidth: 240,
        },
    }),
);

export default useStyles;
