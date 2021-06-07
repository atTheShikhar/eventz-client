import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    page: {
        backgroundColor: theme.palette.background.default,
        border: "solid 1px white",
        minHeight: "90vh",
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
        backgroundColor: '#20232a'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    link: {
        cursor: 'pointer'
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
    },
    image: {
        display:"block",
        maxWidth: "90%",
        height: "auto"
    },
    parent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 0"
    },
    vmargin: {
        margin: "10px auto 20px auto"
    },
    content: {
        borderRadius: "15px",
        backgroundColor: "white"
    },
    heading: {
        textDecoration: "underline",
        color: "#555"
    },
    para: {
        color: "#444"
    }
}));

export default useStyles;