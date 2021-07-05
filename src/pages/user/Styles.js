import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    bgColor: {
        backgroundColor: "#fafafa"
    },
    pageHeight: {
        minHeight: "90vh"
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#20232a",
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.grey[800]
        }
    },
    successButton: {
        backgroundColor: theme.palette.success.main,
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.success.dark
        }
    },
    roundedCard: {
        borderRadius: "10px"
    },
    heading: {
        fontSize: "48px",
        fontWeight: "500",
        color: "#20232a"
    },
    headingColor: {
        fontWeight: "500",
        color: theme.palette.grey[700]
    },
    subHeading: {
        fontSize: "18px",
        color: theme.palette.grey[500] 
    },
    vmargin: {
        marginTop: "20px",
        marginBottom: "20px"
    },
    vpadding: {
        paddingTop: "20px",
        paddingBottom: "20px"
    },
    imageAvatar: {
        width: "360px",
        height: "360px"
    }
}));

export default useStyles;