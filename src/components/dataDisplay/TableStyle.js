import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    headingBg: {
        backgroundColor: "#20232a"
    },
    headingCells: {
        fontSize: "18px",
        fontWeight: "bold",
        textDecoration: "underline",
        color: "white",
        "&:hover": {
            color: theme.palette.info.light
        },
        "&:active": {
            color: theme.palette.info.light
        },
        "&.MuiTableSortLabel-active": {
            color: theme.palette.info.light
        },
        "& > .MuiTableSortLabel-icon > path": {
            fill: theme.palette.info.light
        }
    },
    colorRed: {
        color: "red"
    },
    colorGreen: {
        color: "green"
    },
    bodyCells: {
        fontSize: "16px",
    },
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

export default useStyles;