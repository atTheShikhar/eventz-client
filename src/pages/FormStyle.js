import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    page: {
        backgroundColor: theme.palette.background.default,
        border: "solid 1px white"
    },
    card: {
        marginTop: theme.spacing(8),
        boxShadow: "0px 0px 5px 1px rgba(10,10,10,0.2)",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '10px',
        padding: "2em",
        backgroundColor: "white"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 3),
    },
}));

export default useStyles;