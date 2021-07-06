import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    bgColor: {
        backgroundColor: "#fafafa"
    },
    pageHeight: {
        minHeight: "90vh"
    },
    textBlue: {
        color: theme.palette.primary.dark
    },
    textRed: {
        color: theme.palette.error.dark
    },
    headingText: {
        color: theme.palette.grey[800]
    },
    subHeadingText: {
        color: theme.palette.grey[600]
    },
    underline: {
        textDecoration: "underline"
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
        marginTop: "20px",
        marginBottom: "20px"
    },
    vpadding: {
        paddingTop: "20px",
        paddingBottom: "20px"
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    imageAvatar: {
        width: "240px",
        height: "240px"
    },
    heading: {
        fontSize: "48px",
        fontWeight: "500",
        color: "#20232a"
    },
    subHeading: {
        fontSize: "18px",
        color: theme.palette.grey[500] 
    },
}));

export default useStyles;