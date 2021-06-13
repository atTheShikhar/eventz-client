import { Container, IconButton, makeStyles } from '@material-ui/core';
import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
    parent: {
        backgroundColor: theme.palette.info.light,
        minHeight: "9vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        display: "inline-block",
        marginLeft: theme.spacing(1),
        fontSize: "20px",
        fontWeight: "bold",
        color: "#20232a",
    }
}))

function SubNav(props) {
    const {title} = props;
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={`${classes.parent}`}>
            <Container maxWidth="lg">
            <IconButton onClick={() => {history.goBack()}}>
                <ArrowBackIcon/>
            </IconButton>

            <span className={classes.title}>{title}</span>
            </Container>
        </div>
    )
}

export default SubNav
