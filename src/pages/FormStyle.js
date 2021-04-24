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
        margin: theme.spacing(2, 0, 2),
    },
    container: {
        width: "100%",
        margin: theme.spacing(1,"auto"),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center"
    },
    primaryColor: {
        color: theme.palette.primary.main
    },
    errorBg: {
        backgroundColor: "#ffeded"
    },
    errorColor: {
        color: theme.palette.error.dark
    },
    successBg: {
        backgroundColor: "#eeffed"
    },
    successColor: {
        color: theme.palette.success.dark
    }
}));

export default useStyles;