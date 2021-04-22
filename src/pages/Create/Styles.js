import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    containerStyles: {
        padding: 0
    },
    gridContainerStyles: {
        padding: theme.spacing(2),
        boxShadow: "0px 0px 5px 1px rgba(10,10,10,0.2)",
        borderRadius: theme.spacing(1),
        backgroundColor: "white",
    },
    stepperStyles: {
        backgroundColor: theme.palette.background.default,
    },
    mainStyles: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4)
    }
}));

export default useStyles;