import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    containerStyles: {
        padding: 0
    },
    paperContainer: {
        padding: theme.spacing(3),
        borderRadius: theme.spacing(1),
    },
    stepperStyles: {
        backgroundColor: theme.palette.background.default,
    },
    mainStyles: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
    }
}));

export default useStyles;