import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    bgColor: {
        backgroundColor: "#fafafa"
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
    }
}));

export default useStyles;