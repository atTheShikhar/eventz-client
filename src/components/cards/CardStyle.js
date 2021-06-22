import {makeStyles} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: "100%",
        borderRadius: "10px"
    },
    heading: {
        color: theme.palette.grey.A700,
        fontWeight: "600",
    },
    subheading: {
        color: theme.palette.grey.A700,
    },
    image: {
        height: "240px"
    },
    chip: {
        margin: "5px"
    },
    vmargin: {
        marginTop: "20px",
        marginBottom: "20px"
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    favButton: {
        '&:hover svg': {
            color: theme.palette.error.main
        }
    },
    shareButton: {
        '&:hover svg': {
            color: theme.palette.primary.main
        }
    },
    priceTag: {
        paddingRight: "10px",
        color: theme.palette.error.main
    },
    priceFreeTag: {
        paddingRight: "10px",
        color: theme.palette.success.main
    },
}))
export default useStyles;