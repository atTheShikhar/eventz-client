import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    bgColor: {
        backgroundColor: "#fafafa"
    },
    pageHeight: {
        minHeight: "80vh"
    },
    headingText: {
        color: theme.palette.grey[800]
    },
    subHeadingText: {
        color: theme.palette.grey[600]
    },
    widthScreen: {
        minWidth: "100vw"
    },
    bodyText: {
        fontSize: "18px",
        color: theme.palette.grey[800]
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    vmargin: {
        marginTop: "10px",
        marginBottom: "10px"
    },
    vpadding: {
        paddingTop: "10px",
        paddingBottom: "10px"
    }
}));

export default useStyles;