import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#20232a",
    },
    toolbar: {
        width: "100%",
        maxWidth: theme.breakpoints.width("lg"),
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemsGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "& > *": {
            marginRight: theme.spacing(1)
        },
        "& > *:last-child": {
            marginRight: "0"
        },
    },
    logoStyle: {
        textDecoration: "none",
        color: "white"
    },
    searchWrapper: {
        marginLeft: theme.spacing(1),
        minWidth: "30vw"
    },
    search: {
        padding: theme.spacing(1.4, 2.5),
        border: "none",
        borderRadius: theme.spacing(0.7, 0, 0, 0.7),
        backgroundColor: "#798194",
        width: "80%",
        color: "white",
        fontSize: "1rem",
        "&::placeholder": {
            color: "rgba(255,255,255,0.6)"
        }
    },
    searchButton: {
        width: "20%",
        margin: "0",
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey[300],
        borderRadius: theme.spacing(0, 0.7, 0.7, 0),
        "&:hover": {
            backgroundColor: theme.palette.grey[400],
        }
    },
    list: {
        width: 250
    }
}));

export default useStyles;