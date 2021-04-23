import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    page: {
        backgroundColor: theme.palette.background.default,
        border: "solid 1px white",
        minHeight: "80vh"
    },
    card: {
        marginTop: theme.spacing(8),
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
    container: {
        width: "100%",
        margin: theme.spacing(1,0),
    },
    primaryColor: {
        color: theme.palette.primary.main
    }
}));

export default useStyles;