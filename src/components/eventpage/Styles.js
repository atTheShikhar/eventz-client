import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        padding: "0"
    },
    vmargin: {
        marginTop: "10px",
        marginBottom: "10px"
    },
    hmargin: {
        marginLeft: "10px",
        marginRight: "10px"
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    spaceBetween: {
        justifyContent: "space-between"
    },
    cardMedia: {
        height: "auto",
        width: "100%"
    },
    titleRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    button: {
        padding: "15px 30px",
        backgroundColor: "#20232a",
        color: "white",
        "&:hover": {
            backgroundColor: "#41495a",
        }
    }
}));

export default useStyles;